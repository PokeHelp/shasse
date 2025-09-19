/**
 * @jest-environment jsdom
 */

jest.mock("next/server", () => ({
    NextResponse: {
        json: jest.fn(),
    },
}));

// Mock MUST être défini avant l'import
jest.mock("@utils", () => {
    const originalModule = jest.requireActual("@utils");

    return {
        ...originalModule,
        isBrowser: jest.fn(() => true), // Par défaut, retourne true (browser)
    };
});

import {getCookie, isBrowser, setCookie} from "@utils";

describe("cookie utils", () =>
{
    const originalCookieDescriptor = Object.getOwnPropertyDescriptor(document, "cookie");

    beforeEach(() =>
    {
        let cookieStore = "";
        Object.defineProperty(document, "cookie", {
            configurable: true,
            get:          () => cookieStore,
            set:          (val: string) =>
                          {
                              const [keyValue] = val.split(";");
                              const [key] = keyValue.split("=");

                              const existingCookies = cookieStore
                                  .split("; ")
                                  .filter(c => !c.startsWith(`${key}=`));

                              cookieStore = [...existingCookies, val].filter(Boolean).join("; ");
                          },
        });

        // Réinitialiser le mock avant chaque test
        (isBrowser as jest.Mock).mockClear();
    });

    afterEach(() =>
    {
        if (originalCookieDescriptor)
        {
            Object.defineProperty(document, "cookie", originalCookieDescriptor);
        }
        jest.clearAllMocks();
    });

    it("should set a cookie correctly", () =>
    {
        // S'assurer que isBrowser retourne true
        (isBrowser as jest.Mock).mockReturnValue(true);

        setCookie("testKey", "testValue", 3600);

        expect(document.cookie).toContain("testKey=testValue");
        expect(document.cookie).toContain("Max-Age=3600");
    });

    it("should get a cookie correctly", () =>
    {
        (isBrowser as jest.Mock).mockReturnValue(true);
        document.cookie = "foo=bar; hello=world";

        expect(getCookie("foo")).toBe("bar");
        expect(getCookie("hello")).toBe("world");
        expect(getCookie("notFound")).toBeNull();
    });
});
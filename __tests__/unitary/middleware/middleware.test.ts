import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { getAllIsoCode, getDefaultLangue } from "@service/langue";
import type { NextRequest } from "next/server";
import {middleware} from "@src/middleware";

// Mocks
jest.mock("next/headers", () => ({
    cookies: jest.fn(),
    headers: jest.fn()
}));

jest.mock("next/server", () => ({
    NextResponse: {
        next: jest.fn(),
        redirect: jest.fn()
    }
}));

jest.mock("negotiator");
jest.mock("@formatjs/intl-localematcher", () => ({
    match: jest.fn()
}));

jest.mock("@service/langue", () => ({
    getAllIsoCode: jest.fn(),
    getDefaultLangue: jest.fn()
}));

describe("middleware", () => {
    let mockNext: NextResponse;
    let mockRedirect: jest.Mock;
    let mockCookies: { get: jest.Mock };
    let mockHeaders: { get: jest.Mock };

    beforeEach(() => {
        jest.clearAllMocks();

        mockNext = { cookies: { set: jest.fn() } } as unknown as NextResponse;
        mockRedirect = jest.fn();

        (NextResponse.next as jest.Mock).mockReturnValue(mockNext);
        (NextResponse.redirect as jest.Mock).mockImplementation(mockRedirect);

        mockCookies = { get: jest.fn() };
        (cookies as jest.Mock).mockResolvedValue(mockCookies);

        mockHeaders = { get: jest.fn() };
        (headers as jest.Mock).mockResolvedValue(mockHeaders);

        (getDefaultLangue as jest.Mock).mockReturnValue("en");
        (getAllIsoCode as jest.Mock).mockResolvedValue(["en", "fr"]);
    });

    it("should not modify response if userLang cookie exists", async () => {
        mockCookies.get.mockReturnValue({ value: "fr" });

        const req = { nextUrl: { pathname: "/something" } } as unknown as NextRequest;
        const res = await middleware(req);

        expect(cookies).toHaveBeenCalled();
        expect(mockCookies.get).toHaveBeenCalledWith("userLang");
        expect((mockNext.cookies.set as jest.Mock)).not.toHaveBeenCalled();
        expect(res).toBe(mockNext);
    });

    it("should set userLang cookie if missing and accept-language present", async () => {
        mockCookies.get.mockReturnValue(undefined);
        mockHeaders.get.mockReturnValue("fr-FR,fr;q=0.9,en;q=0.8");

        const mockNegotiator = { languages: jest.fn().mockReturnValue(["fr-FR"]) };
        (Negotiator as unknown as jest.Mock).mockReturnValue(mockNegotiator);

        (match as jest.Mock).mockReturnValue("fr");

        const req = { nextUrl: { pathname: "/page" } } as unknown as NextRequest;
        const res = await middleware(req);

        expect(mockHeaders.get).toHaveBeenCalledWith("accept-language");
        expect(mockNegotiator.languages).toHaveBeenCalled();
        expect(match).toHaveBeenCalledWith(["fr-FR"], ["en", "fr"], "en");
        expect((mockNext.cookies.set as jest.Mock)).toHaveBeenCalledWith(
            "userLang",
            "fr",
            expect.objectContaining({
                path: "/",
                maxAge: expect.any(Number),
                sameSite: "lax",
                secure: true,
                httpOnly: true
            })
        );
        expect(res).toBe(mockNext);
    });

    it("should set userLang cookie to default if no accept-language", async () => {
        mockCookies.get.mockReturnValue(undefined);
        mockHeaders.get.mockReturnValue(null);

        const req = { nextUrl: { pathname: "/page" } } as unknown as NextRequest;
        const res = await middleware(req);

        expect(mockHeaders.get).toHaveBeenCalledWith("accept-language");
        expect(getDefaultLangue).toHaveBeenCalled();
        expect((mockNext.cookies.set as jest.Mock)).toHaveBeenCalledWith(
            "userLang",
            "en",
            expect.any(Object)
        );
        expect(res).toBe(mockNext);
    });

    it("should redirect to /pokedex if path is /", async () => {
        mockCookies.get.mockReturnValue({ value: "fr" });

        const req = {
            nextUrl: { pathname: "/", href: "http://localhost:3000/" },
            url: "http://localhost:3000/"
        } as unknown as NextRequest;

        const res = await middleware(req);

        expect(NextResponse.redirect).toHaveBeenCalledWith(
            new URL("/pokedex", req.url)
        );
        expect(res).toBe(mockRedirect.mock.results[0].value);
    });
});

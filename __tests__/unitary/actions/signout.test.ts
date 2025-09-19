import { auth } from "@lib";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {signOutAction} from "@src/actions/signout";

jest.mock("@lib", () => ({
    auth: {
        api: {
            signOut: jest.fn(),
        },
    },
}));

jest.mock("next/headers", () => ({
    headers: jest.fn(),
}));

jest.mock("next/navigation", () => ({
    redirect: jest.fn(),
}));

describe("signOutAction", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call auth.api.signOut with headers and then redirect", async () => {
        const mockHeaders = { get: jest.fn() };
        (headers as jest.Mock).mockResolvedValue(mockHeaders);

        await signOutAction();

        expect(headers).toHaveBeenCalled();
        expect(auth.api.signOut).toHaveBeenCalledWith({ headers: mockHeaders });
        expect(redirect).toHaveBeenCalledWith("/login");
    });
});

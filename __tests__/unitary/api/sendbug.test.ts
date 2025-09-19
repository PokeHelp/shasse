import { POST } from "@app/api/sendbug/route";
import { getResendInstance } from "@src/lib/resend";
import { NextResponse } from "next/server";

// Mock de getResendInstance et de Resend
jest.mock("@src/lib/resend", () => ({
    getResendInstance: jest.fn(),
}));

describe("POST /api/contact", () => {
    const mockSend = jest.fn();
    const mockGetResendInstance = getResendInstance as jest.Mock;

    beforeEach(() => {
        mockGetResendInstance.mockReturnValue({
            emails: {
                send: mockSend,
            },
        });
        mockSend.mockReset();
    });

    it("should send email and return JSON", async () => {
        const mockRequest = new Request("https://example.com/api/contact", {
            method: "POST",
            headers: { "user-agent": "jest-agent" },
            body: JSON.stringify({ title: "Hello", content: "This is a test" }),
        });

        const response = await POST(mockRequest);

        // Vérification que resend.emails.send a été appelé correctement
        expect(mockSend).toHaveBeenCalledWith({
            to: "contact@pokehelp.fr",
            subject: "Hello",
            text: "This is a test\nUser Agent: jest-agent",
            from: "tickets@pokehelp.fr",
        });

        // Vérification du retour
        const data = await response.json();
        expect(data).toEqual({ success: false });
        expect(response).toBeInstanceOf(NextResponse);
    });

    it("should default user-agent to 'unknown' if header is missing", async () => {
        const mockRequest = new Request("https://example.com/api/contact", {
            method: "POST",
            body: JSON.stringify({ title: "Test", content: "No UA" }),
        });

        await POST(mockRequest);

        expect(mockSend).toHaveBeenCalledWith(expect.objectContaining({
            text: expect.stringContaining("User Agent: unknown"),
        }));
    });
});

import { POST } from "@app/api/huntings/route";
import { getRequiredUser } from "@src/lib/auth-server";
import { sendResponse } from "@utils";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

jest.mock("@src/lib/auth-server");
jest.mock("@service");
jest.mock("@utils");

const mockGetRequiredUser = getRequiredUser as jest.Mock;
const mockSendResponse = sendResponse as jest.Mock;

beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => {}); // Désactive les logs
});

describe("POST /api/hunting", () => {
    const validData = { pokemonId: 1, level: 5, shiny: false }; // Exemple conforme à CreateHuntingSchema
    const mockUser = { id: 42, email: "test@test.com" };

    function createReq<T>(body: T) {
        return {
            json: jest.fn().mockResolvedValue(body)
        } as unknown as Request;
    }


    it("should return BadRequest if data is invalid", async () => {
        const req = createReq({ invalid: "data" });
        mockGetRequiredUser.mockResolvedValue(mockUser);
        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await POST(req);
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(response.status).toBe(HttpStatusCode.BadRequest);
    });

    it("should handle errors", async () => {
        const req = createReq(validData);
        mockGetRequiredUser.mockRejectedValue(new Error("Fail"));
        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await POST(req);
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(json.error).toBe("Generic error");
        expect(response.status).toBe(HttpStatusCode.InternalServerError);
    });
});

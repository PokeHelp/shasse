import { GET } from "@app/api/generations/route";
import * as utils from "@utils";
import { getAllGeneration } from "@query";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";

jest.mock("@utils");
jest.mock("@query");

describe("GET /api/generations", () => {
    const mockSendResponse = jest.spyOn(utils, "sendResponse");

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "log").mockImplementation(() => {}); // supprime les logs pendant le test
    });

    it("should return all generations successfully", async () => {
        const fakeGenerations = [
            { id: 1, name: "Generation I" },
            { id: 2, name: "Generation II" }
        ];
        (getAllGeneration as jest.Mock).mockResolvedValue(fakeGenerations);

        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET();
        const json = await response.json();

        expect(json.success).toBe(true);
        expect(json.data).toEqual(fakeGenerations);
        expect(response.status).toBe(HttpStatusCode.Ok);
        expect(mockSendResponse).toHaveBeenCalledWith(
            { success: true, data: fakeGenerations },
            HttpStatusCode.Ok
        );
    });

    it("should handle errors", async () => {
        (getAllGeneration as jest.Mock).mockRejectedValue(new Error("Fail"));
        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET();
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(json.error).toBe("Generic error");
        expect(response.status).toBe(HttpStatusCode.InternalServerError);
    });
});

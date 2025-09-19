import * as utils from "@utils";
import { getAllHuntingMethods } from "@query";
import { NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import {GET} from "@app/api/huntings/methods/route";

jest.mock("@utils");
jest.mock("@query");

describe("GET /api/hunting/methods", () => {
    const mockSendResponse = jest.spyOn(utils, "sendResponse");

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "log").mockImplementation(() => {}); // supprime les logs pendant le test
    });

    it("should return hunting methods successfully", async () => {
        const fakeMethods = [{ id: 1, name: "Fishing" }, { id: 2, name: "Catching" }];
        (getAllHuntingMethods as jest.Mock).mockResolvedValue(fakeMethods);

        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET();
        const json = await response.json();

        expect(json.success).toBe(true);
        expect(json.data).toEqual(fakeMethods);
        expect(response.status).toBe(HttpStatusCode.Ok);
        expect(mockSendResponse).toHaveBeenCalledWith(
            { success: true, data: fakeMethods },
            HttpStatusCode.Ok
        );
    });

    it("should handle errors", async () => {
        (getAllHuntingMethods as jest.Mock).mockRejectedValue(new Error("Fail"));
        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET();
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(json.error).toBe("Generic error");
        expect(response.status).toBe(HttpStatusCode.InternalServerError);
    });
});

import { GET } from "@app/api/locations/route";
import { getGameLocation } from "@service";
import { sendResponse } from "@utils";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

jest.mock("@service");
jest.mock("@utils");

const mockGetGameLocation = getGameLocation as jest.Mock;
const mockSendResponse = sendResponse as jest.Mock;

function createReq(url = "http://localhost/api/game-location") {
    return {
        url,
    } as unknown as NextRequest;
}

beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => {}); // désactive les logs
});

describe("GET /api/game-location", () => {

    it("should return BadRequest if gameId is invalid", async () => {
        const req = createReq("http://localhost/api/game-location?gameId=abc");

        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req);
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(response.status).toBe(HttpStatusCode.BadRequest);
    });

    it("should return BadRequest if pokemonId is invalid", async () => {
        const req = createReq("http://localhost/api/game-location?pokemonId=xyz");

        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req);
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(response.status).toBe(HttpStatusCode.BadRequest);
    });

    it("should return BadRequest if formId is invalid", async () => {
        const req = createReq("http://localhost/api/game-location?formId=abc");

        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req);
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(response.status).toBe(HttpStatusCode.BadRequest);
    });

    it("should return data when all params are valid", async () => {
        const req = createReq("http://localhost/api/game-location?gameId=1&pokemonId=2&formId=3");

        const data = [{ location: "Pallet Town" }];
        mockGetGameLocation.mockResolvedValue(data);
        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req);
        const json = await response.json();

        expect(json.success).toBe(true);
        expect(json.data).toEqual(data);
        expect(response.status).toBe(HttpStatusCode.Ok);
    });

    it("should handle errors", async () => {
        const req = createReq();

        mockGetGameLocation.mockRejectedValue(new Error("Fail"));
        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req);
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(json.error).toBe("Generic error");
        expect(response.status).toBe(HttpStatusCode.InternalServerError);
    });

});

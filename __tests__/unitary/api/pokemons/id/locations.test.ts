import { GET } from "@app/api/pokemons/[id]/locations/route";
import { getPokemonGenerationLocation } from "@service";
import { sendResponse } from "@utils";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

jest.mock("@service");
jest.mock("@utils");

const mockGetPokemonGenerationLocation = getPokemonGenerationLocation as jest.Mock;
const mockSendResponse = sendResponse as jest.Mock;

function createReq(url = "http://localhost/api/pokemons/1/locations") {
    return {
        nextUrl: new URL(url),
    } as unknown as NextRequest;
}

beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => {}); // désactive les logs
});

describe("GET /api/pokemons/:id/locations", () => {

    it("should return BadRequest if id is invalid", async () => {
        const req = createReq("http://localhost/api/pokemons/abc/locations");
        const params = Promise.resolve({ id: "abc" });

        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req, { params });
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(response.status).toBe(HttpStatusCode.BadRequest);
    });

    it("should return NoContent if no locations found", async () => {
        const req = createReq("http://localhost/api/pokemons/1/locations");
        const params = Promise.resolve({ id: "1" });

        mockGetPokemonGenerationLocation.mockResolvedValue([]);
        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req, { params });
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(json.data).toEqual(undefined);
        expect(response.status).toBe(HttpStatusCode.InternalServerError);
    });

    it("should return data when locations are found", async () => {
        const req = createReq("http://localhost/api/pokemons/1/locations");
        const params = Promise.resolve({ id: "1" });

        const data = [{ location: "Pallet Town", gameId: 1, shiny: false }];
        mockGetPokemonGenerationLocation.mockResolvedValue(data);
        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req, { params });
        const json = await response.json();

        expect(json.success).toBe(true);
        expect(json.data).toEqual(data);
        expect(response.status).toBe(HttpStatusCode.Ok);
    });

    it("should handle errors", async () => {
        const req = createReq();
        const params = Promise.resolve({ id: "1" });

        mockGetPokemonGenerationLocation.mockRejectedValue(new Error("Fail"));
        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req, { params });
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(json.error).toBe("Generic error");
        expect(response.status).toBe(HttpStatusCode.InternalServerError);
    });

});

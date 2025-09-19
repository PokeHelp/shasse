import { GET } from "@app/api/pokemons/[id]/types/route";
import { getPokemonTypeWithTranslation } from "@service";
import { sendResponse } from "@utils";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

jest.mock("@service");
jest.mock("@utils");

const mockGetPokemonType = getPokemonTypeWithTranslation as jest.Mock;
const mockSendResponse = sendResponse as jest.Mock;

function createReq(url = "http://localhost/api/pokemons/1/types") {
    return {
        nextUrl: new URL(url),
    } as unknown as NextRequest;
}

beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => {}); // désactive les logs
});

describe("GET /api/pokemons/:id/types", () => {

    it("should return BadRequest if id is invalid", async () => {
        const req = createReq("http://localhost/api/pokemons/abc/types");
        const params = Promise.resolve({ id: "abc" });

        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req, { params });
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(response.status).toBe(HttpStatusCode.BadRequest);
    });

    it("should return BadRequest if generationId is invalid", async () => {
        const req = createReq("http://localhost/api/pokemons/1/types?generationId=abc");
        const params = Promise.resolve({ id: "1" });

        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req, { params });
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(response.status).toBe(HttpStatusCode.BadRequest);
    });

    it("should return data when valid id (and generationId) are provided", async () => {
        const req = createReq("http://localhost/api/pokemons/1/types?generationId=2");
        const params = Promise.resolve({ id: "1" });

        const data = [{ id: 1, name: "fire" }, { id: 2, name: "flying" }];
        mockGetPokemonType.mockResolvedValue(data);
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

        mockGetPokemonType.mockRejectedValue(new Error("Fail"));
        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req, { params });
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(json.error).toBe("Generic error");
        expect(response.status).toBe(HttpStatusCode.InternalServerError);
    });

});

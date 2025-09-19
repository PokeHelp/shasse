import { GET } from "@app/api/pokedex/route";
import { getPokemonFormPokedex } from "@service";
import { sendResponse } from "@utils";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

jest.mock("@service");
jest.mock("@utils");

const mockGetPokedex = getPokemonFormPokedex as jest.Mock;
const mockSendResponse = sendResponse as jest.Mock;

function createReq(url = "http://localhost/api/pokemons/form/pokedex") {
    return {
        nextUrl: new URL(url),
    } as unknown as NextRequest;
}

beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => {}); // désactive les logs
});

describe("GET /api/pokemons/form/pokedex", () => {

    it("should return BadRequest if formId is invalid", async () => {
        const req = createReq("http://localhost/api/pokemons/form/pokedex?formId=abc");

        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req);
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(response.status).toBe(HttpStatusCode.BadRequest);
    });

    it("should return data when formId is valid", async () => {
        const req = createReq("http://localhost/api/pokemons/form/pokedex?formId=1");

        const data = [{ id: 1, name: "Bulbasaur" }];
        mockGetPokedex.mockResolvedValue(data);
        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req);
        const json = await response.json();

        expect(json.success).toBe(true);
        expect(json.data).toEqual(data);
        expect(response.status).toBe(HttpStatusCode.Ok);
    });

    it("should return data when no formId is provided", async () => {
        const req = createReq();

        const data = [{ id: 1, name: "Bulbasaur" }];
        mockGetPokedex.mockResolvedValue(data);
        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req);
        const json = await response.json();

        expect(json.success).toBe(true);
        expect(json.data).toEqual(data);
        expect(response.status).toBe(HttpStatusCode.Ok);
    });

    it("should handle errors", async () => {
        const req = createReq();

        mockGetPokedex.mockRejectedValue(new Error("Fail"));
        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req);
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(json.error).toBe("Generic error");
        expect(response.status).toBe(HttpStatusCode.InternalServerError);
    });

});

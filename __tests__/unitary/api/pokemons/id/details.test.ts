import { GET } from "@app/api/pokemons/[id]/details/route";
import { getDetail } from "@service";
import { sendResponse } from "@utils";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

jest.mock("@service");
jest.mock("@utils");

const mockGetDetail = getDetail as jest.Mock;
const mockSendResponse = sendResponse as jest.Mock;

function createReq(url = "http://localhost/api/pokemons/1/detail") {
    return {
        nextUrl: new URL(url),
    } as unknown as NextRequest;
}

beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => {}); // désactive les logs
});

describe("GET /api/pokemons/:id/detail", () => {

    it("should return BadRequest if id is invalid", async () => {
        const req = createReq("http://localhost/api/pokemons/abc/detail");
        const params = Promise.resolve({ id: "abc" });

        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req, { params });
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(response.status).toBe(HttpStatusCode.BadRequest);
    });

    it("should return BadRequest if generationId is invalid", async () => {
        const req = createReq("http://localhost/api/pokemons/1/detail?generationId=abc");
        const params = Promise.resolve({ id: "1" });

        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req, { params });
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(response.status).toBe(HttpStatusCode.BadRequest);
    });

    it("should return BadRequest if formId is invalid", async () => {
        const req = createReq("http://localhost/api/pokemons/1/detail?formId=xyz");
        const params = Promise.resolve({ id: "1" });

        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req, { params });
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(response.status).toBe(HttpStatusCode.BadRequest);
    });

    it("should return data when all params are valid", async () => {
        const req = createReq("http://localhost/api/pokemons/1/detail?generationId=2&formId=3&forms");
        const params = Promise.resolve({ id: "1" });

        const pokemonData = { id: 1, name: "Bulbasaur" };
        mockGetDetail.mockResolvedValue(pokemonData);
        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req, { params });
        const json = await response.json();

        expect(json.success).toBe(true);
        expect(json.data).toEqual(pokemonData);
        expect(response.status).toBe(HttpStatusCode.Ok);
    });

    it("should return BadRequest if getDetail returns undefined", async () => {
        const req = createReq();
        const params = Promise.resolve({ id: "1" });

        mockGetDetail.mockResolvedValue(undefined);
        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req, { params });
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(json.error).toBe("La donnée demandée existe pas.");
        expect(response.status).toBe(HttpStatusCode.BadRequest);
    });

    it("should handle generic errors", async () => {
        const req = createReq();
        const params = Promise.resolve({ id: "1" });

        mockGetDetail.mockRejectedValue(new Error("Fail"));
        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req, { params });
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(json.error).toBe("Generic error");
        expect(response.status).toBe(HttpStatusCode.InternalServerError);
    });

});

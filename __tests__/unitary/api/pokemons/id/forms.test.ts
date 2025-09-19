import { GET } from "@app/api/pokemons/[id]/forms/route";
import { getAllPokemonForm } from "@service";
import { sendResponse } from "@utils";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

jest.mock("@service");
jest.mock("@utils");

const mockGetAllPokemonForm = getAllPokemonForm as jest.Mock;
const mockSendResponse = sendResponse as jest.Mock;

function createReq(url = "http://localhost/api/pokemons/1/forms") {
    return {
        nextUrl: new URL(url),
    } as unknown as NextRequest;
}

beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => {}); // désactive les logs
});

describe("GET /api/pokemons/:id/forms", () => {

    it("should return BadRequest if id is invalid", async () => {
        const req = createReq("http://localhost/api/pokemons/abc/forms");
        const params = Promise.resolve({ id: "abc" });

        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req, { params });
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(response.status).toBe(HttpStatusCode.BadRequest);
    });

    it("should return data when id is valid", async () => {
        const req = createReq("http://localhost/api/pokemons/1/forms");
        const params = Promise.resolve({ id: "1" });

        const data = [{ id: 1, name: "Normal Form" }];
        mockGetAllPokemonForm.mockResolvedValue(data);
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

        mockGetAllPokemonForm.mockRejectedValue(new Error("Fail"));
        mockSendResponse.mockImplementation((payload, status) => NextResponse.json(payload, { status }));

        const response = await GET(req, { params });
        const json = await response.json();

        expect(json.success).toBe(false);
        expect(json.error).toBe("Generic error");
        expect(response.status).toBe(HttpStatusCode.InternalServerError);
    });

});

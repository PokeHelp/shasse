import {NextRequest, NextResponse} from "next/server";
import { GET } from "@app/api/pokemons/[id]/abilities/route";
import { sendResponse } from "@utils";
import { getPokemonAbilityWithTranslation } from "@service";
import { HttpStatusCode } from "axios";

jest.mock("@utils", () => ({
    sendResponse: jest.fn(),
    mapError: jest.fn(() => "error"),
}));

jest.mock("@service", () => ({
    getPokemonAbilityWithTranslation: jest.fn(),
}));

describe("GET /api/pokemon/[id]/ability", () => {
    const mockSendResponse = sendResponse as jest.Mock;
    const mockGetPokemonAbility = getPokemonAbilityWithTranslation as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "log").mockImplementation(() => {}); // Supprime les logs
    });

    const createReq = (searchParams?: Record<string, string>) => {
        const url = new URL("http://localhost");
        if (searchParams) {
            Object.entries(searchParams).forEach(([key, value]) => url.searchParams.set(key, value));
        }
        return { nextUrl: url } as unknown as NextRequest;
    };

    it("should return BadRequest if id is invalid", async () => {
        const req = mockNextRequest("abc");
        const params = Promise.resolve({ id: "abc" });

        await GET(req, { params });

        expect(mockSendResponse).toHaveBeenCalledWith(
            expect.objectContaining({ success: false, error: expect.any(String) }),
            HttpStatusCode.BadRequest
        );
    });


    it('should return BadRequest if generationId is invalid', async () => {
        // Création d’un NextRequest minimal typé
        interface TestNextRequest {
            nextUrl: URL;
        }

        const req: TestNextRequest = {
            nextUrl: new URL('http://localhost/api/pokemons/1?generationId=abc'), // invalide
        };

        const params = Promise.resolve({ id: '1' });

        // Appel de la fonction
        await GET(req as unknown as NextRequest, { params });

        // Vérifie que sendResponse a été appelé correctement
        expect(mockSendResponse).toHaveBeenCalledWith(
            expect.objectContaining({
                success: false,
                error: expect.any(String),
            }),
            HttpStatusCode.BadRequest
        );
    });

    it("should return Ok with abilities", async () => {
        const req = createReq({ generationId: "2" });
        const params = Promise.resolve({ id: "1" });

        const abilitiesMock = [{ id: 1, name: "Overgrow" }];
        mockGetPokemonAbility.mockResolvedValue(abilitiesMock);
        mockSendResponse.mockImplementation((payload, status) => new NextResponse(JSON.stringify(payload), { status }));

        const response = await GET(req, { params });
        const json = await response.json();

        expect(mockGetPokemonAbility).toHaveBeenCalledWith(1, 2);
        expect(json.success).toBe(true);
        expect(json.data).toEqual(abilitiesMock);
    });

    it("should handle errors", async () => {
        const req = createReq(); // ton helper
        const params = Promise.resolve({ id: "1" });

        mockGetPokemonAbility.mockRejectedValue(new Error("Fail"));

        // Mock sendResponse pour retourner un vrai NextResponse
        mockSendResponse.mockImplementation((payload, status) =>
            NextResponse.json(payload, { status })
        );

        const response = await GET(req, { params });

        const json = await response.json(); // maintenant OK
        expect(json.success).toBe(false);
        expect(json.error).toBe("Generic error");
        expect(response.status).toBe(500);
    });
});

const mockNextRequest = (id: string, generationId?: string): NextRequest => {
    return {
        nextUrl: {
            searchParams: new URLSearchParams(generationId ? { generationId } : {}),
        },
        headers: new Headers(),
    } as unknown as NextRequest; // cast pour Typescript
};


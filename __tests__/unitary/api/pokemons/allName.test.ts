import { GET } from "@app/api/pokemons/allName/route";
import { getAllIdName } from "@service";
import { getTranslations } from "next-intl/server";
import { reference_table } from "@prisma/client";
import { HttpStatusCode } from "axios";

jest.mock("@service", () => ({
    getAllIdName: jest.fn(),
}));

jest.mock("next-intl/server", () => ({
    getTranslations: jest.fn(),
}));

jest.mock("@utils", () => ({
    sendResponse: jest.fn((payload, status) => new Response(JSON.stringify(payload), { status })),
}));

describe("GET /api/pokemon-names", () => {
    const mockGetAllIdName = getAllIdName as jest.Mock;
    const mockGetTranslations = getTranslations as jest.Mock;

    beforeAll(() => {
        jest.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return success with pokemon names", async () => {
        const mockTranslations = (key: string) => key;
        mockGetTranslations.mockResolvedValue(mockTranslations);

        const mockData = [
            { id: 1, name: "Bulbasaur" },
            { id: 2, name: "Ivysaur" },
        ];
        mockGetAllIdName.mockResolvedValue(mockData);

        const response = await GET();
        const json = await response.json();

        expect(mockGetTranslations).toHaveBeenCalledWith("api");
        expect(mockGetAllIdName).toHaveBeenCalledWith(reference_table.POKEMON);
        expect(json).toEqual({ success: true, data: mockData });
        expect(response.status).toBe(HttpStatusCode.Ok);
    });

    it("should return NoContent if no pokemon names found", async () => {
        const mockTranslations = (key: string) => key;
        mockGetTranslations.mockResolvedValue(mockTranslations);

        mockGetAllIdName.mockResolvedValue([]);

        const response = await GET();
        const json = await response.json();

        expect(json).toEqual({ success: false, error: "base" });
        expect(response.status).toBe(HttpStatusCode.InternalServerError);
    });

    it("should handle errors gracefully", async () => {
        const mockTranslations = (key: string) => key;
        mockGetTranslations.mockResolvedValue(mockTranslations);

        const error = new Error("Test error");
        mockGetAllIdName.mockRejectedValue(error);

        const response = await GET();
        const json = await response.json();

        expect(json).toEqual({ success: false, error: "base" });
        expect(response.status).toBe(HttpStatusCode.InternalServerError);
    });
});

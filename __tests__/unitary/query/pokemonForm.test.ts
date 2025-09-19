import {prisma} from "@lib";
import {getPokemonForm, getPokemonFormPokedexQuery} from "@query";

jest.mock("@lib", () => ({
    prisma: {
        pokemon_form: { findMany: jest.fn() },
        $queryRaw: jest.fn(),
    },
}));

describe("getPokemonForm", () => {
    const mockFindMany = prisma.pokemon_form.findMany as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return selected fields for a given pokemonId and formId", async () => {
        const data = { pokemonId: 1, formId: 2 };
        const mockResult = [{ id: 42 }];
        mockFindMany.mockResolvedValue(mockResult);

        const result = await getPokemonForm(data);

        expect(mockFindMany).toHaveBeenCalledWith({
            where: { pokemonId: 1, formId: 2, status: "on" },
            select: { id: true },
        });
        expect(result).toEqual(mockResult);
    });

    it("should return selected custom fields if select is provided", async () => {
        const data = { pokemonId: 1 };
        const select = { id: true, formId: true };
        const mockResult = [{ id: 42, formId: 2 }];
        mockFindMany.mockResolvedValue(mockResult);

        const result = await getPokemonForm(data, select);

        expect(mockFindMany).toHaveBeenCalledWith({
            where: { pokemonId: 1, formId: undefined, status: "on" },
            select,
        });
        expect(result).toEqual(mockResult);
    });

});

describe("getPokemonFormPokedexQuery", () => {
    const mockQueryRaw = prisma.$queryRaw as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return mapped Pokedex data", async () => {
        const formId = 1;
        const langId = 2;

        const rawResult = [
            {
                id: BigInt(5),
                name: "Bulbasaur",
                international_number: 1,
                generation_id: 1,
                form_ids: "[1,2]",
                types: JSON.stringify([
                    { type_id: 3, order: 1, type_name: "Grass" },
                    { type_id: 4, order: 2, type_name: "Poison" },
                ]),
                pokemon_info_id: BigInt(10),
            },
        ];

        mockQueryRaw.mockResolvedValue(rawResult);

        const result = await getPokemonFormPokedexQuery(formId, langId);

        expect(mockQueryRaw).toHaveBeenCalled();
        expect(result).toEqual([
            {
                id: 5,
                name: "Bulbasaur",
                internationalNumber: 1,
                generationIdApear: 1,
                formIds: [1, 2],
                types: [
                    { id: 3, order: 1, name: "Grass" },
                    { id: 4, order: 2, name: "Poison" },
                ],
            },
        ]);
    });

    it("should return empty array if no results", async () => {
        mockQueryRaw.mockResolvedValue([]);
        const result = await getPokemonFormPokedexQuery(1, 1);
        expect(result).toEqual([]);
    });
});

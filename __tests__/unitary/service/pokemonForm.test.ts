import { getLangueId } from "@src/service/langue";
import { findIdByReferenceTable } from "@src/service/translation";
import { getPokemonFormPokedexQuery } from "@query";
import { Pokedex } from "@types";
import {getPokemonFormPokedex} from "@service";

jest.mock("@src/service/langue", () => ({
    getLangueId: jest.fn(),
}));

jest.mock("@src/service/translation", () => ({
    findIdByReferenceTable: jest.fn(),
}));

jest.mock("@query", () => ({
    getPokemonFormPokedexQuery: jest.fn(),
}));

const mockGetLangueId = getLangueId as jest.Mock;
const mockFindIdByReferenceTable = findIdByReferenceTable as jest.Mock;
const mockGetPokemonFormPokedexQuery = getPokemonFormPokedexQuery as jest.Mock;

describe("getPokemonFormPokedex", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return pokedex data when formId and langId are provided", async () => {
        const mockResult: Pokedex[] = [{
            id:                  1, name: "Bulbasaur",
            internationalNumber: 0,
            generationIdApear:   0,
            types:               [],
            formIds:             []
        }];
        mockGetPokemonFormPokedexQuery.mockResolvedValue(mockResult);

        const result = await getPokemonFormPokedex(1, 2);

        expect(mockGetPokemonFormPokedexQuery).toHaveBeenCalledWith(1, 2);
        expect(result).toEqual(mockResult);
    });

    it("should call getLangueId if langId is not provided", async () => {
        mockGetLangueId.mockResolvedValue(1);
        mockGetPokemonFormPokedexQuery.mockResolvedValue([]);

        await getPokemonFormPokedex(1);

        expect(mockGetLangueId).toHaveBeenCalledWith("french");
        expect(mockGetPokemonFormPokedexQuery).toHaveBeenCalledWith(1, 1);
    });

    it("should call findIdByReferenceTable if formId is not provided", async () => {
        mockGetLangueId.mockResolvedValue(1);
        mockFindIdByReferenceTable.mockResolvedValue(5);
        mockGetPokemonFormPokedexQuery.mockResolvedValue([]);

        await getPokemonFormPokedex(undefined, 2);

        expect(mockFindIdByReferenceTable).toHaveBeenCalledWith("Normal", "FORM");
        expect(mockGetPokemonFormPokedexQuery).toHaveBeenCalledWith(5, 2);
    });

    it("should call both getLangueId and findIdByReferenceTable if neither is provided", async () => {
        mockGetLangueId.mockResolvedValue(10);
        mockFindIdByReferenceTable.mockResolvedValue(7);
        mockGetPokemonFormPokedexQuery.mockResolvedValue([]);

        await getPokemonFormPokedex();

        expect(mockGetLangueId).toHaveBeenCalledWith("french");
        expect(mockFindIdByReferenceTable).toHaveBeenCalledWith("Normal", "FORM");
        expect(mockGetPokemonFormPokedexQuery).toHaveBeenCalledWith(7, 10);
    });
});

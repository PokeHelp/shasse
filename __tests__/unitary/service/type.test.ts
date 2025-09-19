import { getLangueId } from "@src/service/langue";
import { getAllTypeWithName, getPokemonTypeWithName } from "@query";
import { getAllTypeWithTranslation, getPokemonTypeWithTranslation } from "@src/service/type";
import { TypeGeneration, TypeName } from "@types";

jest.mock("@src/service/langue", () => ({
    getLangueId: jest.fn(),
}));

jest.mock("@query", () => ({
    getAllTypeWithName: jest.fn(),
    getPokemonTypeWithName: jest.fn(),
}));

const mockGetLangueId = getLangueId as jest.Mock;
const mockGetAllTypeWithName = getAllTypeWithName as jest.Mock;
const mockGetPokemonTypeWithName = getPokemonTypeWithName as jest.Mock;

describe("type service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getAllTypeWithTranslation", () => {
        it("should return all types with provided langId", async () => {
            const langId = 1;
            const mockResult: TypeName[] = [
                { id: 1, name: "Grass" },
                { id: 2, name: "Fire" },
            ];
            mockGetAllTypeWithName.mockResolvedValue(mockResult);

            const result = await getAllTypeWithTranslation(langId);

            expect(mockGetAllTypeWithName).toHaveBeenCalledWith(langId);
            expect(result).toEqual(mockResult);
        });

        it("should call getLangueId if langId is not provided", async () => {
            mockGetLangueId.mockResolvedValue(1);
            const mockResult: TypeName[] = [{ id: 1, name: "Grass" }];
            mockGetAllTypeWithName.mockResolvedValue(mockResult);

            const result = await getAllTypeWithTranslation();

            expect(mockGetLangueId).toHaveBeenCalledWith("french");
            expect(mockGetAllTypeWithName).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockResult);
        });
    });

    describe("getPokemonTypeWithTranslation", () => {
        it("should return types for a pokemon with provided langId and generationId", async () => {
            const pokemonId = 1;
            const langId = 1;
            const generationId = 2;
            const mockResult: TypeGeneration[] = [
                { id: 1, generationId, order: 1, name: "Grass" },
            ];
            mockGetPokemonTypeWithName.mockResolvedValue(mockResult);

            const result = await getPokemonTypeWithTranslation(pokemonId, generationId, langId);

            expect(mockGetPokemonTypeWithName).toHaveBeenCalledWith(pokemonId, langId, generationId);
            expect(result).toEqual(mockResult);
        });

        it("should call getLangueId if langId is not provided", async () => {
            mockGetLangueId.mockResolvedValue(1);
            const pokemonId = 1;
            const generationId = 2;
            const mockResult: TypeGeneration[] = [
                { id: 1, generationId, order: 1, name: "Grass" },
            ];
            mockGetPokemonTypeWithName.mockResolvedValue(mockResult);

            const result = await getPokemonTypeWithTranslation(pokemonId, generationId);

            expect(mockGetLangueId).toHaveBeenCalledWith("french");
            expect(mockGetPokemonTypeWithName).toHaveBeenCalledWith(pokemonId, 1, generationId);
            expect(result).toEqual(mockResult);
        });

        it("should handle null generationId", async () => {
            mockGetLangueId.mockResolvedValue(1);
            const pokemonId = 1;
            const mockResult: TypeGeneration[] = [
                { id: 1, generationId: 1, order: 1, name: "Grass" },
            ];
            mockGetPokemonTypeWithName.mockResolvedValue(mockResult);

            const result = await getPokemonTypeWithTranslation(pokemonId, null);

            expect(mockGetLangueId).toHaveBeenCalledWith("french");
            expect(mockGetPokemonTypeWithName).toHaveBeenCalledWith(pokemonId, 1, null);
            expect(result).toEqual(mockResult);
        });
    });
});

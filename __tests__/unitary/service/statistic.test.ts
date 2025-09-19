import { getPokemonStatisticWithTranslation } from "@src/service/statistic";
import { getPokemonStatisticWithName } from "@query";
import { StatisticGeneration } from "@types";

jest.mock("@query", () => ({
    getPokemonStatisticWithName: jest.fn(),
}));

const mockGetPokemonStatisticWithName = getPokemonStatisticWithName as jest.Mock;

describe("getPokemonStatisticWithTranslation", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return statistics for a given pokemonId and generationId", async () => {
        const mockResult: StatisticGeneration[] = [
            { generationId: 1, pv: 10, attack: 5, defense: 5, special: 0, specialAttack: 0, specialDefense: 0, speed: 5 }
        ];

        mockGetPokemonStatisticWithName.mockResolvedValue(mockResult);

        const result = await getPokemonStatisticWithTranslation(1, 1);

        expect(mockGetPokemonStatisticWithName).toHaveBeenCalledWith(1, 1);
        expect(result).toEqual(mockResult);
    });

    it("should return statistics if generationId is not provided", async () => {
        const mockResult: StatisticGeneration[] = [
            { generationId: 1, pv: 20, attack: 10, defense: 10, special: 5, specialAttack: 5, specialDefense: 5, speed: 10 }
        ];

        mockGetPokemonStatisticWithName.mockResolvedValue(mockResult);

        const result = await getPokemonStatisticWithTranslation(2);

        expect(mockGetPokemonStatisticWithName).toHaveBeenCalledWith(2, undefined);
        expect(result).toEqual(mockResult);
    });

    it("should return an empty array if query returns nothing", async () => {
        mockGetPokemonStatisticWithName.mockResolvedValue([]);

        const result = await getPokemonStatisticWithTranslation(3, 2);

        expect(mockGetPokemonStatisticWithName).toHaveBeenCalledWith(3, 2);
        expect(result).toEqual([]);
    });
});

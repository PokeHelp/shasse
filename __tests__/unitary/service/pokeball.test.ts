import { getAllPokeball } from "@src/service/pokeball";
import { getAllPokeball as getAllPokeballQuery } from "@query";
import { TranslationIdNames } from "@types";

jest.mock("@query", () => ({
    getAllPokeball: jest.fn(),
}));

const mockGetAllPokeballQuery = getAllPokeballQuery as jest.Mock;

describe("getAllPokeball", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return the list of pokeballs", async () => {
        const mockResult: TranslationIdNames[] = [
            { id: 1, name: "Pokéball" },
            { id: 2, name: "Great Ball" },
        ];
        mockGetAllPokeballQuery.mockResolvedValue(mockResult);

        const result = await getAllPokeball();

        expect(mockGetAllPokeballQuery).toHaveBeenCalled();
        expect(result).toEqual(mockResult);
    });

    it("should return an empty array if no pokeballs", async () => {
        mockGetAllPokeballQuery.mockResolvedValue([]);

        const result = await getAllPokeball();

        expect(mockGetAllPokeballQuery).toHaveBeenCalled();
        expect(result).toEqual([]);
    });
});

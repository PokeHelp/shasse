import { getPokemonEggGroupWithTranslation } from "@service";
import { getLangueId } from "@src/service/langue";
import { getPokemonEggGroupWithName } from "@query";
import type { EggGroupGeneration } from "@types";

// On mocke les dépendances
jest.mock("@src/service/langue", () => ({
    getLangueId: jest.fn()
}));

jest.mock("@query", () => ({
    getPokemonEggGroupWithName: jest.fn()
}));

describe("getPokemonEggGroupWithTranslation", () => {
    const mockGetLangueId = getLangueId as jest.Mock;
    const mockGetPokemonEggGroupWithName = getPokemonEggGroupWithName as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should call getLangueId('french') when langId is undefined", async () => {
        const fakeLangId = 10;
        const fakeResult: EggGroupGeneration[] = [
            { id: 1, generationId: 1, name: "Monster", order: 1 }
        ];

        mockGetLangueId.mockResolvedValue(fakeLangId);
        mockGetPokemonEggGroupWithName.mockResolvedValue(fakeResult);

        const result = await getPokemonEggGroupWithTranslation(25, null, undefined);

        expect(mockGetLangueId).toHaveBeenCalledWith("french");
        expect(mockGetPokemonEggGroupWithName).toHaveBeenCalledWith(25, fakeLangId, null);
        expect(result).toEqual(fakeResult);
    });

    it("should use provided langId without calling getLangueId", async () => {
        const fakeLangId = 3;
        const fakeResult: EggGroupGeneration[] = [
            { id: 2, generationId: 2, name: "Water 1", order: 1 }
        ];

        mockGetPokemonEggGroupWithName.mockResolvedValue(fakeResult);

        const result = await getPokemonEggGroupWithTranslation(150, 2, fakeLangId);

        expect(mockGetLangueId).not.toHaveBeenCalled();
        expect(mockGetPokemonEggGroupWithName).toHaveBeenCalledWith(150, fakeLangId, 2);
        expect(result).toEqual(fakeResult);
    });

    it("should propagate null values correctly to getPokemonEggGroupWithName", async () => {
        const fakeLangId = 8;
        const fakeResult: EggGroupGeneration[] = [
            { id: 5, generationId: 5, name: "Dragon", order: 2 }
        ];

        mockGetLangueId.mockResolvedValue(fakeLangId);
        mockGetPokemonEggGroupWithName.mockResolvedValue(fakeResult);

        const result = await getPokemonEggGroupWithTranslation(200, null, null);

        expect(mockGetLangueId).toHaveBeenCalledWith("french");
        expect(mockGetPokemonEggGroupWithName).toHaveBeenCalledWith(200, fakeLangId, null);
        expect(result).toEqual(fakeResult);
    });

    it("should throw if getPokemonEggGroupWithName rejects", async () => {
        const fakeLangId = 4;
        mockGetLangueId.mockResolvedValue(fakeLangId);
        mockGetPokemonEggGroupWithName.mockRejectedValue(new Error("DB error"));

        await expect(getPokemonEggGroupWithTranslation(10, 1, undefined)).rejects.toThrow("DB error");
    });
});

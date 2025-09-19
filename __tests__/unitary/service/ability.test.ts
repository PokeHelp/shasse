import {getLangueId} from "@src/service/langue";
import {getPokemonAbilityWithName} from "@query";
import type {AbilityGeneration} from "@types";
import {getPokemonAbilityWithTranslation} from "@service";

// On mocke les dépendances
jest.mock("@src/service/langue", () => ({
    getLangueId: jest.fn()
}));

jest.mock("@query", () => ({
    getPokemonAbilityWithName: jest.fn()
}));

describe("getPokemonAbilityWithTranslation", () =>
{
    const mockGetLangueId = getLangueId as jest.Mock;
    const mockGetPokemonAbilityWithName = getPokemonAbilityWithName as jest.Mock;

    beforeEach(() =>
    {
        jest.clearAllMocks();
    });

    it("should call getLangueId('french') when langId is undefined", async () =>
    {
        const fakeLangId = 5;
        const fakeResult: AbilityGeneration[] = [
            {
                id:       1, generationId: 1, name: "Overgrow",
                order:    0,
                isHidden: false
            }
        ];

        mockGetLangueId.mockResolvedValue(fakeLangId);
        mockGetPokemonAbilityWithName.mockResolvedValue(fakeResult);

        const result = await getPokemonAbilityWithTranslation(25, null, undefined);

        expect(mockGetLangueId).toHaveBeenCalledWith("french");
        expect(mockGetPokemonAbilityWithName).toHaveBeenCalledWith(25, fakeLangId, null);
        expect(result).toEqual(fakeResult);
    });

    it("should use provided langId without calling getLangueId", async () =>
    {
        const fakeLangId = 2;
        const fakeResult: AbilityGeneration[] = [
            {
                id:       2, generationId: 2, name: "Chlorophyll",
                order:    0,
                isHidden: false
            }
        ];

        mockGetPokemonAbilityWithName.mockResolvedValue(fakeResult);

        const result = await getPokemonAbilityWithTranslation(1, 3, fakeLangId);

        expect(mockGetLangueId).not.toHaveBeenCalled();
        expect(mockGetPokemonAbilityWithName).toHaveBeenCalledWith(1, fakeLangId, 3);
        expect(result).toEqual(fakeResult);
    });

    it("should pass null values correctly to getPokemonAbilityWithName", async () =>
    {
        const fakeLangId = 7;
        const fakeResult: AbilityGeneration[] = [
            {
                id:       3, generationId: 5, name: "Blaze",
                order:    0,
                isHidden: false
            }
        ];

        mockGetLangueId.mockResolvedValue(fakeLangId);
        mockGetPokemonAbilityWithName.mockResolvedValue(fakeResult);

        const result = await getPokemonAbilityWithTranslation(150, null, null);

        expect(mockGetLangueId).toHaveBeenCalledWith("french");
        expect(mockGetPokemonAbilityWithName).toHaveBeenCalledWith(150, fakeLangId, null);
        expect(result).toEqual(fakeResult);
    });
});

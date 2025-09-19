import { getAllGameIdNameByPokemon, getLangueId } from "@service";
import { getGameFiltered } from "@query";
import { TranslationIdNames } from "@types";

// On mock les dépendances
jest.mock("@src/service/langue", () => ({
    getLangueId: jest.fn(),
}));

jest.mock("@query", () => ({
    getGameFiltered: jest.fn(),
}));

const mockGetLangueId = getLangueId as jest.Mock;
const mockGetGameFiltered = getGameFiltered as jest.Mock;

describe("getAllGameIdNameByPokemon", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should fetch games with provided langId", async () => {
        const mockResult = [
            { referenceId: BigInt(1), name: "Red" },
            { referenceId: BigInt(2), name: "Blue" },
        ];
        mockGetGameFiltered.mockResolvedValue(mockResult);

        const result = await getAllGameIdNameByPokemon(null, 99);

        expect(mockGetGameFiltered).toHaveBeenCalledWith(null, 99);
        expect(result).toEqual<TranslationIdNames[]>([
            { id: 1, name: "Red" },
            { id: 2, name: "Blue" },
        ]);
    });

    it("should resolve langId with getLangueId if not provided", async () => {
        mockGetLangueId.mockResolvedValue(42);
        const mockResult = [{ referenceId: BigInt(10), name: "Gold" }];
        mockGetGameFiltered.mockResolvedValue(mockResult);

        const result = await getAllGameIdNameByPokemon(5);

        expect(mockGetLangueId).toHaveBeenCalledWith("french");
        expect(mockGetGameFiltered).toHaveBeenCalledWith(5, 42);
        expect(result).toEqual([{ id: 10, name: "Gold" }]);
    });

    it("should handle empty results from getGameFiltered", async () => {
        mockGetLangueId.mockResolvedValue(1);
        mockGetGameFiltered.mockResolvedValue([]);

        const result = await getAllGameIdNameByPokemon(7);

        expect(result).toEqual([]);
    });
});

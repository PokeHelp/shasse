import {prisma} from "@lib";
import {getGameFiltered} from "@query";

// Mock de prisma
jest.mock("@lib", () => ({
    prisma: {
        $queryRaw: jest.fn()
    }
}));

const mockQueryRaw = prisma.$queryRaw as jest.Mock;

describe("getGameFiltered", () =>
{
    afterEach(() =>
    {
        jest.clearAllMocks();
    });

    it("should return games without pokemonId filter", async () =>
    {
        const mockResult = [
            {reference_id: BigInt(1), name: "Game A"},
            {reference_id: BigInt(2), name: "Game B"}
        ];
        mockQueryRaw.mockResolvedValue(mockResult);

        const langId = 1;
        const result = await getGameFiltered(null, langId);

        // Vérifie que $queryRaw a été appelé au moins une fois
        expect(mockQueryRaw).toHaveBeenCalled();

        // Vérifie que le résultat est transformé correctement
        expect(result).toEqual([
            {referenceId: BigInt(1), name: "Game A"},
            {referenceId: BigInt(2), name: "Game B"}
        ]);
    });

    it("should apply pokemonId filter if provided", async () =>
    {
        const mockResult = [{reference_id: BigInt(3), name: "Game C"}];
        mockQueryRaw.mockResolvedValue(mockResult);

        const pokemonId = 10;
        const langId = 2;

        const result = await getGameFiltered(pokemonId, langId);

        // Vérifie que $queryRaw a été appelé
        expect(mockQueryRaw).toHaveBeenCalled();

        // Vérifie le retour transformé correctement
        expect(result).toEqual([{referenceId: BigInt(3), name: "Game C"}]);
    });
});

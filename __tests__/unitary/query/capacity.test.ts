// Mock complet de prisma
import {prisma} from "@lib";
import {getCapacities} from "@query";

jest.mock("@lib", () => ({
    prisma: {
        $queryRaw: jest.fn()
    }
}));

describe("getCapacities", () => {
    const mockQueryRaw = prisma.$queryRaw as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return formatted capacities", async () => {
        const pokemonId = 1;
        const langId = 2;
        const generationId = 3;

        // Valeurs simulées renvoyées par la requête brute
        mockQueryRaw.mockResolvedValue([
            {
                capacity_name: "Tackle",
                generation_id: "1",
                obtation_type_name: "LevelUp",
                detail: "Some detail"
            },
            {
                capacity_name: "Growl",
                generation_id: "1",
                obtation_type_name: "TM",
                detail: "Other detail"
            }
        ]);

        const result = await getCapacities(pokemonId, generationId, langId);

        expect(mockQueryRaw).toHaveBeenCalled(); // s'assure que la requête est exécutée
        expect(result).toEqual([
            {
                name: "Tackle",
                generationId: 1,
                obtationTypeName: "LevelUp",
                detail: "Some detail"
            },
            {
                name: "Growl",
                generationId: 1,
                obtationTypeName: "TM",
                detail: "Other detail"
            }
        ]);
    });

    it("should handle null generationId", async () => {
        const pokemonId = 1;
        const langId = 2;

        mockQueryRaw.mockResolvedValue([]);

        const result = await getCapacities(pokemonId, null, langId);

        expect(mockQueryRaw).toHaveBeenCalled();
        expect(result).toEqual([]);
    });
});

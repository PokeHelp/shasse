// Mock complet de prisma
import {prisma} from "@lib";
import {getPokemonAbilityWithName} from "@query";

jest.mock("@lib", () => ({
    prisma: {
        $queryRaw: jest.fn()
    }
}));

describe("getPokemonAbilityWithName", () => {
    const mockQueryRaw = prisma.$queryRaw as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return formatted abilities", async () => {
        const pokemonId = 1;
        const langId = 2;
        const generationId = 3;

        // On prépare ce que $queryRaw va renvoyer
        mockQueryRaw.mockResolvedValue([
            {
                id: BigInt(10),
                name: "Overgrow",
                generation_id: BigInt(1),
                order: 0,
                is_hidden: false
            },
            {
                id: BigInt(20),
                name: "Chlorophyll",
                generation_id: BigInt(1),
                order: 1,
                is_hidden: true
            }
        ]);

        const result = await getPokemonAbilityWithName(pokemonId, langId, generationId);

        expect(mockQueryRaw).toHaveBeenCalled(); // s'assure que la requête est faite
        expect(result).toEqual([
            {
                id: 10,
                name: "Overgrow",
                generationId: 1,
                order: 0,
                isHidden: false
            },
            {
                id: 20,
                name: "Chlorophyll",
                generationId: 1,
                order: 1,
                isHidden: true
            }
        ]);
    });

    it("should handle optional generationId", async () => {
        const pokemonId = 1;
        const langId = 2;

        mockQueryRaw.mockResolvedValue([]);

        const result = await getPokemonAbilityWithName(pokemonId, langId);

        expect(mockQueryRaw).toHaveBeenCalled();
        expect(result).toEqual([]);
    });
});

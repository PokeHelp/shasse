import {prisma} from "@lib";
import {getPokemonStatisticWithName} from "@query";

jest.mock("@lib", () => ({
    prisma: {
        $queryRaw: jest.fn(),
    },
}));

describe("getPokemonStatisticWithName", () => {
    const mockQueryRaw = prisma.$queryRaw as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return mapped statistics for a given pokemon", async () => {
        const pokemonId = 1;
        const rawResult = [
            {
                id: BigInt(10),
                generation_id: BigInt(2),
                pv: 45,
                attack: 49,
                defense: 49,
                special_attack: 65,
                special_defense: 65,
                special: 0,
                speed: 45,
            },
        ];

        mockQueryRaw.mockResolvedValue(rawResult);

        const result = await getPokemonStatisticWithName(pokemonId);

        expect(mockQueryRaw).toHaveBeenCalled();
        expect(result).toEqual([
            {
                id: 10,
                generationId: 2,
                pv: 45,
                attack: 49,
                defense: 49,
                specialAttack: 65,
                specialDefense: 65,
                special: 0,
                speed: 45,
            },
        ]);
    });

    it("should return empty array if no statistics found", async () => {
        mockQueryRaw.mockResolvedValue([]);

        const result = await getPokemonStatisticWithName(1);

        expect(result).toEqual([]);
    });

    it("should include generationId filter if provided", async () => {
        const pokemonId = 1;
        const generationId = 3;

        mockQueryRaw.mockResolvedValue([
            {
                id: BigInt(11),
                generation_id: BigInt(generationId),
                pv: 50,
                attack: 55,
                defense: 50,
                special_attack: 65,
                special_defense: 65,
                special: 0,
                speed: 60,
            },
        ]);

        const result = await getPokemonStatisticWithName(pokemonId, generationId);

        expect(mockQueryRaw).toHaveBeenCalled();
        expect(result[0].generationId).toBe(generationId);
    });
});

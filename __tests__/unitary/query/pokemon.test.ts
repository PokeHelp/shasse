import {prisma} from "@lib";
import {getPokemonInfoById} from "@query";

jest.mock("@lib", () => ({
    prisma: {
        $queryRaw: jest.fn(),
    },
}));

describe("getPokemonInfoById", () => {
    const mockQueryRaw = prisma.$queryRaw as jest.Mock;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return mapped PokemonInfo", async () => {
        const pokemonId = 1;
        const langId = 2;
        const generationId = 3;

        const rawResult = [
            {
                id: BigInt(10),
                name: "Pikachu",
                international_number: 25,
                hatching_cycle: 5,
                global_xp: 100,
                capture_rate: 45,
                call_help_rate: 10,
                size: 0.4,
                weight: 6,
                male_rate: 50,
                femelle_rate: 50,
                xp_gift: 20,
                generation_id: BigInt(3),
                gen_apear: BigInt(1),
                category_name: "Mouse",
            },
        ];

        mockQueryRaw.mockResolvedValue(rawResult);

        const result = await getPokemonInfoById(pokemonId, langId, generationId);

        expect(mockQueryRaw).toHaveBeenCalled();
        expect(result).toEqual([
            {
                id: 10,
                name: "Pikachu",
                internationalNumber: 25,
                hatchingCycle: 5,
                globalXp: 100,
                captureRate: 45,
                callHelpRate: 10,
                size: 0.4,
                weight: 6,
                maleRate: 50,
                femelleRate: 50,
                generationAppear: 1,
                categoryName: "Mouse",
                generationId: 3,
                xpGift: 20,
            },
        ]);
    });

    it("should handle null generationId", async () => {
        const pokemonId = 1;
        const langId = 2;

        const rawResult = [
            {
                id: BigInt(10),
                name: "Pikachu",
                international_number: 25,
                hatching_cycle: 5,
                global_xp: 100,
                capture_rate: 45,
                call_help_rate: 10,
                size: 0.4,
                weight: 6,
                male_rate: 50,
                femelle_rate: 50,
                xp_gift: 20,
                generation_id: BigInt(3),
                gen_apear: BigInt(1),
                category_name: "Mouse",
            },
        ];

        mockQueryRaw.mockResolvedValue(rawResult);

        const result = await getPokemonInfoById(pokemonId, langId);

        expect(mockQueryRaw).toHaveBeenCalled();
        expect(result[0].generationId).toBe(3);
    });
});

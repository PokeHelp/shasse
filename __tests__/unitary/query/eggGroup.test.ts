import { prisma } from "@lib";
import { Prisma } from "@prisma/client";
import { getPokemonEggGroupWithName } from "@query";
import { EggGroupGeneration } from "@types";

jest.mock("@lib", () => ({
    prisma: {
        $queryRaw: jest.fn()
    }
}));

const mockQueryRaw = prisma.$queryRaw as jest.Mock;

describe("getPokemonEggGroupWithName", () => {
    afterEach(() => jest.clearAllMocks());

    it("should return egg groups for a pokemon without generation filter", async () => {
        const mockResult = [
            { id: BigInt(1), name: "Monster", generation_id: BigInt(1), order: 1 },
            { id: BigInt(2), name: "Water 1", generation_id: BigInt(1), order: 2 }
        ];

        mockQueryRaw.mockResolvedValue(mockResult);

        const result = await getPokemonEggGroupWithName(1, 1);

        expect(mockQueryRaw).toHaveBeenCalled();

        expect(result).toEqual<EggGroupGeneration[]>([
            { id: 1, generationId: 1, name: "Monster", order: 1 },
            { id: 2, generationId: 1, name: "Water 1", order: 2 }
        ]);
    });


    it("should return empty array if no results", async () => {
        mockQueryRaw.mockResolvedValue([]);

        const result = await getPokemonEggGroupWithName(999, 1);

        expect(result).toEqual([]);
        expect(mockQueryRaw).toHaveBeenCalled();
    });
});

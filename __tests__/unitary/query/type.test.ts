// On mock prisma
import {prisma} from "@lib";
import {getAllType, getAllTypeWithName, getPokemonTypeWithName} from "@query";

jest.mock("@lib", () => ({
    prisma: {
        type: { findMany: jest.fn() },
        $queryRaw: jest.fn()
    }
}));

describe("Type utils", () => {
    const mockFindMany = prisma.type.findMany as jest.Mock;
    const mockQueryRaw = prisma.$queryRaw as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getAllType", () => {
        it("should return types with select", async () => {
            mockFindMany.mockResolvedValue([{ id: 1 }, { id: 2 }]);
            const result = await getAllType();
            expect(mockFindMany).toHaveBeenCalledWith({
                where: { status: "on" },
                select: { id: true }
            });
            expect(result).toEqual([{ id: 1 }, { id: 2 }]);
        });

        it("should return types with custom select", async () => {
            mockFindMany.mockResolvedValue([{ id: 1, name: "Fire" }]);
            const result = await getAllType({ id: true, name: true });
            expect(mockFindMany).toHaveBeenCalledWith({
                where: { status: "on" },
                select: { id: true, name: true }
            });
            expect(result).toEqual([{ id: 1, name: "Fire" }]);
        });
    });

    describe("getAllTypeWithName", () => {
        it("should map raw results to TypeName[]", async () => {
            const langId = 1;
            mockQueryRaw.mockResolvedValue([
                { id: BigInt(1), name: "Fire" },
                { id: BigInt(2), name: "Water" }
            ]);

            const result = await getAllTypeWithName(langId);

            expect(mockQueryRaw).toHaveBeenCalled();
            expect(result).toEqual([
                { id: 1, name: "Fire" },
                { id: 2, name: "Water" }
            ]);
        });
    });

    describe("getPokemonTypeWithName", () => {
        it("should map raw results to TypeGeneration[]", async () => {
            const pokemonId = 1;
            const langId = 1;
            const generationId = 2;

            mockQueryRaw.mockResolvedValue([
                { id: BigInt(3), generation_id: BigInt(2), name: "Fire", order: 1 },
                { id: BigInt(4), generation_id: BigInt(2), name: "Flying", order: 2 }
            ]);

            const result = await getPokemonTypeWithName(pokemonId, langId, generationId);

            expect(mockQueryRaw).toHaveBeenCalled();
            expect(result).toEqual([
                { id: 3, generationId: 2, name: "Fire", order: 1 },
                { id: 4, generationId: 2, name: "Flying", order: 2 }
            ]);
        });

        it("should handle undefined generationId", async () => {
            const pokemonId = 1;
            const langId = 1;

            mockQueryRaw.mockResolvedValue([
                { id: BigInt(3), generation_id: BigInt(1), name: "Fire", order: 1 }
            ]);

            const result = await getPokemonTypeWithName(pokemonId, langId);

            expect(result).toEqual([{ id: 3, generationId: 1, name: "Fire", order: 1 }]);
        });
    });
});

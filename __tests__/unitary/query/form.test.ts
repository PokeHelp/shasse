import { prisma } from "@lib";
import { getFormsByPokemonId, getFormsByPokemonIdWithName, getRegionalFormsByPokemonIdWithName } from "@query";

// Mock de prisma
jest.mock("@lib", () => ({
    prisma: {
        pokemon_form: { findMany: jest.fn() },
        $queryRaw: jest.fn()
    }
}));

const mockFindMany = prisma.pokemon_form.findMany as jest.Mock;
const mockQueryRaw = prisma.$queryRaw as jest.Mock;

describe("Forms queries", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getFormsByPokemonId", () => {
        it("should return forms for given pokemonId", async () => {
            mockFindMany.mockResolvedValue([{ id: 1 }, { id: 2 }]);

            const pokemonId = 10;
            const result = await getFormsByPokemonId(pokemonId);

            expect(mockFindMany).toHaveBeenCalledWith({
                where: { status: "on", pokemonId },
                select: { id: true }
            });
            expect(result).toEqual([{ id: 1 }, { id: 2 }]);
        });

        it("should apply custom select", async () => {
            mockFindMany.mockResolvedValue([{ form_id: 1 }]);

            const pokemonId = 5;
            const result = await getFormsByPokemonId(pokemonId, { formId: true });

            expect(mockFindMany).toHaveBeenCalledWith({
                where: { status: "on", pokemonId },
                select: { formId: true }
            });
            expect(result).toEqual([{ form_id: 1 }]);
        });
    });

    describe("getFormsByPokemonIdWithName", () => {
        it("should return forms with names", async () => {
            const mockResult = [
                { name: "Form A", form_id: 1 },
                { name: "Form B", form_id: 2 }
            ];
            mockQueryRaw.mockResolvedValue(mockResult);

            const pokemonId = 10;
            const langueId = 2;

            const result = await getFormsByPokemonIdWithName(pokemonId, langueId);

            expect(mockQueryRaw).toHaveBeenCalled();
            expect(result).toEqual([
                { name: "Form A", id: 1 },
                { name: "Form B", id: 2 }
            ]);
        });
    });

    describe("getRegionalFormsByPokemonIdWithName", () => {
        it("should return regional forms with correct structure", async () => {
            const mockResult = [
                { id: BigInt(1), form_id: BigInt(11), name: "Regional A", international_number: 25 },
                { id: BigInt(2), form_id: BigInt(12), name: "Regional B", international_number: 25 }
            ];
            mockQueryRaw.mockResolvedValue(mockResult);

            const pokemonId = 25;
            const langueId = 1;

            const result = await getRegionalFormsByPokemonIdWithName(pokemonId, langueId);

            expect(mockQueryRaw).toHaveBeenCalled();
            expect(result).toEqual([
                { id: 1, formId: 11, name: "Regional A", internationalNumber: 25 },
                { id: 2, formId: 12, name: "Regional B", internationalNumber: 25 }
            ]);
        });
    });

});

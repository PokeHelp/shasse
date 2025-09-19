import {prisma} from "@lib";
import {reference_table} from "@prisma/client";
import {getAllTranslationIdNames, getReferenceId, getTranslation, getTranslationsByReferenceId} from "@query";

jest.mock("@lib", () => ({
    prisma: {
        translation: {
            findFirst: jest.fn(),
            findMany: jest.fn()
        }
    }
}));

describe("Translation utils", () => {
    const mockFindFirst = prisma.translation.findFirst as jest.Mock;
    const mockFindMany = prisma.translation.findMany as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getReferenceId", () => {
        it("should return referenceId if found", async () => {
            const data = { referenceTable: reference_table.POKEMON, name: "Pikachu", langId: 1 };
            mockFindFirst.mockResolvedValue({ referenceId: BigInt(10) });

            const result = await getReferenceId(data);

            expect(mockFindFirst).toHaveBeenCalledWith({
                where: {
                    referenceTable: data.referenceTable,
                    name: data.name,
                    langueId: data.langId
                },
                select: { referenceId: true }
            });
            expect(result).toEqual({ referenceId: BigInt(10) });
        });

        it("should return null if not found", async () => {
            mockFindFirst.mockResolvedValue(null);
            const result = await getReferenceId({ referenceTable: reference_table.POKEMON, name: "Unknown", langId: 1 });
            expect(result).toBeNull();
        });
    });

    describe("getTranslation", () => {
        it("should return name if found", async () => {
            const data = { referenceTable: reference_table.POKEMON, id: BigInt(5), langId: 1 };
            mockFindFirst.mockResolvedValue({ name: "Pikachu" });

            const result = await getTranslation(data);

            expect(mockFindFirst).toHaveBeenCalledWith({
                where: {
                    referenceTable: data.referenceTable,
                    referenceId: data.id,
                    langueId: data.langId
                },
                select: { name: true }
            });
            expect(result).toEqual({ name: "Pikachu" });
        });

        it("should return null if not found", async () => {
            mockFindFirst.mockResolvedValue(null);
            const result = await getTranslation({ referenceTable: reference_table.POKEMON, id: BigInt(0), langId: 1 });
            expect(result).toBeNull();
        });
    });

    describe("getTranslationsByReferenceId", () => {
        it("should return mapped translations", async () => {
            const referenceIds = [1, 2];
            const langId = 1;
            const refTable = reference_table.POKEMON;
            mockFindMany.mockResolvedValue([
                { referenceId: BigInt(1), name: "Pikachu" },
                { referenceId: BigInt(2), name: "Raichu" }
            ]);

            const result = await getTranslationsByReferenceId(referenceIds, langId, refTable);

            expect(mockFindMany).toHaveBeenCalledWith({
                where: {
                    langueId: langId,
                    referenceTable: refTable,
                    referenceId: { in: referenceIds }
                },
                select: { referenceId: true, name: true }
            });
            expect(result).toEqual([
                { referenceId: BigInt(1), name: "Pikachu" },
                { referenceId: BigInt(2), name: "Raichu" }
            ]);
        });
    });

    describe("getAllTranslationIdNames", () => {
        it("should return all translations with name and referenceId", async () => {
            const refTable = reference_table.POKEMON;
            const langId = 1;
            mockFindMany.mockResolvedValue([
                { name: "Pikachu", referenceId: BigInt(1) },
                { name: "Raichu", referenceId: BigInt(2) }
            ]);

            const result = await getAllTranslationIdNames(refTable, langId);

            expect(mockFindMany).toHaveBeenCalledWith({
                where: { status: "on", referenceTable: refTable, langueId: langId },
                select: { name: true, referenceId: true }
            });
            expect(result).toEqual([
                { name: "Pikachu", referenceId: BigInt(1) },
                { name: "Raichu", referenceId: BigInt(2) }
            ]);
        });
    });
});

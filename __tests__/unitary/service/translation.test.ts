import { reference_table } from "@prisma/client";
import { getLangueId } from "@service";
import { getAllTranslationIdNames, getReferenceId, getTranslation } from "@query";
import { findIdByReferenceTable, findNameByReferenceTable, getAllIdName } from "@src/service/translation";

jest.mock("@service", () => ({
    getLangueId: jest.fn(),
}));

jest.mock("@query", () => ({
    getReferenceId: jest.fn(),
    getTranslation: jest.fn(),
    getAllTranslationIdNames: jest.fn(),
}));

const mockGetLangueId = getLangueId as jest.Mock;
const mockGetReferenceId = getReferenceId as jest.Mock;
const mockGetTranslation = getTranslation as jest.Mock;
const mockGetAllTranslationIdNames = getAllTranslationIdNames as jest.Mock;

describe("translation service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("findIdByReferenceTable", () => {
        it("should return the referenceId when found", async () => {
            mockGetLangueId.mockResolvedValue(1);
            mockGetReferenceId.mockResolvedValue({ referenceId: BigInt(123) });

            const result = await findIdByReferenceTable("Normal", reference_table.FORM);

            expect(mockGetLangueId).toHaveBeenCalledWith("french");
            expect(mockGetReferenceId).toHaveBeenCalledWith({ name: "Normal", referenceTable: reference_table.FORM, langId: 1 });
            expect(result).toEqual(BigInt(123));
        });

        it("should throw an error if referenceId not found", async () => {
            mockGetLangueId.mockResolvedValue(1);
            mockGetReferenceId.mockResolvedValue(null);

            await expect(findIdByReferenceTable("Unknown", reference_table.FORM)).rejects.toThrow(
                'La traduction de "Unknown" n\'a pas été trouvée.'
            );
        });
    });

    describe("findNameByReferenceTable", () => {
        it("should return the name when found", async () => {
            mockGetLangueId.mockResolvedValue(1);
            mockGetTranslation.mockResolvedValue({ name: "Normal" });

            const result = await findNameByReferenceTable(BigInt(123), reference_table.FORM);

            expect(mockGetLangueId).toHaveBeenCalledWith("french");
            expect(mockGetTranslation).toHaveBeenCalledWith({ id: BigInt(123), referenceTable: reference_table.FORM, langId: 1 });
            expect(result).toEqual("Normal");
        });

        it("should throw an error if translation not found", async () => {
            mockGetLangueId.mockResolvedValue(1);
            mockGetTranslation.mockResolvedValue(null);

            await expect(findNameByReferenceTable(BigInt(999), reference_table.FORM)).rejects.toThrow(
                "La traduction n'a pas été trouvée."
            );
        });
    });

    describe("getAllIdName", () => {
        it("should return mapped id-name list", async () => {
            mockGetLangueId.mockResolvedValue(1);
            mockGetAllTranslationIdNames.mockResolvedValue([
                { referenceId: BigInt(1), name: "Normal" },
                { referenceId: BigInt(2), name: "Special" },
            ]);

            const result = await getAllIdName(reference_table.FORM);

            expect(mockGetLangueId).toHaveBeenCalledWith("french");
            expect(mockGetAllTranslationIdNames).toHaveBeenCalledWith(reference_table.FORM, 1);
            expect(result).toEqual([
                { id: 1, name: "Normal" },
                { id: 2, name: "Special" },
            ]);
        });

        it("should return empty array if no translations", async () => {
            mockGetLangueId.mockResolvedValue(1);
            mockGetAllTranslationIdNames.mockResolvedValue([]);

            const result = await getAllIdName(reference_table.FORM);

            expect(result).toEqual([]);
        });
    });
});

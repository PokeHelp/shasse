import { getFormChoice, getAllPokemonForm } from "@src/service/form";
import {getLangueId} from "@service";
import { getFormsByPokemonIdWithName, getTranslationsByReferenceId } from "@query";
import { reference_table } from "@prisma/client";
import { formChoices } from "@config";
import type { TranslationName, FormWithName } from "@types";

// On mocke toutes les dépendances
jest.mock("@service", () => ({
    getLangueId: jest.fn()
}));

jest.mock("@query", () => ({
    getFormsByPokemonIdWithName: jest.fn(),
    getTranslationsByReferenceId: jest.fn()
}));

describe("Form service", () => {
    const mockGetLangueId = getLangueId as jest.Mock;
    const mockGetFormsByPokemonIdWithName = getFormsByPokemonIdWithName as jest.Mock;
    const mockGetTranslationsByReferenceId = getTranslationsByReferenceId as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getFormChoice", () => {
        it("should call getLangueId('french') when langId is undefined", async () => {
            const fakeLangId = 7;
            const fakeResult: TranslationName[] = [
                { referenceId: BigInt(1), name: "Normal" },
                { referenceId: BigInt(2), name: "Alola" }
            ];

            mockGetLangueId.mockResolvedValue(fakeLangId);
            mockGetTranslationsByReferenceId.mockResolvedValue(fakeResult);

            const result = await getFormChoice();

            expect(mockGetLangueId).toHaveBeenCalledWith("french");
            expect(mockGetTranslationsByReferenceId).toHaveBeenCalledWith(
                formChoices,
                fakeLangId,
                reference_table.FORM
            );
            expect(result).toEqual(fakeResult);
        });

        it("should use provided langId without calling getLangueId", async () => {
            const fakeLangId = 3;
            const fakeResult: TranslationName[] = [{ referenceId: BigInt(1), name: "Galar" }];

            mockGetTranslationsByReferenceId.mockResolvedValue(fakeResult);

            const result = await getFormChoice(fakeLangId);

            expect(mockGetLangueId).not.toHaveBeenCalled();
            expect(mockGetTranslationsByReferenceId).toHaveBeenCalledWith(
                formChoices,
                fakeLangId,
                reference_table.FORM
            );
            expect(result).toEqual(fakeResult);
        });

        it("should throw if getTranslationsByReferenceId rejects", async () => {
            const fakeLangId = 5;
            mockGetLangueId.mockResolvedValue(fakeLangId);
            mockGetTranslationsByReferenceId.mockRejectedValue(new Error("DB error"));

            await expect(getFormChoice(null)).rejects.toThrow("DB error");
        });
    });

    describe("getAllPokemonForm", () => {
        it("should call getLangueId('french') when langId is undefined", async () => {
            const fakeLangId = 9;
            const fakePokemonId = 25;
            const fakeResult: FormWithName[] = [
                { id: 1, name: "Pikachu"}
            ];

            mockGetLangueId.mockResolvedValue(fakeLangId);
            mockGetFormsByPokemonIdWithName.mockResolvedValue(fakeResult);

            const result = await getAllPokemonForm(fakePokemonId);

            expect(mockGetLangueId).toHaveBeenCalledWith("french");
            expect(mockGetFormsByPokemonIdWithName).toHaveBeenCalledWith(fakePokemonId, fakeLangId);
            expect(result).toEqual(fakeResult);
        });

        it("should use provided langId without calling getLangueId", async () => {
            const fakeLangId = 12;
            const fakePokemonId = 150;
            const fakeResult: FormWithName[] = [
                { id: 2, name: "Mega Mewtwo X" }
            ];

            mockGetFormsByPokemonIdWithName.mockResolvedValue(fakeResult);

            const result = await getAllPokemonForm(fakePokemonId, fakeLangId);

            expect(mockGetLangueId).not.toHaveBeenCalled();
            expect(mockGetFormsByPokemonIdWithName).toHaveBeenCalledWith(fakePokemonId, fakeLangId);
            expect(result).toEqual(fakeResult);
        });

        it("should throw if getFormsByPokemonIdWithName rejects", async () => {
            const fakeLangId = 4;
            const fakePokemonId = 1;

            mockGetLangueId.mockResolvedValue(fakeLangId);
            mockGetFormsByPokemonIdWithName.mockRejectedValue(new Error("Query failed"));

            await expect(getAllPokemonForm(fakePokemonId, null)).rejects.toThrow("Query failed");
        });
    });
});

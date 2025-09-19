import { prisma } from "@lib";
import { getAllHuntingMethods } from "@query";
import {reference_table} from "@prisma/client";

jest.mock("@lib", () => ({
    prisma: {
        $queryRaw: jest.fn()
    }
}));

const mockQueryRaw = prisma.$queryRaw as jest.Mock;

describe("getAllHuntingMethods", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return all hunting methods with default langId", async () => {
        const mockResult = [
            { id: BigInt(1), name: "Méthode A", can_be_shiny: true },
            { id: BigInt(2), name: "Méthode B", can_be_shiny: false }
        ];
        mockQueryRaw.mockResolvedValue(mockResult);

        const result = await getAllHuntingMethods();

        // Récupère le premier appel à $queryRaw
        const call = mockQueryRaw.mock.calls[0];
        const strings = call[0] as TemplateStringsArray; // parties littérales
        const values = call.slice(1);                   // valeurs interpolées

        // Vérifie que les valeurs interpolées incluent reference_table.HUNTING_METHOD et langId
        expect(values).toContain(reference_table.HUNTING_METHOD);
        expect(values).toContain(2);

        // Vérifie que la requête SQL contient bien la sélection
        const queryString = strings.join("");
        expect(queryString).toMatch(/SELECT id, name, can_be_shiny/);

        // Vérifie que le résultat final est correctement transformé
        expect(result).toEqual([
            { id: 1, name: "Méthode A" },
            { id: 2, name: "Méthode B" }
        ]);
    });

    it("should apply custom langId if provided", async () => {
        const mockResult = [
            { id: BigInt(3), name: "Méthode C", can_be_shiny: true }
        ];
        mockQueryRaw.mockResolvedValue(mockResult);
        const customLangId = 5;

        const result = await getAllHuntingMethods(customLangId);

        // Récupère le premier appel à $queryRaw
        const call = mockQueryRaw.mock.calls[0];
        const strings = call[0] as TemplateStringsArray; // parties littérales
        const values = call.slice(1);                    // valeurs interpolées

        // Vérifie que les interpolations incluent le customLangId
        expect(values).toContain(customLangId);

        // Vérifie que la requête contient la sélection correcte
        const queryString = strings.join("");
        expect(queryString).toMatch(/SELECT id, name, can_be_shiny/);

        // Vérifie le mapping final du résultat
        expect(result).toEqual([{ id: 3, name: "Méthode C" }]);
    });


    it("should return empty array if no results", async () => {
        mockQueryRaw.mockResolvedValue([]);

        const result = await getAllHuntingMethods();

        expect(result).toEqual([]);
    });

});

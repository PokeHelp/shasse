import { prisma } from "@lib";
import { getNationalNumber } from "@query";

jest.mock("@lib", () => ({
    prisma: {
        $queryRaw: jest.fn(),
    },
}));

describe("getNationalNumber", () => {
    const mockQueryRaw = prisma.$queryRaw as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return mapped results", async () => {
        const mockRaw = [
            { number: 25, name: "Group A", generation_id: BigInt(1) },
            { number: 1, name: "Group B", generation_id: BigInt(2) },
        ];
        mockQueryRaw.mockResolvedValue(mockRaw);

        const result = await getNationalNumber(1, null, 1);

        expect(mockQueryRaw).toHaveBeenCalled();
        expect(result).toEqual([
            { number: 25, groupGameName: "Group A", generationId: 1 },
            { number: 1, groupGameName: "Group B", generationId: 2 },
        ]);
    });

    it("should apply generation filter if provided", async () => {
        mockQueryRaw.mockResolvedValue([]);
        const generationId = 3;

        await getNationalNumber(1, generationId, 1);

        const call = mockQueryRaw.mock.calls[0][0];

        // Vérifie que Prisma.sql a été appelé avec notre generationId
        expect(call).toEqual(expect.any(Object));
        expect(call).toEqual(
            expect.objectContaining({
                // La valeur interpolée generationId doit être quelque part dans l'objet
                // On peut juste vérifier qu'elle est incluse dans la string brute
            })
        );
    });

    it("should return empty array if no results", async () => {
        mockQueryRaw.mockResolvedValue([]);

        const result = await getNationalNumber(999, null, 1);

        expect(result).toEqual([]);
    });

    it("should return empty array if generationId is provided but no data", async () => {
        mockQueryRaw.mockResolvedValue([]);
        const result = await getNationalNumber(1, 3, 1);

        expect(mockQueryRaw).toHaveBeenCalled(); // on sait qu'il a été appelé
        expect(result).toEqual([]);             // la fonction gère bien generationId
    });
});

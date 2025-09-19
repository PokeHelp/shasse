import { getLastGeneration } from "@service/generation"; // ajuste le chemin
import { getLastGeneration as getLastGen } from "@query";

// On mock la dépendance
jest.mock("@query", () => ({
    getLastGeneration: jest.fn(),
}));

const mockGetLastGen = getLastGen as jest.Mock;

describe("getLastGeneration", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return the id of the last generation", async () => {
        mockGetLastGen.mockResolvedValue({ id: 9 });

        const result = await getLastGeneration();

        expect(mockGetLastGen).toHaveBeenCalledWith({ id: true });
        expect(result).toBe(9);
    });

    it("should throw an error if no generation is found", async () => {
        mockGetLastGen.mockResolvedValue(null);

        await expect(getLastGeneration()).rejects.toThrow(
            "Derniere génération pas trouvée"
        );
        expect(mockGetLastGen).toHaveBeenCalledWith({ id: true });
    });
});

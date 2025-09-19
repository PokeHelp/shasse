import { prisma } from "@lib";
import { getLastGeneration, getAllGeneration } from "@query";

// Mock de prisma
jest.mock("@lib", () => ({
    prisma: {
        generation: {
            findFirst: jest.fn(),
            findMany: jest.fn()
        }
    }
}));

const mockFindFirst = prisma.generation.findFirst as jest.Mock;
const mockFindMany = prisma.generation.findMany as jest.Mock;

describe("Generation queries", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return the last generation with default select", async () => {
        const mockResult = { id: 10 };
        mockFindFirst.mockResolvedValue(mockResult);

        const result = await getLastGeneration();

        expect(mockFindFirst).toHaveBeenCalledWith({
            where: { status: "on" },
            select: { id: true },
            orderBy: { id: "desc" }
        });
        expect(result).toEqual(mockResult);
    });

    it("should return the last generation with custom select", async () => {
        const mockResult = { id: 10, name: "Generation X" };
        mockFindFirst.mockResolvedValue(mockResult);

        const select = { id: true, name: true };
        const result = await getLastGeneration(select);

        expect(mockFindFirst).toHaveBeenCalledWith({
            where: { status: "on" },
            select,
            orderBy: { id: "desc" }
        });
        expect(result).toEqual(mockResult);
    });

    it("should return all generations with default select", async () => {
        const mockResult = [{ id: 1 }, { id: 2 }];
        mockFindMany.mockResolvedValue(mockResult);

        const result = await getAllGeneration();

        expect(mockFindMany).toHaveBeenCalledWith({
            where: { status: "on" },
            select: { id: true }
        });
        expect(result).toEqual(mockResult);
    });

    it("should return all generations with custom select", async () => {
        const mockResult = [
            { id: 1, name: "Gen I" },
            { id: 2, name: "Gen II" }
        ];
        mockFindMany.mockResolvedValue(mockResult);

        const select = { id: true, name: true };
        const result = await getAllGeneration(select);

        expect(mockFindMany).toHaveBeenCalledWith({
            where: { status: "on" },
            select
        });
        expect(result).toEqual(mockResult);
    });
});

import {prisma} from "@lib";
import {getFirstEvolutionId} from "@query";

// Mock de prisma
jest.mock("@lib", () => ({
    prisma: {
        $queryRaw: jest.fn(),
        evolution: {
            findMany: jest.fn()
        }
    }
}));

const mockFindMany = prisma.evolution.findMany as jest.MockedFunction<typeof prisma.evolution.findMany>;

interface FullEvolutionRow
{
    id: number;
    level: number | null;
    evolutionMethodId: number;
    pokemonFormStartId: number;
    pokemonFormEndId: number;
    evolutionInfoId: number;
    createdAt: Date;
    updatedAt: Date | null;
    status: string;
}

describe("getFirstEvolutionId", () =>
{
    afterEach(() =>
    {
        jest.clearAllMocks();
    });

    it("should return null if no evolutions found", async () =>
    {
        mockFindMany.mockResolvedValue([]);
        const result = await getFirstEvolutionId(1);
        expect(mockFindMany).toHaveBeenCalled();
        expect(result).toBeNull();
    });

    it("should return start IDs if the pokemon is a start of evolution", async () =>
    {
        const mockData: FullEvolutionRow[] = [
            {
                id:                 1,
                level:              16,
                evolutionMethodId:  1,
                pokemonFormStartId: 1,
                pokemonFormEndId:   2,
                evolutionInfoId:    1,
                createdAt:          new Date(),
                updatedAt:          null,
                status:             "on"
            },
            {
                id:                 2,
                level:              32,
                evolutionMethodId:  1,
                pokemonFormStartId: 1,
                pokemonFormEndId:   3,
                evolutionInfoId:    2,
                createdAt:          new Date(),
                updatedAt:          null,
                status:             "on"
            }
        ];

        mockFindMany.mockResolvedValue(mockData);

        const result = await getFirstEvolutionId(1);
        expect(result).toEqual([1]);
    });
});

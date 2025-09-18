import {prisma} from "@lib";
import {getAllPokeball} from "@query";


jest.mock("@lib", () => ({
    prisma: {
        $queryRaw: jest.fn(),
    },
}));

describe("getAllPokeball", () => {
    const mockQueryRaw = prisma.$queryRaw as jest.Mock;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return mapped TranslationIdNames", async () => {
        const rawData = [
            { id: BigInt(1), name: "Pokeball" },
            { id: BigInt(2), name: "Great Ball" },
        ];

        mockQueryRaw.mockResolvedValue(rawData);

        const result = await getAllPokeball();

        expect(mockQueryRaw).toHaveBeenCalled();
        expect(result).toEqual([
            { id: 1, name: "Pokeball" },
            { id: 2, name: "Great Ball" },
        ]);
    });

    it("should return empty array if no pokeballs found", async () => {
        mockQueryRaw.mockResolvedValue([]);

        const result = await getAllPokeball();

        expect(mockQueryRaw).toHaveBeenCalled();
        expect(result).toEqual([]);
    });
});

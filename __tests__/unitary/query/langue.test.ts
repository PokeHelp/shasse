import { prisma } from "@lib";
import { getLangue, getAllLangue } from "@query";

jest.mock("@lib/prisma", () => ({
    prisma: {
        langue: {
            findFirst: jest.fn(),
            findMany: jest.fn()
        }
    }
}));

const mockFindFirst = prisma.langue.findFirst as jest.Mock;
const mockFindMany = prisma.langue.findMany as jest.Mock;

describe("Langue queries", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("getLangue", () => {
        it("should return selected langue fields", async () => {
            const mockResult = { id: 1, name: "Français", isoCode: "FR" };
            mockFindFirst.mockResolvedValue(mockResult);

            const result = await getLangue({ id: 1 }, { id: true, name: true, isoCode: true });

            expect(mockFindFirst).toHaveBeenCalledWith({
                where: {
                    OR: [
                        { id: 1 },
                        { name: undefined },
                        { isoCode: undefined }
                    ],
                    status: "on"
                },
                select: { id: true, name: true, isoCode: true }
            });

            expect(result).toEqual(mockResult);
        });

        it("should return null if not found", async () => {
            mockFindFirst.mockResolvedValue(null);

            const result = await getLangue({ name: "Anglais" }, { id: true, name: true });

            expect(result).toBeNull();
        });
    });

    describe("getAllLangue", () => {
        it("should return all langues with default select", async () => {
            const mockResult = [{ id: 1 }, { id: 2 }];
            mockFindMany.mockResolvedValue(mockResult);

            const result = await getAllLangue();

            expect(mockFindMany).toHaveBeenCalledWith({
                where: { status: "on" },
                select: { id: true }
            });

            expect(result).toEqual(mockResult);
        });

        it("should return all langues with custom select", async () => {
            const mockResult = [{ id: 1, name: "Français" }];
            mockFindMany.mockResolvedValue(mockResult);

            const result = await getAllLangue({ id: true, name: true });

            expect(mockFindMany).toHaveBeenCalledWith({
                where: { status: "on" },
                select: { id: true, name: true }
            });

            expect(result).toEqual(mockResult);
        });
    });
});

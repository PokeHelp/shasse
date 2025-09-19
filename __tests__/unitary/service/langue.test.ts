import { getAllIsoCode, getDefaultLangue, getLangueId } from "@service/langue";
import { getLangue } from "@query/langue";

// Mock de la fonction getLangue
jest.mock("@query/langue", () => ({
    getLangue: jest.fn(),
}));

const mockGetLangue = getLangue as jest.Mock;

describe("langue service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getAllIsoCode", () => {
        it("should return an array of ISO codes", async () => {
            const result = await getAllIsoCode();
            expect(result).toEqual(["fr"]);
        });
    });

    describe("getDefaultLangue", () => {
        it("should return the default language", () => {
            const result = getDefaultLangue();
            expect(result).toBe("fr");
        });
    });

    describe("getLangueId", () => {
        it("should return the id of the language if found", async () => {
            mockGetLangue.mockResolvedValue({ id: 1 });

            const result = await getLangueId("french");

            expect(mockGetLangue).toHaveBeenCalledWith({ name: "french" }, { id: true });
            expect(result).toBe(1);
        });

        it("should throw an error if the language is not found", async () => {
            mockGetLangue.mockResolvedValue(null);

            await expect(getLangueId("spanish")).rejects.toThrow(
                'La langue "spanish" n\'a pas été trouvée.'
            );

            expect(mockGetLangue).toHaveBeenCalledWith({ name: "spanish" }, { id: true });
        });
    });
});

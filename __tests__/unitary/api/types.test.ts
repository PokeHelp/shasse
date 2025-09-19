import { GET } from "@app/api/types/route";
import { getAllTypeWithTranslation } from "@service";
import { sendResponse } from "@utils";
import { HttpStatusCode } from "axios";

jest.mock("@service", () => ({
    getAllTypeWithTranslation: jest.fn(),
}));

jest.mock("@utils", () => ({
    sendResponse: jest.fn(),
}));

const mockGetAllTypeWithTranslation = getAllTypeWithTranslation as jest.Mock;
const mockSendResponse = sendResponse as jest.Mock;

describe("GET /api/types", () => {
    let consoleLogSpy: jest.SpyInstance;

    beforeAll(() => {
        // On empêche tous les console.log de s'afficher pendant les tests
        consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    });

    afterAll(() => {
        consoleLogSpy.mockRestore();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return success response with type data", async () => {
        const mockTypes = [
            { id: 1, name: "Fire" },
            { id: 2, name: "Water" },
        ];

        mockGetAllTypeWithTranslation.mockResolvedValue(mockTypes);
        mockSendResponse.mockImplementation((data, status) => ({ data, status }));

        const result = await GET();

        expect(mockGetAllTypeWithTranslation).toHaveBeenCalled();
        expect(mockSendResponse).toHaveBeenCalledWith(
            { success: true, data: mockTypes },
            HttpStatusCode.Ok
        );
        expect(result).toEqual({ data: { success: true, data: mockTypes }, status: HttpStatusCode.Ok });
    });

    it("should return error response when service throws", async () => {
        mockGetAllTypeWithTranslation.mockRejectedValue(new Error("Failed"));
        mockSendResponse.mockImplementation((data, status) => ({ data, status }));

        const result = await GET();

        expect(mockGetAllTypeWithTranslation).toHaveBeenCalled();
        expect(mockSendResponse).toHaveBeenCalledWith(
            { success: false, error: "Generic error" },
            HttpStatusCode.InternalServerError
        );
        expect(result).toEqual({ data: { success: false, error: "Generic error" }, status: HttpStatusCode.InternalServerError });
    });
});

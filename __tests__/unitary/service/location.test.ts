import {getPokemonGenerationLocation, getGameLocation, getLangueId} from "@service";
import {GameLocationName} from "@types";
import {getLocationWithName} from "@query";
import {getPokemonGameLocationName} from "@query/location";

// Mock des modules importés
jest.mock("@query", () => ({
    getLocationWithName: jest.fn(),
}));

jest.mock("@query/location", () => ({
    getPokemonGameLocationName: jest.fn(),
}));

jest.mock("@src/service/langue", () => ({
    getLangueId: jest.fn(),
}));

const mockGetLangueId = getLangueId as jest.Mock;
const mockGetLocationWithName = getLocationWithName as jest.Mock;
const mockGetPokemonGameLocationName = getPokemonGameLocationName as jest.Mock;

describe("location service", () =>
{
    afterEach(() =>
    {
        jest.clearAllMocks();
    });

    describe("getPokemonGenerationLocation", () =>
    {
        it("should call getLocationWithName with provided langId", async () =>
        {
            const pokemonId = 1;
            const formId = 2;
            const gameId = 3;
            const shinyLocation = true;
            const langId = 4;

            const mockResult = [{locationName: "Location A"}];
            mockGetLocationWithName.mockResolvedValue(mockResult);

            const result = await getPokemonGenerationLocation(pokemonId, formId, gameId, shinyLocation, langId);

            expect(mockGetLocationWithName).toHaveBeenCalledWith(pokemonId, gameId, langId, shinyLocation, formId);
            expect(result).toEqual(mockResult);
        });

        it("should fetch langId if not provided", async () =>
        {
            const pokemonId = 1;
            const formId = 2;
            const gameId = 3;
            const shinyLocation = false;

            mockGetLangueId.mockResolvedValue(1);
            const mockResult = [{locationName: "Location B"}];
            mockGetLocationWithName.mockResolvedValue(mockResult);

            const result = await getPokemonGenerationLocation(pokemonId, formId, gameId, shinyLocation);

            expect(mockGetLangueId).toHaveBeenCalledWith("french");
            expect(mockGetLocationWithName).toHaveBeenCalledWith(pokemonId, gameId, 1, shinyLocation, formId);
            expect(result).toEqual(mockResult);
        });
    });

    describe("getGameLocation", () =>
    {
        it("should call getPokemonGameLocationName with correct arguments", async () =>
        {
            const pokemonId = 1;
            const formId = 2;
            const gameId = 3;

            const mockResult: GameLocationName[] = [
                {
                    id:                1, gameName: "Location A",
                    rate:              0,
                    minLevel:          0,
                    maxLevel:          0,
                    huntingMethodName: "",
                    limit:             0,
                    meteoName:         "",
                    conditionName:     "",
                    isAlpha:           false,
                    detailName:        "",
                    gameId:            0,
                    rateId:            0,
                    meteoId:           0,
                    detailRateId:      0,
                    conditionRateId:   0,
                    huntingMethodId:   0
                },
                {
                    id:                2, gameName: "Location B",
                    rate:              0,
                    minLevel:          0,
                    maxLevel:          0,
                    huntingMethodName: "",
                    limit:             0,
                    meteoName:         "",
                    conditionName:     "",
                    isAlpha:           false,
                    detailName:        "",
                    gameId:            0,
                    rateId:            0,
                    meteoId:           0,
                    detailRateId:      0,
                    conditionRateId:   0,
                    huntingMethodId:   0
                },
            ];
            mockGetPokemonGameLocationName.mockResolvedValue(mockResult);

            const result = await getGameLocation(pokemonId, gameId, formId);

            expect(mockGetPokemonGameLocationName).toHaveBeenCalledWith(pokemonId, formId, gameId);
            expect(result).toEqual(mockResult);
        });

        it("should use default null values if arguments not provided", async () =>
        {
            const mockResult: GameLocationName[] = [];
            mockGetPokemonGameLocationName.mockResolvedValue(mockResult);

            const result = await getGameLocation();

            expect(mockGetPokemonGameLocationName).toHaveBeenCalledWith(null, null, null);
            expect(result).toEqual(mockResult);
        });
    });
});

import {prisma} from "@lib";
import {getLocationWithName, getPokemonGameLocation} from "@query";
import {getPokemonGameLocationName} from "@query/location";

jest.mock("@lib", () => ({
    prisma: {
        $queryRaw: jest.fn(),
        pokemon_game_location: {
            findMany: jest.fn()
        }
    }
}));

const mockQueryRaw = prisma.$queryRaw as jest.Mock;
const mockFindMany = prisma.pokemon_game_location.findMany as jest.Mock;

describe("Location queries", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should map getLocationWithName results correctly", async () => {
        const mockRaw = [{
            generation_id: BigInt(1),
            min_level: 5,
            max_level: 10,
            location_name: "Forêt",
            condition_name: "Jour",
            detail_name: "Normal",
            is_alpha: false,
            meteo_name: "Pluie",
            obtation_name: "Méthode A",
            zone_name: "Zone 1",
            obtation_id: 2,
            rate: 50,
            limit: 1,
            game_name: "Version X"
        }];
        mockQueryRaw.mockResolvedValue(mockRaw);

        const result = await getLocationWithName(1, 1, 1);
        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            generationId: 1,
            minLevel: 5,
            maxLevel: 10,
            locationName: "Forêt",
            conditionName: "Jour",
            detailName: "Normal",
            isAlpha: false,
            meteoName: "Pluie",
            obtationName: "Méthode A",
            zoneName: "Zone 1",
            isShassable: true, // obtation_id != 1
            rate: 50,
            limit: 1,
            gameName: "Version X"
        });
    });

    it("should call findMany with proper filters in getPokemonGameLocation", async () => {
        const mockRaw = [{ id: 123 }];
        mockFindMany.mockResolvedValue(mockRaw);

        const result = await getPokemonGameLocation(1, 2, 3);
        expect(mockFindMany).toHaveBeenCalledWith({
            where: {
                pokemonForm: {
                    pokemonId: 1,
                    formId: 2
                },
                gameId: 3
            },
            select: { id: true }
        });
        expect(result).toEqual(mockRaw);
    });

    it("should map getPokemonGameLocationName results correctly", async () => {
        const mockRaw = [{
            game_id: BigInt(1),
            game_name: "X",
            rate_id: BigInt(2),
            rate: 50,
            min_level: 5,
            max_level: 10,
            limit: 1,
            meteo_id: BigInt(3),
            meteo_name: "Pluie",
            detail_rate_id: BigInt(4),
            detail_name: "Normal",
            condition_rate_id: BigInt(5),
            condition_name: "Jour",
            is_alpha: true,
            hunting_method_id: BigInt(6),
            hunting_method_name: "Méthode A",
            id: BigInt(7)
        }];
        mockQueryRaw.mockResolvedValue(mockRaw);

        const result = await getPokemonGameLocationName(1, 2, 3);
        expect(result).toHaveLength(1);
        expect(result[0]).toMatchObject({
            gameId: 1,
            gameName: "X",
            rateId: 2,
            rate: 50,
            minLevel: 5,
            maxLevel: 10,
            limit: 1,
            meteoId: 3,
            meteoName: "Pluie",
            detailRateId: 4,
            detailName: "Normal",
            conditionRateId: 5,
            conditionName: "Jour",
            isAlpha: true,
            huntingMethodId: 6,
            huntingMethodName: "Méthode A",
            id: 7
        });
    });

});

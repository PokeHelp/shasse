import {
    createOwnedPokemon,
    getAllOwnedPokemon,
    getOwnedPokemon,
    getOwnedPokemonUser,
    getOwnedDetailById,
    updateOwned
} from "@service";

import {
    createOwned,
    getAllOwned,
    getLastOwned,
    getOwnedById,
    getOwnedPokemonByUser,
    retrieveOwnedId,
    updateOwned as updateOwnedQuery
} from "@query";
import {CreateHunting, OwnedPokemon, OwnedPokemonDetail, OwnedPokemonIdByUser, OwnedSumarry} from "@types";
import {getRequiredUser} from "@lib/auth-server";

// Mock des modules importés
jest.mock("@query", () => ({
    createOwned:           jest.fn(),
    getAllOwned:           jest.fn(),
    getLastOwned:          jest.fn(),
    getOwnedById:          jest.fn(),
    getOwnedPokemonByUser: jest.fn(),
    retrieveOwnedId:       jest.fn(),
    updateOwned:           jest.fn()
}));

jest.mock("@lib/auth-server", () => ({
    getRequiredUser: jest.fn()
}));

const mockCreateOwned = createOwned as jest.Mock;
const mockGetAllOwned = getAllOwned as jest.Mock;
const mockGetLastOwned = getLastOwned as jest.Mock;
const mockGetOwnedById = getOwnedById as jest.Mock;
const mockGetOwnedPokemonByUser = getOwnedPokemonByUser as jest.Mock;
const mockRetrieveOwnedId = retrieveOwnedId as jest.Mock;
const mockUpdateOwnedQuery = updateOwnedQuery as jest.Mock;
const mockGetRequiredUser = getRequiredUser as jest.Mock;

describe("Owned service", () =>
{
    afterEach(() =>
    {
        jest.clearAllMocks();
    });

    describe("createOwnedPokemon", () =>
    {
        it("should call createOwned with data and userId", async () =>
        {
            const data: CreateHunting = {
                createdAt:             new Date(),
                isFinish:              false,
                meetingNumber:         0,
                pokemonGameLocationId: 0,
                spriteInShiny:         false,
                useCC:                 false,
                time:                  100
            };
            const userId = "user1";
            mockCreateOwned.mockResolvedValue({id: BigInt(1)});

            const result = await createOwnedPokemon(data, userId);

            expect(mockCreateOwned).toHaveBeenCalledWith(data, userId);
            expect(result).toEqual({id: BigInt(1)});
        });
    });

    describe("getAllOwnedPokemon", () =>
    {
        it("should use provided userId", async () =>
        {
            const userId = "user1";
            const mockResult: OwnedSumarry[] = [{
                id:                  1,
                internationalNumber: 0,
                pokemonName:         "",
                formId:              0,
                formName:            ""
            }];
            mockGetAllOwned.mockResolvedValue(mockResult);

            const result = await getAllOwnedPokemon(userId);

            expect(mockGetAllOwned).toHaveBeenCalledWith(userId);
            expect(result).toEqual(mockResult);
        });

        it("should use getRequiredUser if userId not provided", async () =>
        {
            mockGetRequiredUser.mockResolvedValue({id: "user2"});
            const mockResult: OwnedSumarry[] = [{
                id:                  2,
                internationalNumber: 0,
                pokemonName:         "",
                formId:              0,
                formName:            ""
            }];
            mockGetAllOwned.mockResolvedValue(mockResult);

            const result = await getAllOwnedPokemon();

            expect(mockGetRequiredUser).toHaveBeenCalled();
            expect(mockGetAllOwned).toHaveBeenCalledWith("user2");
            expect(result).toEqual(mockResult);
        });
    });

    describe("getOwnedPokemon", () =>
    {
        it("should return getOwnedById if huntingId provided", async () =>
        {
            const userId = "user1";
            const huntingId = 10;
            const mockOwned: OwnedPokemon = {
                id:                  1,
                internationalNumber: 1,
                pokemonName:         "",
                formId:              1,
                formName:            "",
                spriteInShiny:       true,
                gameId:              1,
                methodName:          "",
                meetingNumber:       1,
                time:                1,
                useCC:               true
            };
            mockGetOwnedById.mockResolvedValue(mockOwned);

            const result = await getOwnedPokemon(userId, huntingId);

            expect(mockGetOwnedById).toHaveBeenCalledWith(userId, huntingId);
            expect(result).toEqual(mockOwned);
        });

        it("should fallback to getLastOwned if huntingId not found", async () =>
        {
            const userId = "user1";
            const mockLast: OwnedPokemon = {
                id:                  1,
                internationalNumber: 1,
                pokemonName:         "",
                formId:              1,
                formName:            "",
                spriteInShiny:       true,
                gameId:              1,
                methodName:          "",
                meetingNumber:       1,
                time:                1,
                useCC:               true
            };
            mockGetOwnedById.mockResolvedValue(null);
            mockGetLastOwned.mockResolvedValue(mockLast);

            const result = await getOwnedPokemon(userId, 999);

            expect(mockGetOwnedById).toHaveBeenCalledWith(userId, 999);
            expect(mockGetLastOwned).toHaveBeenCalledWith(userId);
            expect(result).toEqual(mockLast);
        });

        it("should use getRequiredUser if userId not provided", async () =>
        {
            mockGetRequiredUser.mockResolvedValue({id: "user3"});
            const mockLast: OwnedPokemon = {
                id:                  1,
                internationalNumber: 1,
                pokemonName:         "",
                formId:              1,
                formName:            "",
                spriteInShiny:       true,
                gameId:              1,
                methodName:          "",
                meetingNumber:       1,
                time:                1,
                useCC:               true
            };
            mockGetLastOwned.mockResolvedValue(mockLast);

            const result = await getOwnedPokemon();

            expect(mockGetRequiredUser).toHaveBeenCalled();
            expect(mockGetLastOwned).toHaveBeenCalledWith("user3");
            expect(result).toEqual(mockLast);
        });
    });

    describe("getOwnedPokemonUser", () =>
    {
        it("should call getOwnedPokemonByUser with provided userId", async () =>
        {
            const userId = "user1";
            const mockResult: OwnedPokemonIdByUser[] = [{id: 1, pokemonId: 1, huntingMethodName: ""}];
            mockGetOwnedPokemonByUser.mockResolvedValue(mockResult);

            const result = await getOwnedPokemonUser(userId);

            expect(mockGetOwnedPokemonByUser).toHaveBeenCalledWith(userId);
            expect(result).toEqual(mockResult);
        });

        it("should use getRequiredUser if userId not provided", async () =>
        {
            mockGetRequiredUser.mockResolvedValue({id: "user2"});
            const mockResult: OwnedPokemonIdByUser[] = [{id: 1, pokemonId: 1, huntingMethodName: ""}];
            mockGetOwnedPokemonByUser.mockResolvedValue(mockResult);

            const result = await getOwnedPokemonUser();

            expect(mockGetRequiredUser).toHaveBeenCalled();
            expect(mockGetOwnedPokemonByUser).toHaveBeenCalledWith("user2");
            expect(result).toEqual(mockResult);
        });
    });

    describe("getOwnedDetailById", () =>
    {
        it("should call retrieveOwnedId with ownedId and userId", async () =>
            {
                const ownedId = 1;
                const userId = "user1";
                const mockResult: OwnedPokemonDetail = {
                    id:                1,
                    meetingNumber:     1,
                    time:              1,
                    pokemonName:       "",
                    huntingMethodName: "",
                    formName:          "",
                    gameId:            1,
                    formId:            1
                };
                mockRetrieveOwnedId.mockResolvedValue(mockResult);

                const result = await getOwnedDetailById(ownedId, userId);

                expect(mockRetrieveOwnedId)
                    .toHaveBeenCalledWith(ownedId, userId);
                expect(result)
                    .toEqual(mockResult);
            }
        )
        ;

        it("should use getRequiredUser if userId not provided", async () =>
        {
            mockGetRequiredUser.mockResolvedValue({id: "user2"});
            const mockResult: OwnedPokemonDetail = {
                id:                1,
                meetingNumber:     1,
                time:              1,
                pokemonName:       "",
                huntingMethodName: "",
                formName:          "",
                gameId:            1,
                formId:            1
            };
            mockRetrieveOwnedId.mockResolvedValue(mockResult);

            const result = await getOwnedDetailById(2);

            expect(mockGetRequiredUser).toHaveBeenCalled();
            expect(mockRetrieveOwnedId).toHaveBeenCalledWith(2, "user2");
            expect(result).toEqual(mockResult);
        });
    });

    describe("updateOwned", () =>
    {
        it("should return success if updateOwnedQuery succeeds", async () =>
        {
            mockUpdateOwnedQuery.mockResolvedValue(undefined);

            const result = await updateOwned(1, 10, 100, true, "Pika");

            expect(mockUpdateOwnedQuery).toHaveBeenCalledWith(1, 10, 100, "Pika", true);
            expect(result).toEqual({status: "success"});
        });

        it("should return error if updateOwnedQuery throws", async () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

            mockUpdateOwnedQuery.mockRejectedValue(new Error("Fail"));

            const result = await updateOwned(1, 10, 100, false, "Charm");

            expect(mockUpdateOwnedQuery).toHaveBeenCalledWith(1, 10, 100, "Charm", false);
            expect(result).toEqual({ status: "error" });

            consoleSpy.mockRestore();
        });

    });
});

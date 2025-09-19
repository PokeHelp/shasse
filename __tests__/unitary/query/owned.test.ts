import {prisma} from "@lib";
import {
    createOwned,
    getAllOwned,
    getLastOwned,
    getOwnedById,
    getOwnedPokemonByUser,
    retrieveOwnedId,
    updateOwned
} from "@query";

jest.mock("@lib", () => ({
    prisma: {
        $queryRaw: jest.fn(),
        owned_pokemon: {
            create: jest.fn(),
            update: jest.fn(),
        },
        owned_pokemon_detail: {
            create: jest.fn(),
        },
    },
}));

describe("Owned Pokemon functions", () => {
    const mockQueryRaw = prisma.$queryRaw as jest.Mock;
    const mockCreate = prisma.owned_pokemon.create as jest.Mock;
    const mockUpdate = prisma.owned_pokemon.update as jest.Mock;
    const mockCreateDetail = prisma.owned_pokemon_detail.create as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createOwned", () => {
        it("should create an owned pokemon and detail if isFinish is true", async () => {
            const data = {
                time: 60,
                isFinish: true,
                createdAt: new Date(),
                useCC: true,
                meetingNumber: 1,
                pokemonGameLocationId: 2,
                spriteInShiny: true,
                nickname: "Pika",
                finishAt: new Date(),
            };
            const userId = "user1";
            mockCreate.mockResolvedValue({ id: BigInt(10) });
            mockCreateDetail.mockResolvedValue({});

            const result = await createOwned(data, userId);

            expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
                data: expect.objectContaining({ userId }),
                select: { id: true },
            }));
            expect(mockCreateDetail).toHaveBeenCalled();
            expect(result).toEqual({ id: BigInt(10) });
        });

        it("should create an owned pokemon without detail if isFinish is false", async () => {
            const data = {
                time: 60,
                isFinish: false,
                createdAt: new Date(),
                useCC: true,
                meetingNumber: 1,
                pokemonGameLocationId: 2,
                spriteInShiny: true,
            };
            const userId = "user1";
            mockCreate.mockResolvedValue({ id: BigInt(11) });

            const result = await createOwned(data, userId);

            expect(mockCreateDetail).not.toHaveBeenCalled();
            expect(result).toEqual({ id: BigInt(11) });
        });
    });

    describe("getAllOwned", () => {
        it("should return mapped summary", async () => {
            mockQueryRaw.mockResolvedValue([
                { id: BigInt(1), international_number: 25, pokemon_name: "Pikachu", form_id: BigInt(1), form_name: "Base" },
            ]);

            const result = await getAllOwned("user1");

            expect(result).toEqual([
                { id: 1, internationalNumber: 25, formId: 1, formName: "Base", pokemonName: "Pikachu" },
            ]);
        });
    });

    describe("getLastOwned / getOwnedById", () => {
        const raw = {
            id: BigInt(1),
            international_number: 25,
            pokemon_name: "Pikachu",
            form_id: BigInt(1),
            form_name: "Base",
            sprite_in_shiny: true,
            game_id: BigInt(2),
            method_name: "Hunting",
            meeting_number: 5,
            time: 60,
            use_charm_chroma: true,
        };

        it("should return last owned", async () => {
            mockQueryRaw.mockResolvedValue([raw]);

            const result = await getLastOwned("user1");

            expect(result).toEqual({
                id: 1,
                internationalNumber: 25,
                formId: 1,
                formName: "Base",
                pokemonName: "Pikachu",
                spriteInShiny: true,
                gameId: 2,
                time: 60,
                useCC: true,
                meetingNumber: 5,
                methodName: "Hunting",
            });
        });

        it("should return null if no last owned", async () => {
            mockQueryRaw.mockResolvedValue([]);

            const result = await getLastOwned("user1");

            expect(result).toBeNull();
        });

        it("should return owned by id", async () => {
            mockQueryRaw.mockResolvedValue([raw]);

            const result = await getOwnedById("user1", 1);

            expect(result?.id).toBe(1);
            expect(result?.pokemonName).toBe("Pikachu");
        });
    });

    describe("updateOwned", () => {
        it("should update owned and call detail if finished", async () => {
            mockUpdate.mockResolvedValue({});
            mockCreateDetail.mockResolvedValue({});

            await updateOwned(1, 10, 60, "Pika", true);

            expect(mockUpdate).toHaveBeenCalled();
            expect(mockCreateDetail).toHaveBeenCalled();
        });

        it("should update owned and not call detail if not finished", async () => {
            mockUpdate.mockResolvedValue({});

            await updateOwned(1, 10, 60, "Pika", false);

            expect(mockUpdate).toHaveBeenCalled();
            expect(mockCreateDetail).not.toHaveBeenCalled();
        });
    });

    describe("getOwnedPokemonByUser", () => {
        it("should return mapped results", async () => {
            mockQueryRaw.mockResolvedValue([
                { id: BigInt(1), pokemon_id: BigInt(25), hunting_method: "Hunting" },
            ]);

            const result = await getOwnedPokemonByUser("user1");

            expect(result).toEqual([{ id: 1, pokemonId: 25, huntingMethodName: "Hunting" }]);
        });
    });

    describe("retrieveOwnedId", () => {
        it("should return mapped detail", async () => {
            const rawDetail = {
                id: BigInt(1),
                meeting_number: BigInt(5),
                time: BigInt(60),
                pokemon_name: "Pikachu",
                hunting_method_name: "Hunting",
                form_name: "Base",
                game_id: BigInt(2),
                form_id: BigInt(1),
            };
            mockQueryRaw.mockResolvedValue([rawDetail]);

            const result = await retrieveOwnedId(1, "user1");

            expect(result).toEqual({
                id: 1,
                formName: "Base",
                pokemonName: "Pikachu",
                meetingNumber: 5,
                time: 60,
                huntingMethodName: "Hunting",
                gameId: 2,
                formId: 1,
            });
        });
    });
});

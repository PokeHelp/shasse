import {HuntingCreateSchema} from "@schema";

describe("HuntingCreateSchema", () =>
{
    const validPokemon = {name: "Pikachu", id: 25};

    it("should pass with valid data", () =>
    {
        const data = {
            pokemon:       validPokemon,
            formId:        1,
            gameId:        2,
            useCC:         true,
            isFinish:      false,
            finishAt:      null,
            meetingNumber: 3,
            time:          60,
            createdAt:     new Date(),
            spriteInShiny: false,
            huntMethodId:  1,
            nickname:      undefined,
            pokeballId:    5,
        };

        const result = HuntingCreateSchema.safeParse(data);
        expect(result.success).toBe(true);
        if (result.success)
        {
            expect(result.data).toEqual(data);
        }
    });

    it("should fail if pokemon is invalid", () =>
    {
        const data = {
            pokemon:       {name: "", id: "abc"}, // invalide
            formId:        1,
            gameId:        2,
            useCC:         true,
            isFinish:      false,
            finishAt:      null,
            meetingNumber: 3,
            time:          60,
            createdAt:     new Date(),
            spriteInShiny: false,
            huntMethodId:  1,
        };

        const result = HuntingCreateSchema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success)
        {
            expect(result.error.errors.some(e => e.path[0] === "pokemon")).toBe(true);
        }
    });

    it("should fail if numeric fields are not positive", () =>
    {
        const data = {
            pokemon:       validPokemon,
            formId:        0, // non positif
            gameId:        -2,
            useCC:         true,
            isFinish:      false,
            finishAt:      null,
            meetingNumber: 3,
            time:          60,
            createdAt:     new Date(),
            spriteInShiny: false,
            huntMethodId:  1,
        };

        const result = HuntingCreateSchema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success)
        {
            expect(
                result.error.errors.some(e => ["formId", "gameId"].includes(String(e.path[0])))
            ).toBe(true);
        }
    });

    it("should fail if isFinish is true but nickname is missing", () =>
    {
        const data = {
            pokemon:       validPokemon,
            formId:        1,
            gameId:        2,
            useCC:         true,
            isFinish:      true,
            finishAt:      new Date(),
            meetingNumber: 3,
            time:          60,
            createdAt:     new Date(),
            spriteInShiny: false,
            huntMethodId:  1,
            nickname:      "", // non rempli
        };

        const result = HuntingCreateSchema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success)
        {
            expect(result.error.errors.some(e => e.path.includes("nickname"))).toBe(true);
            expect(result.error.errors.find(e => e.path.includes("nickname"))?.message).toBe(
                "Le surnom est obligatoire si la chasse est terminée"
            );
        }
    });

    it("should fail if types are incorrect", () =>
    {
        const data = {
            pokemon:       validPokemon,
            formId:        "one", // type incorrect
            gameId:        "two",
            useCC:         "true",
            isFinish:      "false",
            finishAt:      "not a date",
            meetingNumber: "three",
            time:          "sixty",
            createdAt:     "today",
            spriteInShiny: "false",
            huntMethodId:  "one",
        };

        const result = HuntingCreateSchema.safeParse(data);
        expect(result.success).toBe(false);
        if (!result.success)
        {
            const errorPaths = result.error.errors.map(e => e.path[0]);
            expect(errorPaths).toEqual(
                expect.arrayContaining([
                    "formId",
                    "gameId",
                    "useCC",
                    "isFinish",
                    "finishAt",
                    "meetingNumber",
                    "time",
                    "createdAt",
                    "spriteInShiny",
                    "huntMethodId",
                ])
            );
        }
    });
});

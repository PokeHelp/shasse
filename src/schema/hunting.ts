import {z} from "zod";

const CreateHuntingSchema = z.object({
    pokemonId:       z.number().positive(),
    formId:          z.number().positive().nullable(),
    gameId:          z.number().positive(),
    useCC:           z.boolean(),
    isFinish:        z.boolean(),
    finishAt:        z.preprocess(
        (val): Date | null => val ? new Date(val as string) : null,
        z.date().nullable()
    ),
    meetingNumber:   z.number(),
    time:            z.number().int().min(0),
    createdAt:       z.preprocess(
        (val): Date => new Date(val as string),
        z.date()
    ),
    spriteInShiny:   z.boolean(),
    huntingMethodId: z.number().positive()
});

export {
    CreateHuntingSchema
}
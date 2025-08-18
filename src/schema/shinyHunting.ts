import {z} from "zod";
import {TranslationIdNamesSchema} from "./types";

const HuntingCreateSchema = z.object({
    pokemon:       TranslationIdNamesSchema,
    formId:        z.number().positive(),
    gameId:        z.number().positive(),
    useCC:         z.boolean(),
    isFinish:      z.boolean(),
    finishAt:      z.date().nullable(),
    meetingNumber: z.number(),
    time:          z.number().int().positive(),
    createdAt:     z.date(),
    spriteInShiny: z.boolean(),
    huntMethodId:  z.number().positive()
});

export {
    HuntingCreateSchema
}
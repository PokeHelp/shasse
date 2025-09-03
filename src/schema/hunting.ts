import {z} from "zod";

const CreateHuntingSchema = z.object({
    useCC:           z.boolean(),
    isFinish:        z.boolean(),
    finishAt:        z.preprocess((val) => val ? new Date(val as string) : null, z.date().nullable())
                         .optional(),
    meetingNumber:   z.number(),
    time:            z.number().int().min(0),
    createdAt:       z.preprocess(
        (val): Date => new Date(val as string),
        z.date()
    ),
    spriteInShiny:   z.boolean(),
    pokemonGameLocationId: z.number(),
    nickname: z.string().optional()
}).refine(
    (data): boolean => {
        if (data.isFinish) {
            return data.finishAt != null && data.nickname != null && data.nickname !== "";
        }
        return true;
    },
    {
        message: "finishAt et nickname doivent être définis si la shasse est finie",
        path: ["finishAt", "nickname"],
    }
);

export {
    CreateHuntingSchema
}
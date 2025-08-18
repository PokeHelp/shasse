import {z} from "zod";

const TranslationIdNamesSchema = z.object({
    name: z.string(),
    id: z.number()
});

export {
    TranslationIdNamesSchema
}
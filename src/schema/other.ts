import {z, ZodEffects, ZodString} from "zod";

const numberSchema: ZodEffects<ZodEffects<ZodString, string, string>, number, string> = z.string().refine(
    (val: string): boolean => !isNaN(Number(val)),
    {message: "Doit être un nombre valide"}
).transform((val: string): number => Number(val));

export {numberSchema};
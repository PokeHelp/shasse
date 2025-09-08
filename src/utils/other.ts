import {useForm, UseFormProps, UseFormReturn} from "react-hook-form";
import {z, ZodTypeAny} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

/**
 * Permet de retirer une clé d'un objet
 *
 * @param obj
 * @param keys
 */
export function excludeFields<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>
{
    const result = {...obj};
    keys.forEach(key => delete result[key]);
    return result;
}

export function useZodForm<TSchema extends ZodTypeAny>(schema: TSchema, options?: Omit<UseFormProps<z.infer<TSchema>>, "resolver">): UseFormReturn<z.infer<TSchema>>
{
    return useForm<z.infer<TSchema>>({
        resolver: zodResolver(schema),
        ...options,
    });
}

export function formatSecondsToHMS(totalSeconds: number): string
{
    const hours: number = Math.floor(totalSeconds / 3600);
    const minutes: number = Math.floor((totalSeconds % 3600) / 60);
    const seconds: number = totalSeconds % 60;

    return [
        String(hours).padStart(2, "0"),
        String(minutes).padStart(2, "0"),
        String(seconds).padStart(2, "0"),
    ].join(":");
}

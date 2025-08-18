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
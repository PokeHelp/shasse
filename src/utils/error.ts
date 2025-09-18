import {Dispatch, SetStateAction} from 'react';
import {ZodIssue} from "zod";
import {DataError, ErrorMap, Errors} from "@types";

/**
 * Ajoute une erreur
 *
 * @param setErrors
 * @param field
 * @param error
 */
export function setFieldError(setErrors: Dispatch<SetStateAction<Errors>>, field: string, error: string): void
{
    setErrors((prevErrors: Errors): Errors => ({
        ...prevErrors,
        [field]: error,
    }));
}

/**
 * Permet de mapper les erreurs
 *
 * @param dataError
 */
export function mapError(dataError: DataError): ErrorMap
{
    return dataError.error.errors.reduce((acc: ErrorMap, err: ZodIssue): ErrorMap =>
    {
        let field: string = err.path.join('.');
        field = field === '' ? 'custom' : field;

        if (acc[field])
        {
            acc[field] = `${acc[field]}\n${err.message}`;
        } else
        {
            acc[field] = err.message;
        }

        return acc;
    }, {} as ErrorMap);
}

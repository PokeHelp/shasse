import {Dispatch, SetStateAction} from 'react';
import {AxiosError} from "axios";
import {SafeParseReturnType, ZodIssue, ZodSchema} from "zod";
import {DataError, ErrorMap, ErrorResponse, Errors} from "@types";

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
 * Supprime une erreur
 *
 * @param setErrors
 * @param field
 */
export function clearFieldError(setErrors: Dispatch<SetStateAction<Errors>>, field: string): void
{
    setErrors((prevErrors: Errors): Errors =>
    {
        const newErrors = {...prevErrors};
        delete newErrors[field];
        return newErrors;
    });
}

/**
 * Supprime toutes les erreurs
 *
 * @param setErrors
 */
export function clearAllErrors(setErrors: Dispatch<SetStateAction<Errors>>): void
{
    setErrors({});
}

/**
 * Permet de gérer de façon général les erreurs
 *
 * @param error
 * @param setErrors
 * @param defaultErrorMessage
 */
export function handleError(error: unknown, setErrors: Dispatch<SetStateAction<Errors>>, defaultErrorMessage: string = 'Une erreur est survenue'): void
{
    if (error instanceof AxiosError)
    {
        if (!error.response?.data.error)
        {
            setFieldError(setErrors, 'general', error.response?.data.message || defaultErrorMessage);
        } else
        {
            const apiErrors: { [key: string]: string } = error.response.data.error;
            for (const errorKey in apiErrors)
            {
                setFieldError(setErrors, errorKey, apiErrors[errorKey]);
            }
        }
    } else if (isErrorResponse(error))
    {
        if (typeof error.error === 'string')
        {
            setFieldError(setErrors, 'general', error.error);
        } else
        {
            for (const errorKey in error.error)
            {
                setFieldError(setErrors, errorKey, error.error[errorKey]);
            }
        }
    } else
    {
        setFieldError(setErrors, 'general', defaultErrorMessage);
        console.error(error);
    }
}

/**
 * Valide les données et forme les erreurs suivant un schema ZOD
 *
 * @param data
 * @param schema
 * @param setErrors
 */
export function validateData<T>(data: T, schema: ZodSchema<T>, setErrors: (errors: Errors) => void): boolean
{
    const result: SafeParseReturnType<T, T> = schema.safeParse(data);

    if (!result.success)
    {
        const errorMap: ErrorMap = mapError(result);

        setErrors(errorMap);

        return false;
    }

    setErrors({});
    return true;
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
        const field: string = err.path.join('.');

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

/**
 * Vérifie si l'erreur est formée comme un retour de server action
 *
 * @param error
 */
function isErrorResponse(error: unknown): error is ErrorResponse
{
    return (
        typeof error === 'object' &&
        error !== null &&
        'success' in error &&
        error.success === false &&
        'error' in error
    );
}

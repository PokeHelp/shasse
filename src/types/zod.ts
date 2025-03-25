import {ZodError} from "zod";

export interface DataError
{
    success: false;
    error: ZodError<unknown>;
}

export type ErrorMap = Record<string, string>;
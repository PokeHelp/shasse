import {ErrorResponse} from "@types";

export interface FormWithName
{
    name: string;
    id: number;
}

export type FormWithNamesResponse = | {
    success: true;
    data: FormWithName[];
} | ErrorResponse

export interface RegionalFormWithName
{
    id: number;
    name: string;
    internationalNumber: number;
    formId: number;
}
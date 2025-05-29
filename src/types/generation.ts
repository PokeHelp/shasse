import {ErrorResponse} from "@types";

export interface Generation
{
    id: number;
}

export type GenerationResponse = | {
    success: true;
    data: Generation[];
} | ErrorResponse
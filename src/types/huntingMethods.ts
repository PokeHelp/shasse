import {ErrorResponse} from "@types";

export interface HuntingMethods
{
    id: number;
    name: string;
}

export type HuntingMethodsResponse = | {
    success: true;
    data: HuntingMethods[];
} | ErrorResponse
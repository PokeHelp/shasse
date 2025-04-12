import {ErrorResponse} from "@types";

export interface TypeName {
    id: number;
    name: string
}

export type TypesResponse = | {
    success: true;
    data: TypeName[];
} | ErrorResponse
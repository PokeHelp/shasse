import {ErrorResponse} from "@types";

export interface TypeName {
    id: number;
    name: string
}

export type TypesResponse = | {
    success: true;
    data: TypeName[];
} | ErrorResponse

export interface Type {
    id: number;
    name: string;
    order: number;
}

export interface TypeGeneration extends Type {
    generationId: number;
}

export type TypeGenerationResponse = | {
    success: true;
    data: TypeGeneration[];
} | ErrorResponse
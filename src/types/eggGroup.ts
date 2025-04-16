import {ErrorResponse} from "@types";

export interface EggGroup
{
    id: number;
    order: number;
    name: string;
}

export interface EggGroupGeneration extends EggGroup
{
    generationId: number;
}

export type EggGroupGenerationResponse = | {
    success: true;
    data: EggGroupGeneration[];
} | ErrorResponse
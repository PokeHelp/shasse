import {ErrorResponse} from "@types";

export interface Ability {
    id: number;
    name: string;
    order: number;
    isHidden: boolean;
}

export interface AbilityGeneration extends Ability {
    generationId: number;
}

export type AbilityGenerationResponse = | {
    success: true;
    data: AbilityGeneration[];
} | ErrorResponse
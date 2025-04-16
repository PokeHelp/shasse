import {ErrorResponse} from "@types";

export interface Statistic {
    pv: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    special: number;
    speed: number;
}

export interface StatisticGeneration extends Statistic {
    generationId: number;
}

export type StatisticGenerationResponse = | {
    success: true;
    data: StatisticGeneration[];
} | ErrorResponse
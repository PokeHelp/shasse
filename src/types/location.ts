import {ErrorResponse} from "@types";

export interface Location
{
    obtationName: string;
    zoneName: string;
    locationName: string;
    rate: number;
    minLevel: number;
    maxLevel: number;
    limit: number;
    isAlpha: boolean;
    meteoName: string;
    detailName: string;
    conditionName: string;
    isShassable: boolean;
    gameName: string;
}

export interface LocationGeneration extends Location
{
    generationId: number;
}

export type LocationGenerationsResponse = | {
    success: true;
    data: LocationGeneration[];
} | ErrorResponse

export interface GameLocationName
{
    id: number;
    gameName: string;
    rate: number;
    minLevel: number;
    maxLevel: number;
    huntingMethodName: string;
    limit: number;
    meteoName: string;
    conditionName: string;
    isAlpha: boolean;
    detailName: string;
    gameId: number;
    rateId: number;
    meteoId: number;
    detailRateId: number;
    conditionRateId: number;
    huntingMethodId: number;
}

export type GameLocationNameResponse = | {
    success: true;
    data: GameLocationName[];
} | ErrorResponse
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
}

export interface LocationGeneration extends Location
{
    generationId: number;
}
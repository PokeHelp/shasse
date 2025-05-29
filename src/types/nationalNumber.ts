export interface NationalNumber
{
    number: number;
    groupGameName: string;
}

export interface NationalNumberGeneration extends NationalNumber
{
    generationId: number;
}
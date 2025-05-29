export interface Capacity
{
    name: string;
    obtationTypeName: string;
    detail: string;
}

export interface CapacityGeneration extends Capacity {
    generationId: number;
}
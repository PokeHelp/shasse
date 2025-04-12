import {ErrorResponse} from "@types";

export type PokedexResponse = | {
    success: true;
    data: Pokedex[];
} | ErrorResponse

interface PokedexPokemonBase
{
    id: number;
    international_number: number;
    name?: string;
    types: {type_id: number, order: number, type_name: string}[]
}

export interface Pokedex extends Omit<PokedexPokemonBase, 'name'>
{
    name: string;
}
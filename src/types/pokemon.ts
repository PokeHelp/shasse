import {Ability, EggGroup, ErrorResponse, Statistic, Type} from "@types";

export type PokedexResponse = | {
    success: true;
    data: Pokedex[];
} | ErrorResponse

interface PokedexPokemonBase
{
    id: number;
    international_number: number;
    name?: string;
    types: { type_id: number, order: number, type_name: string }[]
}

export interface Pokedex extends Omit<PokedexPokemonBase, 'name'>
{
    name: string;
}

export interface PokemonInfo
{
    id: number;
    name: string;
    internationalNumber: number;
    hatchingCycle: number;
    globalXp: number;
    captureRate: number;
    callHelpRate: number;
    size: number;
    weight: number;
    maleRate: number;
    femelleRate: number;
    generationAppear: number;
    categoryName: string;
    xpGift: number;
    generationId: number;
}

export interface PokemonInfoDetail extends PokemonInfo
{
    types: Type[];
    eggGroups: EggGroup[];
    abilities: Ability[];
    statistics: Statistic[];
}

export interface GroupedPokemonInfoDetail
{
    [key: string]: PokemonInfoDetail;
}

export type GroupedPokemonInfoDetailResponse = | {
    success: true;
    data: GroupedPokemonInfoDetail;
} | ErrorResponse
import {
    Ability,
    CapacityGeneration,
    EggGroup,
    ErrorResponse, EvolutionTree, FormWithName,
    LocationGeneration,
    NationalNumberGeneration, RegionalFormWithName,
    Statistic,
    Type
} from "@types";

export type PokedexResponse = | {
    success: true;
    data: Pokedex[];
} | ErrorResponse

interface PokedexPokemonBase
{
    id: number;
    internationalNumber: number;
    generationIdApear: number;
    name?: string;
    types: Type[]
    formIds: number[];
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
    forms: FormWithName[];
    nationalNumbers: NationalNumberGeneration[];
    capacities: CapacityGeneration[];
    locations: LocationGeneration[];
    evolutions: EvolutionTree[]
    formId: number;
    regionalForms: RegionalFormWithName[]
}

export interface GroupedPokemonInfoDetail
{
    [key: string]: PokemonInfoDetail;
}

export type GroupedPokemonInfoDetailResponse = | {
    success: true;
    data: GroupedPokemonInfoDetail;
} | ErrorResponse
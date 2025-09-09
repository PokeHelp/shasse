import {ErrorResponse} from "@types";

export interface CreateHunting
{
    useCC: boolean
    isFinish: boolean
    finishAt?: Date | null
    meetingNumber: number
    time: number
    createdAt: Date
    spriteInShiny: boolean
    pokemonGameLocationId: number,
    nickname?: string
}

export type CreateHuntingResponse = | {
    success: true;
    data: { ownedId: number };
} | ErrorResponse

export interface OwnedPokemonIdByUser
{
    id: number;
    pokemonId: number;
    huntingMethodName: string;
}

export interface OwnedPokemonDetail
{
    id: number;
    meetingNumber: number;
    time: number;
    pokemonName: string;
    huntingMethodName: string;
    formName: string;
    gameId: number;
    formId: number;
}
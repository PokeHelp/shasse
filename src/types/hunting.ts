import {ErrorResponse} from "@types";

export interface CreateHunting
{
    pokemonId: number
    formId: number | null
    gameId: number
    useCC: boolean
    isFinish: boolean
    finishAt: Date | null
    meetingNumber: number
    time: number
    createdAt: Date
    spriteInShiny: boolean
    huntingMethodId: number
}

export type CreateHuntingResponse = | {
    success: true;
    data: {ownedId: number};
} | ErrorResponse
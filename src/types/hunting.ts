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
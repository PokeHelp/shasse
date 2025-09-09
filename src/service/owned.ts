'use server';

import {CreateHunting, OwnedPokemon, OwnedPokemonDetail, OwnedPokemonIdByUser, OwnedSumarry} from "@types";
import {
    createOwned,
    getAllOwned,
    getLastOwned,
    getOwnedById,
    getOwnedPokemonByUser, retrieveOwnedId,
    updateOwned as updateOwnedQuery
} from "@query";
import {getRequiredUser} from "@lib/auth-server";

export async function createOwnedPokemon(data: CreateHunting, userId: string): Promise<{ id: bigint }>
{
    return createOwned(data, userId);
}

export async function getAllOwnedPokemon(userId: string | null = null): Promise<OwnedSumarry[]>
{
    userId = userId || (await getRequiredUser()).id;

    return getAllOwned(userId);
}

export async function getOwnedPokemon(userId: string | null = null, huntingId: number | null = null): Promise<OwnedPokemon | null>
{
    userId = userId || (await getRequiredUser()).id;

    let owned: OwnedPokemon | null = null;

    if (huntingId !== null)
    {
        owned = await getOwnedById(userId, huntingId)
    }

    if (owned === null)
    {
        owned = await getLastOwned(userId);
    }

    return owned;
}

export async function getOwnedPokemonUser(userId: string | null = null): Promise<OwnedPokemonIdByUser[]>
{
    userId = userId || (await getRequiredUser()).id;

    return getOwnedPokemonByUser(userId);
}

export async function getOwnedDetailById(ownedId: number, userId: string | null = null): Promise<OwnedPokemonDetail>
{
    userId = userId || (await getRequiredUser()).id;

    return retrieveOwnedId(ownedId, userId);
}

export async function updateOwned(ownedId: number, meetingNumber: number, time: number, isFinish: boolean, nickname: string): Promise<{
    status: string
}>
{
    try
    {
        await updateOwnedQuery(ownedId, meetingNumber, time, nickname, isFinish);
        return {status: "success"};
    } catch (e)
    {
        console.log(e);
        return {status: "error"};
    }
}
import {CreateHunting, OwnedPokemon, OwnedSumarry} from "@types";
import {createOwned, getAllOwned, getLastOwned} from "@query";
import {getRequiredUser} from "@lib/auth-server";

export async function createOwnedPokemon(data: CreateHunting, userId: string): Promise<{ id: bigint }>
{
    return createOwned(data, userId);
}

export async function getAllOwnedPokemon(userId: string|null = null): Promise<OwnedSumarry[]>
{
    userId = userId || (await getRequiredUser()).id;

    return getAllOwned(userId);
}

export async function getLastOwnedPokemonCreated(userId: string|null = null): Promise<OwnedPokemon>
{
    userId = userId || (await getRequiredUser()).id;

    return getLastOwned(userId)
}
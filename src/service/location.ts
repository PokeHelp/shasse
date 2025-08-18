import {getLocationWithName} from "@query";
import {getLangueId} from "@src/service/langue";
import {getPokemonGameLocationName} from "@src/query/location";
import {GameLocationName} from "@types";

export async function getPokemonGenerationLocation(pokemonId: number | null, formId: number, gameId: number | null, shinyLocation: boolean, langId: number | null = null)
{
    langId = !langId ? await getLangueId('french') : langId;

    return getLocationWithName(pokemonId, gameId, langId, shinyLocation, formId);
}

export async function getGameLocation(pokemonId: number | null = null, gameId: number | null = null, formId: number | null = null): Promise<GameLocationName[]>
{
    return getPokemonGameLocationName(pokemonId, formId, gameId)
}
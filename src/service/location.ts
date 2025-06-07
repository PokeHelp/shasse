import {getLocationWithName} from "@query";
import {getLangueId} from "@src/service/langue";

export async function getPokemonGenerationLocation(pokemonId: number | null, formId: number, gameId: number | null, shinyLocation: boolean, langId: number | null = null)
{
    langId = !langId ? await getLangueId('french') : langId;

    return getLocationWithName(pokemonId, gameId, langId, shinyLocation, formId);
}
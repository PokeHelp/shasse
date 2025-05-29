import {getLangueId} from "@src/service/langue";
import {getPokemonAbilityWithName} from "@query";
import {AbilityGeneration} from "@types";

export async function getPokemonAbilityWithTranslation(pokemonId: number, generationId?: number | null, langId?: number | null): Promise<AbilityGeneration[]>
{
    langId = !langId ? await getLangueId('french') : langId;

    return getPokemonAbilityWithName(pokemonId, langId, generationId);
}
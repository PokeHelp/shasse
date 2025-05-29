import {getLangueId} from "@src/service/langue";
import {getPokemonEggGroupWithName} from "@query";
import {EggGroupGeneration} from "@types";

export async function getPokemonEggGroupWithTranslation(pokemonId: number, generationId?: number | null, langId?: number | null): Promise<EggGroupGeneration[]>
{
    langId = !langId ? await getLangueId('french') : langId;

    return getPokemonEggGroupWithName(pokemonId, langId, generationId);
}
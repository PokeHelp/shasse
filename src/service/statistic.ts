import {getPokemonStatisticWithName} from "@query";
import {StatisticGeneration} from "@types";

export async function getPokemonStatisticWithTranslation(pokemonId: number, generationId?: number | null): Promise<StatisticGeneration[]>
{
    return getPokemonStatisticWithName(pokemonId, generationId);
}
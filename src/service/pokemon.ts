import {getLangueId, getLastGeneration} from "@service";
import {
    getPokemonAbilityWithName,
    getPokemonEggGroupWithName, getPokemonInfoById,
    getPokemonStatisticWithName,
    getPokemonTypeWithName,
} from "@query";
import {
    AbilityGeneration,
    EggGroupGeneration, GroupedPokemonInfoDetail,
    PokemonInfo,
    StatisticGeneration,
    TypeGeneration
} from "@types";

export async function getDetail(pokemonId: number, lastGeneration: boolean, generationId?: number | null, langId?: number | null): Promise<GroupedPokemonInfoDetail>
{
    langId = !langId ? await getLangueId('french') : langId;
    generationId = lastGeneration ? (await getLastGeneration()) : generationId;

    const [typesResults, eggGroupResults, abilityResults, statisticResults, pokemonResults] = await Promise.allSettled([
        getPokemonTypeWithName(pokemonId, langId, generationId),
        getPokemonEggGroupWithName(pokemonId, langId, generationId),
        getPokemonAbilityWithName(pokemonId, langId, generationId),
        getPokemonStatisticWithName(pokemonId, generationId),
        getPokemonInfoById(pokemonId, langId, generationId)
    ]);

    const types: TypeGeneration[] = typesResults.status === 'fulfilled' ? typesResults.value : [];
    const eggGroups: EggGroupGeneration[] = eggGroupResults.status === 'fulfilled' ? eggGroupResults.value : [];
    const abilities: AbilityGeneration[] = abilityResults.status === 'fulfilled' ? abilityResults.value : [];
    const pokemon: PokemonInfo[] = pokemonResults.status === 'fulfilled' ? pokemonResults.value : [];
    const statistic: StatisticGeneration[] = statisticResults.status === 'fulfilled' ? statisticResults.value : [];

    const groupedData: GroupedPokemonInfoDetail = {};

    const allGenerationIds: number[] = [
        ...types.map((t: TypeGeneration): number => t.generationId),
        ...eggGroups.map((e: EggGroupGeneration): number => e.generationId),
        ...abilities.map((a: AbilityGeneration): number => a.generationId),
        ...statistic.map((s: StatisticGeneration): number => s.generationId),
        ...pokemon.map((p: PokemonInfo): number => p.generationId)
    ].filter((v: number, i: number, a: number[]): boolean => a.indexOf(v) === i);

    allGenerationIds.forEach((genId: number): void =>
    {
        const pokemonData: PokemonInfo | undefined = pokemon.find((p: PokemonInfo): boolean => p.generationId === genId);
        if (pokemonData)
        {
            groupedData[genId] = {
                ...pokemonData,
                types:      types.filter((t: TypeGeneration): boolean => t.generationId === genId),
                egGroups:   eggGroups.filter((e: EggGroupGeneration): boolean => e.generationId === genId),
                abilities:  abilities.filter((a: AbilityGeneration): boolean => a.generationId === genId),
                statistics: statistic.filter((s: StatisticGeneration): boolean => s.generationId === genId)
            };
        }
    });

    return groupedData;
}
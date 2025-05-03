import {getLangueId, getLastGeneration} from "@service";
import {
    getFormsByPokemonId,
    getPokemonAbilityWithName,
    getPokemonEggGroupWithName, getPokemonInfoById,
    getPokemonStatisticWithName,
    getPokemonTypeWithName,
    getNationalNumber, getCapacities, getLocationWithName
} from "@query";
import {
    AbilityGeneration, CapacityGeneration,
    EggGroupGeneration, GroupedPokemonInfoDetail, LocationGeneration, NationalNumberGeneration,
    PokemonInfo,
    StatisticGeneration,
    TypeGeneration
} from "@types";

export async function getDetail(pokemonId: number, lastGeneration: boolean, generationId: number | null = null, langId: number | null = null,
                                checked: {
                                    types?: boolean;
                                    eggGroups?: boolean;
                                    abilities?: boolean;
                                    statistics?: boolean;
                                    forms?: boolean;
                                    nationalNumbers?: boolean;
                                    capacities?: boolean;
                                    locations?: boolean;
                                }                                                                                                     = {}
): Promise<GroupedPokemonInfoDetail>
{
    const resolvedLangId: number = langId ?? await getLangueId('french');
    const resolvedGenerationId: number | null = lastGeneration ? await getLastGeneration() : generationId;
    const {
              types           = false,
              eggGroups       = false,
              abilities       = false,
              statistics      = false,
              forms           = false,
              nationalNumbers = false,
              capacities      = false,
              locations       = false,
          } = checked;

    type PokemonDataResult =
        | TypeGeneration[]
        | EggGroupGeneration[]
        | AbilityGeneration[]
        | StatisticGeneration[]
        | NationalNumberGeneration[]
        | PokemonInfo[]
        | { formId: number }[]
        | CapacityGeneration[]
        | LocationGeneration[];

    const promises: Promise<PokemonDataResult>[] = [];
    promises.push(getPokemonInfoById(pokemonId, resolvedLangId, resolvedGenerationId));

    if (types) promises.push(getPokemonTypeWithName(pokemonId, resolvedLangId, resolvedGenerationId));
    if (eggGroups) promises.push(getPokemonEggGroupWithName(pokemonId, resolvedLangId, resolvedGenerationId));
    if (abilities) promises.push(getPokemonAbilityWithName(pokemonId, resolvedLangId, resolvedGenerationId));
    if (statistics) promises.push(getPokemonStatisticWithName(pokemonId, resolvedGenerationId));
    if (forms) promises.push(getFormsByPokemonId(pokemonId, {formId: true}));
    if (nationalNumbers) promises.push(getNationalNumber(pokemonId, resolvedGenerationId, resolvedLangId));
    if (capacities) promises.push(getCapacities(pokemonId, resolvedGenerationId, resolvedLangId));
    if (locations) promises.push(getLocationWithName(pokemonId, resolvedGenerationId, resolvedLangId));

    const results: PromiseSettledResult<PokemonDataResult>[] = await Promise.allSettled(promises);
    let resultIndex: number = 0;

    const getResult = <T extends PokemonDataResult[number]>(requested: boolean): T[] =>
    {
        if (!requested) return [];
        const result: PromiseSettledResult<PokemonDataResult> = results[resultIndex++];
        return result.status === 'fulfilled' ? result.value as T[] : [];
    };

    const pokemonData: PokemonInfo[] = getResult<PokemonInfo>(true);
    const typeData: TypeGeneration[] = getResult<TypeGeneration>(types);
    const eggGroupData: EggGroupGeneration[] = getResult<EggGroupGeneration>(eggGroups);
    const abilityData: AbilityGeneration[] = getResult<AbilityGeneration>(abilities);
    const statisticData: StatisticGeneration[] = getResult<StatisticGeneration>(statistics);
    const formData: { formId: number }[] = getResult<{ formId: number }>(forms);
    const nationalNumberData: NationalNumberGeneration[] = getResult<NationalNumberGeneration>(nationalNumbers);
    const capacitiesData: CapacityGeneration[] = getResult<CapacityGeneration>(capacities);
    const locationsData: LocationGeneration[] = getResult<LocationGeneration>(locations);

    const groupedData: GroupedPokemonInfoDetail = {};

    const allGenerationIds = new Set<number>([
        ...typeData.map((t: TypeGeneration): number => t.generationId),
        ...eggGroupData.map((e: EggGroupGeneration): number => e.generationId),
        ...abilityData.map((a: AbilityGeneration): number => a.generationId),
        ...statisticData.map((s: StatisticGeneration): number => s.generationId),
        ...pokemonData.map((p: PokemonInfo): number => p.generationId),
        ...nationalNumberData.map((n: NationalNumberGeneration): number => n.generationId),
        ...capacitiesData.map((c: CapacityGeneration): number => c.generationId),
        ...locationsData.map((l: LocationGeneration): number => l.generationId),
    ]);

    for (const genId of allGenerationIds)
    {
        const pokemonInfo: PokemonInfo | undefined = pokemonData.find((p: PokemonInfo): boolean => p.generationId === genId);
        if (pokemonInfo)
        {
            groupedData[genId] = {
                ...pokemonInfo,
                types:           typeData.filter((t: TypeGeneration): boolean => t.generationId === genId),
                eggGroups:       eggGroupData.filter((e: EggGroupGeneration): boolean => e.generationId === genId),
                abilities:       abilityData.filter((a: AbilityGeneration): boolean => a.generationId === genId),
                statistics:      statisticData.filter((s: StatisticGeneration): boolean => s.generationId === genId),
                forms:           formData.map((f: { formId: number }): number => f.formId),
                nationalNumbers: nationalNumberData.filter((n: NationalNumberGeneration): boolean => n.generationId === genId),
                capacities:      capacitiesData.filter((c: CapacityGeneration): boolean => c.generationId === genId),
                locations:       locationsData.filter((l: LocationGeneration): boolean => l.generationId === genId),
            };
        }
    }

    return groupedData;
}
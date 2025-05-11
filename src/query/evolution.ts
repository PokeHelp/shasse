import {prisma} from "@lib";
import {reference_table} from "@prisma/client";
import {EvolutionNode, EvolutionTree} from "@types";

interface EvolutionResult
{
    level: number;
    pokemon_start_name: string;
    pokemon_end_name: string;
    pokemon_end_id: number;
    evolution_method_name: string;
    evolution_info_name: string;
}

export async function getAllEvolutions(pokemonFormId: number, langId: number): Promise<EvolutionTree[]>
{
    const firstEvolutionIds: number[] | null = await getFirstEvolutionId(pokemonFormId);
    if (!firstEvolutionIds) return [];

    const evolutionsTrees: EvolutionTree[] = [];

    for (const pokemonStartId of firstEvolutionIds)
    {
        const initialEvolutions: EvolutionResult[] = await fetchEvolutions(pokemonStartId, langId);

        if (initialEvolutions.length === 0) continue;

        const evolutionNodes: EvolutionNode[] = await Promise.all(
            initialEvolutions.map(async (evolution: EvolutionResult): Promise<EvolutionNode> => ({
                evolutionName: evolution.pokemon_end_name,
                level:         evolution.level,
                methodName:    evolution.evolution_method_name,
                infoName:      evolution.evolution_info_name,
                evos:          await buildEvolutionTree(evolution.pokemon_end_id, langId)
            }))
        );

        evolutionsTrees.push({
            pokemonName: initialEvolutions[0].pokemon_start_name,
            evos:        evolutionNodes
        });
    }

    return evolutionsTrees;
}

export async function getFirstEvolutionId(pokemonFormId: number): Promise<number[] | null>
{
    interface EvolutionType
    {
        pokemonFormEndId: number;
        pokemonFormStartId: number;
    }

    const evolutions: EvolutionType[] = await prisma.evolution.findMany({
        where:  {
            OR: [
                {pokemonFormStartId: pokemonFormId},
                {pokemonFormEndId: pokemonFormId}
            ]
        },
        select: {
            pokemonFormEndId:   true,
            pokemonFormStartId: true
        }
    });

    if (evolutions.length === 0) return null;

    const asEnd: EvolutionType[] = evolutions.filter((e: EvolutionType): boolean => e.pokemonFormEndId === pokemonFormId);

    if (asEnd.length > 0)
    {
        const previousIds: (number[] | null)[] = await Promise.all(
            asEnd.map((e: EvolutionType): Promise<number[] | null> => getFirstEvolutionId(e.pokemonFormStartId))
        );

        const validIds: number[] = previousIds.filter((ids: number[] | null): ids is number[] => ids !== null).flat();
        return validIds.length > 0 ? Array.from(new Set(validIds)) : null;
    }

    return Array.from(new Set(evolutions.map((e: EvolutionType): number => e.pokemonFormStartId)));
}

async function buildEvolutionTree(pokemonId: number, langId: number): Promise<EvolutionNode[]>
{
    const evolutions: EvolutionResult[] = await fetchEvolutions(pokemonId, langId);

    return await Promise.all(
        evolutions.map(async (evolution: EvolutionResult): Promise<EvolutionNode> => ({
            evolutionName: evolution.pokemon_end_name,
            level:         evolution.level,
            methodName:    evolution.evolution_method_name,
            infoName:      evolution.evolution_info_name,
            evos:          await buildEvolutionTree(evolution.pokemon_end_id, langId)
        }))
    );
}

async function fetchEvolutions(pokemonStartId: number, langId: number): Promise<EvolutionResult[]>
{
    return prisma.$queryRaw<EvolutionResult[]>`
        WITH translations AS (SELECT * FROM translation WHERE status = 'on' AND langue_id = ${langId}),
             active_evolution_method as (SELECT * FROM evolution_method WHERE status = 'on'),
             active_evolution_info as (SELECT * FROM evolution_info WHERE status = 'on'),
             active_pokemon_form as (SELECT * FROM pokemon_form WHERE STATUS = 'on')

        SELECT e.level,
               tps.name as pokemon_start_name,
               tpe.name as pokemon_end_name,
               tem.name as evolution_method_name,
               tei.name as evolution_info_name,
               e.pokemon_end_id
        FROM evolution e
                 JOIN active_evolution_method aem ON aem.id = e.evolution_method
                 JOIN active_evolution_info aei ON aei.id = e.evolution_info_id
                 JOIN active_pokemon_form apfs ON apfs.id = e.pokemon_start_id
                 JOIN active_pokemon_form apfe ON apfe.id = e.pokemon_end_id
                 LEFT JOIN translations tps
                           ON tps.reference_table = ${reference_table.POKEMON} AND tps.reference_id = apfs.pokemon_id
                 LEFT JOIN translations tpe
                           ON tpe.reference_table = ${reference_table.POKEMON} AND tpe.reference_id = apfe.pokemon_id
                 LEFT JOIN translations tem
                           ON tem.reference_table = ${reference_table.EVOLUTION_METHOD} AND tem.reference_id = e.evolution_method
                 LEFT JOIN translations tei
                           ON tei.reference_table = ${reference_table.EVOLUTION_INFO} AND tei.reference_id = e.evolution_info_id
        WHERE e.status = 'on'
          AND e.pokemon_start_id = ${pokemonStartId};
    `;
}
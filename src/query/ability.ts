import {AbilityGeneration} from "@types";
import {prisma} from "@lib";
import {Prisma, reference_table} from "@prisma/client";

export async function getPokemonAbilityWithName(pokemonId: number, langId: number, generationId?: number | null): Promise<AbilityGeneration[]>
{
    interface RawQueryAbilityGeneration extends Omit<AbilityGeneration, 'id' | 'generationId' | 'isHidden'>
    {
        id: bigint;
        generation_id: bigint;
        is_hidden: boolean;
    }

    const rawResults: RawQueryAbilityGeneration[] = await prisma.$queryRaw`
        SELECT ao.ability_id as id, t.name, pi.generation_id, ao.order, ao.is_hidden
        FROM pokemon p
                 JOIN pokemon_info pi ON pi.pokemon_id = p.id AND pi.status = 'on'
                 JOIN ability_order ao ON ao.pokemon_info_id = pi.id
                 LEFT JOIN translation t ON t.reference_id = ao.ability_id
            AND t.langue_id = ${langId} AND t.reference_table = ${reference_table.ABILITY} AND t.status = 'on'
        WHERE p.status = 'on'
          AND p.id = ${pokemonId} ${generationId ? Prisma.sql`AND pi.generation_id = ${generationId}` : Prisma.empty}
        ORDER BY pi.generation_id, ao.order;
    `;

    return rawResults.map((row: RawQueryAbilityGeneration): AbilityGeneration => ({
        id:           Number(row.id),
        generationId: Number(row.generation_id),
        name:         row.name,
        order:        row.order,
        isHidden:     row.is_hidden
    }));
}
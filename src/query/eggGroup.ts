import {EggGroupGeneration} from "@types";
import {prisma} from "@lib";
import {Prisma, reference_table} from "@prisma/client";

export async function getPokemonEggGroupWithName(pokemonId: number, langId: number, generationId?: number | null): Promise<EggGroupGeneration[]>
{
    interface RawQueryEggGroupGeneration extends Omit<EggGroupGeneration, 'id' | 'generationId'>
    {
        id: bigint;
        generation_id: bigint;
    }

    const rawResults: RawQueryEggGroupGeneration[] = await prisma.$queryRaw`
        SELECT ego.egg_group_id as id, t.name, pi.generation_id, ego.order
        FROM pokemon p
                 JOIN pokemon_info pi ON pi.pokemon_id = p.id AND pi.status = 'on'
                 JOIN egg_group_order ego ON ego.pokemon_info_id = pi.id
                 LEFT JOIN translation t ON t.reference_id = ego.egg_group_id
            AND t.langue_id = ${langId} AND t.reference_table = ${reference_table.EGG_GROUP} AND t.status = 'on'
        WHERE p.status = 'on'
          AND p.id = ${pokemonId} ${generationId ? Prisma.sql`AND pi.generation_id = ${generationId}` : Prisma.empty}
        ORDER BY pi.generation_id, ego.order;
    `;

    return rawResults.map((row: RawQueryEggGroupGeneration): EggGroupGeneration => ({
        id:           Number(row.id),
        generationId: Number(row.generation_id),
        name:         row.name,
        order:        row.order,
    }));
}
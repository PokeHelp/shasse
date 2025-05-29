import {prisma} from "@lib";
import {Prisma, reference_table} from "@prisma/client";
import {CapacityGeneration} from "@types";

export async function getCapacities(pokemonId: number, generationId: number | null, langId: number): Promise<CapacityGeneration[]>
{
    interface RawQueryResults extends Omit<CapacityGeneration, 'generationId' | 'name' | 'obtationTypeName'>
    {
        capacity_name: string;
        generation_id: string;
        obtation_type_name: string;
    }

    const rawResults: RawQueryResults[] = await prisma.$queryRaw<RawQueryResults[]>`
        SELECT DISTINCT tc.name as capacity_name, g.generation_id, so.detail, tsot.name as obtation_type_name
        FROM skill_obtation so
                 INNER JOIN translation tc
                            ON tc.reference_id = so.capacity_id AND tc.reference_table = ${reference_table.CAPACITY} AND
                               tc.status = 'on' AND tc.langue_id = ${langId}
                 INNER JOIN translation tsot ON tsot.reference_id = so.skill_obtation_type_id AND
                                                tsot.reference_table = ${reference_table.SKILL_OBTENTION_TYPE} AND
                                                tsot.status = 'on' AND tsot.langue_id = ${langId}
                 INNER JOIN group_game gg ON so.group_game_id = gg.id AND gg.status = 'on'
                 INNER JOIN game_group_game ggg ON gg.id = ggg.group_game_id
                 INNER JOIN game g ON g.id = ggg.game_id AND g.status = 'on'
            ${generationId ? Prisma.sql`AND g.generation_id = ${generationId}` : Prisma.empty}
        WHERE so.pokemon_id = ${pokemonId}
        ORDER BY obtation_type_name DESC`;

    return rawResults.map((raw: RawQueryResults): CapacityGeneration => ({
        obtationTypeName: raw.obtation_type_name,
        name: raw.capacity_name,
        detail: raw.detail,
        generationId: Number(raw.generation_id)
    }));
}
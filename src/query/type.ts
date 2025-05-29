import {prisma} from "@lib";
import {Prisma, reference_table} from "@prisma/client";
import {TypeGeneration, TypeName} from "@types";

/**
 * Permet de récupérer toutes les langues
 *
 * @param select
 */
export async function getAllType<T extends Prisma.typeSelect>(select?: T)
    : Promise<Prisma.typeGetPayload<{ select: T }>[]>
{
    return prisma.type.findMany({
        where:  {status: "on"},
        select: select || {id: true} as T
    });
}

/**
 * Renvoie tous les types avec leurs noms
 *
 * @param langId
 */
export async function getAllTypeWithName(langId: number): Promise<TypeName[]>
{
    interface RawQueryTypeName extends Omit<TypeName, 'id'>
    {
        id: bigint;
    }

    const rawResults: RawQueryTypeName[] = await prisma.$queryRaw<RawQueryTypeName[]>`
        SELECT ty.id, tr.name
        FROM type ty
                 JOIN translation tr on tr.reference_id = ty.id
        where ty.status = 'on'
          AND tr.status = 'on'
          AND reference_table = ${reference_table.TYPE}
          AND langue_id = ${langId}
    `;

    return rawResults.map(row => ({
        id:   Number(row.id),
        name: row.name,
    }));
}

/**
 * Renvoie tous les types d'un pokémon avec leurs noms
 *
 * @param pokemonId
 * @param generationId
 * @param langId
 */
export async function getPokemonTypeWithName(pokemonId: number, langId: number, generationId?: number | null): Promise<TypeGeneration[]>
{
    interface RawQueryTypeGeneration extends Omit<TypeGeneration, 'id' | 'generationId'>
    {
        id: bigint;
        generation_id: bigint;
    }

    const rawResults: RawQueryTypeGeneration[] = await prisma.$queryRaw`
        SELECT tyo.type_id as id, t.name, pi.generation_id, tyo.order
        FROM pokemon p
                 JOIN pokemon_info pi ON pi.pokemon_id = p.id AND pi.status = 'on'
                 JOIN type_order tyo ON tyo.pokemon_info_id = pi.id
                 LEFT JOIN translation t ON t.reference_id = tyo.type_id
            AND t.langue_id = ${langId} AND t.reference_table = ${reference_table.TYPE} AND t.status = 'on'
        WHERE p.status = 'on'
          AND p.id = ${pokemonId} ${generationId ? Prisma.sql`AND pi.generation_id = ${generationId}` : Prisma.empty}
        ORDER BY pi.generation_id, tyo.order;
    `;

    return rawResults.map(row => ({
        id:           Number(row.id),
        generationId: Number(row.generation_id),
        name:         row.name,
        order:        row.order,
    }));
}
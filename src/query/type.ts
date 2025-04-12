import {prisma} from "@lib";
import {Prisma, reference_table} from "@prisma/client";
import {Pokedex, TypeName} from "@types";

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

export async function getAllTypeQuery(langId: number): Promise<TypeName[]>
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
        id:              Number(row.id),
        name: row.name,
    }));
}
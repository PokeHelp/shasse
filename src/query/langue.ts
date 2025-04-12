import {prisma} from "@lib";
import {Prisma} from "@prisma/client";

/**
 * Permet de récupérer une langue
 *
 * @param data
 * @param select
 */
export async function getLangue<T extends Prisma.langueSelect>(
    data: { id?: number; name?: string; isoCode?: string; },
    select?: T
): Promise<Prisma.langueGetPayload<{ select: T }> | null>
{
    return prisma.langue.findFirst({
        where:  {
            OR:     [
                {id: data?.id},
                {name: data?.name},
                {isoCode: data?.isoCode}
            ],
            status: "on"
        },
        select: select || {id: true} as T
    });
}

/**
 * Permet de récupérer toutes les langues
 *
 * @param select
 */
export async function getAllLangue<T extends Prisma.langueSelect>(select?: T)
    : Promise<Prisma.langueGetPayload<{ select: T }>[]>
{
    return prisma.langue.findMany({
        where:  {status: "on"},
        select: select || {id: true} as T
    });
}
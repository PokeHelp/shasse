import {Prisma} from "@prisma/client";
import {prisma} from "@lib";

export async function getLastGeneration<T extends Prisma.generationSelect>(select?: T)
    : Promise<Prisma.generationGetPayload<{ select: T }> | null>
{
    return prisma.generation.findFirst({
        where:  {status: "on"},
        select: select || {id: true} as T,
        orderBy: {id: 'desc'}
    });
}

export async function getAllGeneration<T extends Prisma.generationSelect>(select?: T)
    : Promise<Prisma.generationGetPayload<{ select: T }>[]>
{
    return prisma.generation.findMany({
        where:  {status: "on"},
        select: select || {id: true} as T
    });
}
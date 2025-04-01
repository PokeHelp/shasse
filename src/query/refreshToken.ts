import {prisma} from "@lib";
import {Prisma} from "@prisma/client";

export async function createRefreshToken(data: {token: string, userId: number}): Promise<void>
{
    await prisma.refresh_token.create({
        data: {
            token:     data.token,
            userId:    data.userId,
            expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
        }
    });
}

export async function getRefreshToken<T extends Prisma.refresh_tokenSelect>(
    data: { id?: number; userId?: number; },
    select?: T
): Promise<Prisma.refresh_tokenGetPayload<{ select: T }> | null>
{
    return prisma.refresh_token.findFirst({
        where:  {
            OR: [
                {id: data?.id},
                {userId: data?.userId}
            ],
            expiresAt: {gt: new Date()}
        },
        orderBy: {
            expiresAt: 'desc'
        },
        select: select || {id: true} as T
    });
}
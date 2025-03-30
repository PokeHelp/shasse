import {prisma} from "@lib";

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
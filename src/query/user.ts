import {Prisma, role, user} from "@prisma/client";
import { prisma } from "@lib";
import {createUserData} from "@types";

export async function getUser<T extends Prisma.UserSelect>(
    data: { id?: number; email?: string; pseudonym?: string },
    select: T = { id: true } as T
): Promise<{ [K in keyof T]: K extends keyof user ? user[K] : never } | null> {
    const result = await prisma.user.findFirst({
        where: {
            OR: [
                { id: data?.id },
                { email: data?.email },
                { pseudonym: data?.pseudonym }
            ]
        },
        select
    });

    return result as { [K in keyof T]: K extends keyof user ? user[K] : never } | null;
}

export async function createUser(data: createUserData): Promise<user>
{
    return prisma.user.create({
        data: {
            email:     data.email,
            pseudonym: data.pseudonym,
            password:  data.password,
            discordId: null,
            role:      role.PUBLIC
        }
    });
}
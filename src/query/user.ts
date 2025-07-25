import {Prisma, role, user} from "@prisma/client";
import {prisma} from "@lib";
import {RegisterData} from "@types";

export async function getActiveUser<T extends Prisma.userSelect>(
    data: { id?: number; email?: string; pseudonym?: string; },
    select?: T
): Promise<Prisma.userGetPayload<{ select: T }> | null>
{
    return prisma.user.findFirst({
        where:  {
            OR: [
                {id: data?.id},
                {email: data?.email},
                {pseudonym: data?.pseudonym}
            ],
            status: "on"
        },
        select: select || {id: true} as T
    });
}

export async function createUser(data: RegisterData): Promise<user>
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
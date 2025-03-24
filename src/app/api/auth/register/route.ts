import bcrypt from 'bcrypt';
import {prisma} from '@lib';
import {langue, role} from '@prisma/client';
import {SafeParseReturnType} from "zod";
import {RegisterData, SimplifyRole, UserWithRoles} from "@types";
import {createJWT, mapError, sendResponse, logError} from "@utils";
import {HttpStatusCode} from "axios";
import {NextResponse} from "next/server";
import {RegisterSchema} from "@schema";

/**
 * Route: /api/auth/register
 *
 * @param request
 * @constructor
 */
export async function POST(request: Request): Promise<NextResponse>
{
    try
    {
        const registerData: SafeParseReturnType<RegisterData, RegisterData> = RegisterSchema.safeParse(await request.json());

        if (!registerData.success)
        {
            return sendResponse({error: mapError(registerData)}, HttpStatusCode.BadRequest);
        }

        const existingUser: { id: number } | null = await prisma.user.findFirst({
            where:  {
                OR: [
                    {email: registerData.data.email},
                    {pseudonym: registerData.data.pseudonym}
                ]
            },
            select: {id: true}
        });

        if (existingUser)
        {
            return sendResponse({message: "L'email, ou le pseudonym existe déjà."}, HttpStatusCode.BadRequest);
        }

        const hashedPassword: string = await bcrypt.hash(registerData.data.password + process.env.PASSWORD_SECRET!, 14);
        const defaultRole: { id: number } | null = await prisma.role.findUnique({
            where: {name: 'User'},
        });

        if (!defaultRole)
        {
            return sendResponse({message: 'Default role not found'}, HttpStatusCode.InternalServerError);
        }

        const isoCode: string = registerData.data.langue || request.headers.get('Accept-Language')?.split(',')[0].split('-')[0] || 'fr';
        let langue: langue | null = await prisma.langue.findFirst({
            where: {isoCode: isoCode},
        });

        if (!langue)
        {
            langue = await prisma.langue.findUnique({
                where: {name: 'french'},
            });

            if (!langue)
            {
                return sendResponse({message: 'Default language not found'}, HttpStatusCode.InternalServerError);
            }
        }

        const user: UserWithRoles = await prisma.user.create({
            data:    {
                email:     registerData.data.email,
                pseudonym: registerData.data.pseudonym,
                password:  hashedPassword,
                discordId: null,
                langueId:  langue.id,
                roleUsers: {
                    create: {
                        roleId: defaultRole.id,
                    },
                },
            },
            include: {
                roleUsers: {
                    include: {
                        role: true
                    }
                }
            }
        });

        const roles: SimplifyRole[] = user.roleUsers.map((roleUser: { role: role }): SimplifyRole => ({
            name:        roleUser.role.name,
            levelAccess: roleUser.role.levelAccess,
        }));

        const accessToken: string = createJWT({userId: user.id, roles});
        const refreshToken: string = createJWT({userId: user.id}, true, '15d');

        await prisma.refresh_token.create({
            data: {
                token:     refreshToken,
                userId:    user.id,
                expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            },
        });

        return sendResponse({
            message: 'User registered successfully',
            accessToken,
            refreshToken
        }, HttpStatusCode.Created);
    } catch (error)
    {
        logError(error);
        return sendResponse({message: 'Internal server error'}, HttpStatusCode.InternalServerError);
    }
}
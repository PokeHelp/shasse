import {HttpStatusCode} from "axios";
import {sendResponse, createJWT, mapError, logError} from "@utils";
import {LoginData, SimplifyRole, UserWithRoles} from "@types";
import {SafeParseReturnType} from "zod";
import {prisma} from "@lib";
import bcrypt from 'bcrypt';
import {role} from "@prisma/client";
import {NextResponse} from "next/server";
import {LoginSchema} from "@schema";

/**
 * Route: /api/auth/login
 *
 * @param request
 * @constructor
 */
export async function POST(request: Request): Promise<NextResponse>
{
    try
    {
        const loginData: SafeParseReturnType<LoginData, LoginData> = LoginSchema.safeParse(await request.json());

        if (!loginData.success)
        {
            return sendResponse({error: mapError(loginData)}, HttpStatusCode.BadRequest);
        }

        const user: UserWithRoles | null = await prisma.user.findFirst({
            where:   {
                email:  loginData.data.email,
                status: "on"
            },
            include: {
                roleUsers: {
                    include: {
                        role: true
                    },
                },
            },
        });

        if (!user)
        {
            return sendResponse({message: 'Invalid credentials'}, HttpStatusCode.Unauthorized);
        }

        const isValid: boolean = await bcrypt.compare(loginData.data.password + process.env.PASSWORD_SECRET!, user.password);

        if (!isValid)
        {
            return sendResponse({message: 'Invalid credentials'}, HttpStatusCode.Unauthorized);
        }

        const roles: SimplifyRole[] = user.roleUsers.map((roleUser: { role: role }): SimplifyRole => ({
            name:        roleUser.role.name,
            levelAccess: roleUser.role.levelAccess,
        }));

        const accessToken: string = createJWT({userId: user.id, roles});
        const refreshToken: string = createJWT({userId: user.id}, true, '15d');

        await prisma.refresh_token.create({
            data: {
                expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
                token:     refreshToken,
                userId:    user.id
            },
        });

        return sendResponse({accessToken, refreshToken}, HttpStatusCode.Ok);

    } catch (error)
    {
        logError(error);
        return sendResponse({message: 'Internal server error'}, HttpStatusCode.InternalServerError);
    }
}
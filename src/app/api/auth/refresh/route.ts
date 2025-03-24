import {JwtPayload} from 'jsonwebtoken';
import {prisma} from '@lib';
import {SafeParseReturnType} from "zod";
import {RefreshTokenData, SimplifyRole, UserWithRoles} from "@types";
import {createJWT, verifyJWT, mapError, sendResponse, logError} from "@utils";
import {HttpStatusCode} from "axios";
import {role} from "@prisma/client";
import {NextResponse} from "next/server";
import {RefreshTokenSchema} from "@schema";

/**
 * Route: /api/auth/refresh
 *
 * @param request
 * @constructor
 */
export async function POST(request: Request): Promise<NextResponse>
{
    try
    {
        const refreshTokenData: SafeParseReturnType<RefreshTokenData, RefreshTokenData> = RefreshTokenSchema.safeParse(await request.json());

        if (!refreshTokenData.success)
        {
            return sendResponse({error: mapError(refreshTokenData)}, HttpStatusCode.BadRequest);
        }

        const decodedJWT: JwtPayload = verifyJWT(refreshTokenData.data?.refreshToken, true);

        const user: UserWithRoles | null = await prisma.user.findUnique({
            where:   {
                id: decodedJWT.userId
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
            return sendResponse({"message": 'User not found'}, HttpStatusCode.BadRequest);
        }

        const roles: SimplifyRole[] = user.roleUsers.map((roleUser: { role: role }): SimplifyRole => ({
            name:        roleUser.role.name,
            levelAccess: roleUser.role.levelAccess,
        }));

        const accessToken: string = createJWT({userId: user.id, roles});

        return sendResponse({accessToken}, HttpStatusCode.Ok);

    } catch (error)
    {
        logError(error);
        return sendResponse({message: 'Invalid or expired refresh token'}, HttpStatusCode.BadRequest);
    }
}
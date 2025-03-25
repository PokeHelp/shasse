import {prisma} from '@lib';
import {SafeParseReturnType} from "zod";
import {RefreshToken, RefreshTokenData} from "@types";
import {createJWT, verifyJWT, mapError, sendResponse, logError, getLevelAccess} from "@utils";
import {HttpStatusCode} from "axios";
import {user} from "@prisma/client";
import {NextResponse} from "next/server";
import {RefreshTokenDataSchema, RefreshTokenSchema} from "@schema";

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
        const refreshTokenData: SafeParseReturnType<RefreshToken, RefreshToken> = RefreshTokenSchema.safeParse(await request.json());

        if (!refreshTokenData.success)
        {
            return sendResponse({error: mapError(refreshTokenData)}, HttpStatusCode.BadRequest);
        }

        const decodedJWT: SafeParseReturnType<RefreshTokenData, RefreshTokenData> = RefreshTokenDataSchema.safeParse(verifyJWT(refreshTokenData.data.refreshToken, true));

        if (!decodedJWT.success)
        {
            return sendResponse({error: mapError(decodedJWT)}, HttpStatusCode.BadRequest);
        }

        const user: user | null = await prisma.user.findUnique({
            where:   {
                id: decodedJWT.data.userId
            }
        });

        if (!user)
        {
            return sendResponse({"message": 'User not found'}, HttpStatusCode.BadRequest);
        }

        const accessToken: string = createJWT({levelAccess: getLevelAccess(user.role)});

        return sendResponse({accessToken}, HttpStatusCode.Ok);

    } catch (error)
    {
        logError(error);
        return sendResponse({message: 'Invalid refresh token'}, HttpStatusCode.BadRequest);
    }
}
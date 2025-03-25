import jwt, {JwtPayload} from 'jsonwebtoken';
import {verifyJWT, sendResponse, mapError} from "@utils";
import {HttpStatusCode} from "axios";
import {AccessTokenData} from "@types";
import {SafeParseReturnType} from "zod";
import {AccessTokenDataSchema} from "@schema";

export async function authenticate(request: Request, requiredLevelAccess: number): Promise<Response | JwtPayload>
{
    try
    {
        const token: string | undefined = request.headers.get('authorization')?.split(' ')[1];

        if (!token)
        {
            return sendResponse({message: 'No token provided'}, HttpStatusCode.Unauthorized);
        }

        const decodedJWT: SafeParseReturnType<AccessTokenData, AccessTokenData> = AccessTokenDataSchema.safeParse(verifyJWT(token));

        if (!decodedJWT.success)
        {
            return sendResponse({error: mapError(decodedJWT)}, HttpStatusCode.BadRequest);
        }

        if (decodedJWT.data.levelAccess < requiredLevelAccess)
        {
            return sendResponse({message: 'Insufficient permissions'}, HttpStatusCode.Forbidden);
        }

        return decodedJWT;

    } catch (error)
    {
        if (error instanceof jwt.TokenExpiredError)
        {
            return sendResponse({message: 'Token expired'}, HttpStatusCode.BadRequest);
        }

        console.error('Erreur lors de la vérification du token');
        console.error(error);

        return sendResponse({message: 'Invalid token'}, HttpStatusCode.BadRequest);
    }
}

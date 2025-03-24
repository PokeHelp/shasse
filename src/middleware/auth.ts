import jwt, {JwtPayload} from 'jsonwebtoken';
import {verifyJWT, sendResponse} from "@utils";
import {HttpStatusCode} from "axios";
import {SimplifyRole} from "@types";

export async function authenticate(request: Request, requiredLevelAccess: number): Promise<Response | JwtPayload>
{
    try
    {
        const token: string | undefined = request.headers.get('authorization')?.split(' ')[1];

        if (!token)
        {
            return sendResponse({message: 'No token provided'}, HttpStatusCode.Unauthorized);
        }

        const decoded: JwtPayload = verifyJWT(token);
        const hasAccess: boolean = decoded.roles.some((role: SimplifyRole): boolean => role.levelAccess >= requiredLevelAccess);

        if (!hasAccess)
        {
            return sendResponse({message: 'Insufficient permissions'}, HttpStatusCode.Forbidden);
        }

        return decoded;

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

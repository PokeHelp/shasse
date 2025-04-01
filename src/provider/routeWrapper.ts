import {NextResponse} from 'next/server';
import {authenticate} from './auth';
import {JwtPayload} from "jsonwebtoken";
import {role} from "@prisma/client";
import {getLevelAccess} from "@utils";

export function withAuth(handler: (request: Request, authResult: JwtPayload) => Promise<NextResponse>, roleName: role): (request: Request) => Promise<JwtPayload | NextResponse>
{
    return async (request: Request): Promise<JwtPayload | NextResponse> =>
    {
        const authResult: Response | JwtPayload = await authenticate(request, getLevelAccess(roleName));

        if (authResult instanceof Response)
        {
            return authResult;
        }

        return handler(request, authResult);
    };
}
import {NextResponse} from 'next/server';
import {authenticate} from './auth';
import {JwtPayload} from "jsonwebtoken";

export function withAuth(handler: (request: Request, authResult: JwtPayload) => Promise<NextResponse>, requiredLevelAccess: number): (request: Request) => Promise<JwtPayload | NextResponse>
{
    return async (request: Request): Promise<JwtPayload | NextResponse> =>
    {
        const authResult: Response | JwtPayload = await authenticate(request, requiredLevelAccess);

        if (authResult instanceof Response)
        {
            return authResult;
        }

        return handler(request, authResult);
    };
}
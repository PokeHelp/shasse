import {NextResponse} from 'next/server';
import {authenticate} from './auth';
import {JwtPayload} from "jsonwebtoken";
import {role} from "@prisma/client";
import {getLevelAccess, sendResponse} from "@utils";
import {HttpStatusCode} from "axios";

export function withAuth(handler: (request: Request, authResult: JwtPayload) => Promise<NextResponse>, roleName: role): (request: Request) => Promise<NextResponse>
{
    return async (request: Request): Promise<NextResponse> =>
    {
        const authResult: Response | JwtPayload = await authenticate(request, getLevelAccess(roleName));

        if (authResult instanceof Response)
        {

            return sendResponse(authResult, HttpStatusCode.Unauthorized)
        }

        return handler(request, authResult);
    };
}
import {withAuth} from '@provider';
import {JwtPayload} from "jsonwebtoken";
import {sendResponse} from "@utils";
import {HttpStatusCode} from "axios";
import {NextResponse} from "next/server";
import {role} from "@prisma/client";

/**
 * Route utilisée pour faire un test de sécurité
 *
 * @param request
 * @param jwt
 */
async function handler(request: Request, jwt: JwtPayload): Promise<NextResponse>
{
    return sendResponse({message: 'Protected route accessed', jwt}, HttpStatusCode.Ok);
}

export const GET: (request: Request) => Promise<NextResponse | JwtPayload> = withAuth(handler, role.PUBLIC);
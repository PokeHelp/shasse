import {JwtPayload} from "jsonwebtoken";
import {NextResponse} from "next/server";
import {sendResponse} from "@utils";
import {HttpStatusCode} from "axios";
import {withAuth} from "@provider";
import {role} from "@prisma/client";

async function handlerPost(request: Request, jwt: JwtPayload): Promise<NextResponse>
{
    return sendResponse({message: 'Protected route accessed', jwt}, HttpStatusCode.Ok);
}

export const POST: (request: Request) => Promise<NextResponse> = withAuth(handlerPost, role.PUBLIC);
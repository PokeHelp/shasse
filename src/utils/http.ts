import {HttpStatusCode} from "axios";
import {NextResponse} from "next/server";

/**
 * Permet d'envoyer une réponse http
 *
 * @param message
 * @param status
 */
function sendResponse<T extends object = object>(message: T, status: HttpStatusCode): NextResponse<T>
{
    if (status === HttpStatusCode.NoContent) {
        return new NextResponse(null, { status }) as NextResponse<T>;
    }

    return NextResponse.json(message, {status: status});
}

export {sendResponse};
import {HttpStatusCode} from "axios";
import {NextResponse} from "next/server";

/**
 * Permet d'envoyer une réponses http
 *
 * @param message
 * @param status
 */
function sendResponse<T extends object = object>(message: T, status: HttpStatusCode): NextResponse<T>
{
    return NextResponse.json(message, {status: status});
}

export {sendResponse};
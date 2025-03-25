import {HttpStatusCode} from "axios";
import {NextResponse} from "next/server";

/**
 * Permet d'envoyer une réponses http
 *
 * @param message
 * @param status
 */
function sendResponse(message: object, status: HttpStatusCode): NextResponse
{
    return NextResponse.json(message, {status: status});
}

export {sendResponse};
import {NextResponse} from "next/server";
import {sendResponse} from "@utils";
import {HttpStatusCode} from "axios";
import {GenerationResponse} from "@types";
import {getAllGeneration} from "@query";

export async function GET(): Promise<NextResponse<GenerationResponse>>
{
    try
    {
        return sendResponse({success: true, data: (await getAllGeneration({id: true}))}, HttpStatusCode.Ok);
    } catch (e)
    {
        console.log(e)
        return sendResponse({success: false, error: 'Generic error'}, HttpStatusCode.InternalServerError);
    }
}
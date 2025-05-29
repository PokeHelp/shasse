import {NextResponse} from "next/server";
import {sendResponse} from "@utils";
import {getAllTypeWithTranslation} from "@service";
import {HttpStatusCode} from "axios";
import {TypesResponse} from "@types";

export async function GET(): Promise<NextResponse<TypesResponse>>
{
    try
    {
        return sendResponse({success: true, data: (await getAllTypeWithTranslation())}, HttpStatusCode.Ok);
    } catch (e)
    {
        console.log(e)
        return sendResponse({success: false, error: 'Generic error'}, HttpStatusCode.InternalServerError);
    }
}
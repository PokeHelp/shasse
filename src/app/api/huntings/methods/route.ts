import {NextResponse} from "next/server";
import {HuntingMethodsResponse} from "@types";
import {sendResponse} from "@utils";
import {HttpStatusCode} from "axios";
import {getAllHuntingMethods} from "@query";

export async function GET(): Promise<NextResponse<HuntingMethodsResponse>>
{
    try
    {
        return sendResponse({
            success: true,
            data: (await getAllHuntingMethods())
        }, HttpStatusCode.Ok);
    } catch (e)
    {
        console.log(e)
        return sendResponse({success: false, error: 'Generic error'}, HttpStatusCode.InternalServerError);
    }
}
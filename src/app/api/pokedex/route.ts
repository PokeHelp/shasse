import {sendResponse} from '@utils';
import {HttpStatusCode} from "axios";
import {getPokemonFormPokedex} from "@service";
import {PokedexResponse} from "@types";
import {NextResponse} from "next/server";

export async function GET(): Promise<NextResponse<PokedexResponse>>
{
    try
    {
        return sendResponse({success: true, data: (await getPokemonFormPokedex())}, HttpStatusCode.Ok);
    } catch (e)
    {
        console.log(e)
        return sendResponse({success: false, error: 'Generic error'}, HttpStatusCode.InternalServerError);
    }
}
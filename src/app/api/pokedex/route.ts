import {mapError, sendResponse} from '@utils';
import {HttpStatusCode} from "axios";
import {getPokemonFormPokedex} from "@service";
import {PokedexResponse} from "@types";
import {type NextRequest, NextResponse} from "next/server";
import {SafeParseReturnType} from "zod";
import {numberSchema} from "@schema";

export async function GET(request: NextRequest): Promise<NextResponse<PokedexResponse>>
{
    try
    {
        let formId: number | null = null;

        if (request.nextUrl.searchParams.has('formId'))
        {
            const idFormPassed: SafeParseReturnType<string, number> = numberSchema.safeParse(request.nextUrl.searchParams.get('formId'));
            if (!idFormPassed.success)
            {
                return sendResponse({success: false, error: mapError(idFormPassed)}, HttpStatusCode.BadRequest);
            } else
            {
                formId = idFormPassed.data;
            }
        }

        return sendResponse({success: true, data: (await getPokemonFormPokedex(formId))}, HttpStatusCode.Ok);
    } catch (e)
    {
        console.log(e)
        return sendResponse({success: false, error: 'Generic error'}, HttpStatusCode.InternalServerError);
    }
}
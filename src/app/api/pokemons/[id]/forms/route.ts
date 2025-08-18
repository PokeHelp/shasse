import {mapError, sendResponse} from '@utils';
import {HttpStatusCode} from "axios";
import {NextResponse} from "next/server";
import {numberSchema} from "@schema";
import {SafeParseReturnType} from "zod";
import {getAllPokemonForm} from "@service";
import {type NextRequest} from 'next/server'
import {FormWithNamesResponse} from "@types";

export async function GET(_: NextRequest, {params}: {params: Promise<{ id: string}>}): Promise<NextResponse<FormWithNamesResponse>>
{
    try
    {
        const {id} = await params;

        const idPassed: SafeParseReturnType<string, number> = numberSchema.safeParse(id);
        if (!idPassed.success)
        {
            return sendResponse({success: false, error: mapError(idPassed)}, HttpStatusCode.BadRequest);
        }

        return sendResponse({
            success: true,
            data:    (await getAllPokemonForm(idPassed.data))
        }, HttpStatusCode.Ok);
    } catch (e)
    {
        console.log(e)
        return sendResponse({success: false, error: 'Generic error'}, HttpStatusCode.InternalServerError);
    }
}
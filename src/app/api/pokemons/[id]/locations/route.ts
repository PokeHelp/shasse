import {mapError, sendResponse} from '@utils';
import {HttpStatusCode} from "axios";
import {NextRequest, NextResponse} from "next/server";
import {numberSchema} from "@schema";
import {SafeParseReturnType} from "zod";
import {getPokemonGenerationLocation} from "@service";
import {normalForm} from "@config";
import {LocationGeneration, LocationGenerationsResponse} from "@types";

export async function GET(request: NextRequest, {params}: {params: Promise<{ id: string}>}): Promise<NextResponse<LocationGenerationsResponse>>
{
    try
    {
        let gameId: number | null = null;
        let formId: number | null = normalForm;
        const shinyLocation: boolean = request.nextUrl.searchParams.has('shinyLocation');
        const {id} = await params;

        const idPassed: SafeParseReturnType<string, number> = numberSchema.safeParse(id);
        if (!idPassed.success)
        {
            return sendResponse({success: false, error: mapError(idPassed)}, HttpStatusCode.BadRequest);
        }

        if (request.nextUrl.searchParams.has('gameId'))
        {
            const idGamePassed: SafeParseReturnType<string, number> = numberSchema.safeParse(request.nextUrl.searchParams.get('gameId'));
            if (!idGamePassed.success)
            {
                return sendResponse({success: false, error: mapError(idGamePassed)}, HttpStatusCode.BadRequest);
            } else
            {
                gameId = idGamePassed.data;
            }
        }

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

        const pokemonGameLocation: LocationGeneration[] = await getPokemonGenerationLocation(idPassed.data, formId, gameId, shinyLocation);
        const statusCode: HttpStatusCode = pokemonGameLocation.length === 0 ? HttpStatusCode.NoContent : HttpStatusCode.Ok;

        return sendResponse({success: true, data: pokemonGameLocation}, statusCode);
    } catch (e)
    {
        console.log(e)
        return sendResponse({success: false, error: 'Generic error'}, HttpStatusCode.InternalServerError);
    }
}
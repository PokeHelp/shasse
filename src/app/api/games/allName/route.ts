import {Translation, TranslationIdNames, TranslationIdNamesResponse} from "@types";
import {mapError, sendResponse} from "@utils";
import {HttpStatusCode} from "axios";
import {NextRequest, NextResponse} from "next/server";
import {getAllGameIdNameByPokemon} from "@service";
import {getTranslations} from "next-intl/server";
import {reference_table} from "@prisma/client";
import {SafeParseReturnType} from "zod";
import {numberSchema} from "@schema";

export async function GET(request: NextRequest): Promise<NextResponse<TranslationIdNamesResponse>>
{
    const t: Translation = await getTranslations('api');
    const searchParams: URLSearchParams = request.nextUrl.searchParams;

    try
    {
        const pokemonId: string | null = searchParams.get('pokemonId');
        let pokemonIdPassed: SafeParseReturnType<string, number> | null = null;

        if (pokemonId)
        {
            pokemonIdPassed = numberSchema.safeParse(pokemonId);
            if (!pokemonIdPassed.success)
            {
                return sendResponse({success: false, error: mapError(pokemonIdPassed)}, HttpStatusCode.BadRequest);
            }
        }

        const gameNames: TranslationIdNames[] = await getAllGameIdNameByPokemon(pokemonIdPassed ? pokemonIdPassed.data : null);

        if (gameNames.length === 0)
        {
            return sendResponse({success: false, error: t('anyGameNameFound')}, HttpStatusCode.NoContent);
        }

        return sendResponse({success: true, data: gameNames}, HttpStatusCode.Ok);

    } catch (e)
    {
        console.log(e)
        return sendResponse({success: false, error: t('base')}, HttpStatusCode.InternalServerError);
    }
}
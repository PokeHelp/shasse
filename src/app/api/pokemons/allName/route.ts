import {TranslationIdNames, TranslationIdNamesResponse} from "@types";
import {sendResponse} from "@utils";
import {HttpStatusCode} from "axios";
import {NextResponse} from "next/server";
import {getAllIdName} from "@service";
import {getTranslations} from "next-intl/server";
import {reference_table} from "@prisma/client";

export async function GET(): Promise<NextResponse<TranslationIdNamesResponse>>
{
    const t = await getTranslations('api');

    try
    {
        const pokemonNames: TranslationIdNames[] = await getAllIdName(reference_table.POKEMON);

        if (pokemonNames.length === 0)
        {
            return sendResponse({success: false, error: t('anyPokemonNameFound')}, HttpStatusCode.NoContent);
        }

        return sendResponse({success: true, data: pokemonNames}, HttpStatusCode.Ok);

    } catch (e)
    {
        console.log(e)
        return sendResponse({success: false, error: t('base')}, HttpStatusCode.InternalServerError);
    }
}
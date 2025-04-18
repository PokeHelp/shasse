import {mapError, sendResponse} from '@utils';
import {HttpStatusCode} from "axios";
import {NextResponse} from "next/server";
import {numberSchema} from "@schema";
import {SafeParseReturnType} from "zod";
import {getPokemonAbilityWithTranslation} from "@service";
import {type NextRequest} from 'next/server'
import {AbilityGenerationResponse} from "@types";

export async function GET(request: NextRequest, {params}: {
    params: Promise<{ id: string, generationId?: string | null }>
}): Promise<NextResponse<AbilityGenerationResponse>>
{
    try
    {
        const {id} = await params;
        let generationId: number | null = null;

        const idPassed: SafeParseReturnType<string, number> = numberSchema.safeParse(id);
        if (!idPassed.success)
        {
            return sendResponse({success: false, error: mapError(idPassed)}, HttpStatusCode.BadRequest);
        }

        if (request.nextUrl.searchParams.has('generationId'))
        {
            const idGenPassed: SafeParseReturnType<string, number> = numberSchema.safeParse(request.nextUrl.searchParams.get('generationId'));
            if (!idGenPassed.success)
            {
                return sendResponse({success: false, error: mapError(idGenPassed)}, HttpStatusCode.BadRequest);
            } else
            {
                generationId = idGenPassed.data;
            }
        }

        return sendResponse({
            success: true,
            data:    (await getPokemonAbilityWithTranslation(idPassed.data, generationId))
        }, HttpStatusCode.Ok);
    } catch (e)
    {
        console.log(e)
        return sendResponse({success: false, error: 'Generic error'}, HttpStatusCode.InternalServerError);
    }
}
import {mapError, sendResponse} from '@utils';
import {HttpStatusCode} from "axios";
import {NextRequest, NextResponse} from "next/server";
import {numberSchema} from "@schema";
import {SafeParseReturnType} from "zod";
import {getDetail} from "@service";
import {GroupedPokemonInfoDetail, GroupedPokemonInfoDetailResponse} from "@types";

export async function GET(request: NextRequest, {params}: {
    params: Promise<{ id: string }>
}): Promise<NextResponse<GroupedPokemonInfoDetailResponse>>
{
    try
    {
        const {id} = await params;
        const idPassed: SafeParseReturnType<string, number> = numberSchema.safeParse(id);
        let generationId: number | null = null;
        let formId: number | null = null;
        const lastGeneration: boolean = request.nextUrl.searchParams.has('lastGeneration');

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

        const pokemon: GroupedPokemonInfoDetail = await getDetail(idPassed.data, lastGeneration, generationId, null, formId ?? 1,
            {
                forms:           request.nextUrl.searchParams.has('forms'),
                eggGroups:       request.nextUrl.searchParams.has('eggGroups'),
                statistics:      request.nextUrl.searchParams.has('statistics'),
                types:           request.nextUrl.searchParams.has('types'),
                abilities:       request.nextUrl.searchParams.has('abilities'),
                nationalNumbers: request.nextUrl.searchParams.has('nationalNumbers'),
                capacities:      request.nextUrl.searchParams.has('capacities'),
                locations:       request.nextUrl.searchParams.has('locations'),
                onlyShassable:   request.nextUrl.searchParams.has('onlyShassable'),
                evolutions:      request.nextUrl.searchParams.has('evolutions'),
                regionalForm:    request.nextUrl.searchParams.has('regionnalForms')
            });
        if (pokemon === undefined)
        {
            return sendResponse({success: false, error: "La donnée demandée existe pas."}, HttpStatusCode.BadRequest);
        }

        return sendResponse({success: true, data: pokemon}, HttpStatusCode.Ok);
    } catch (e)
    {
        console.log(e)
        return sendResponse({success: false, error: 'Generic error'}, HttpStatusCode.InternalServerError);
    }
}
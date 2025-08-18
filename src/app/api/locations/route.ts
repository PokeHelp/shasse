import {NextRequest, NextResponse} from "next/server";
import {SafeParseReturnType} from "zod";
import {numberSchema} from "@schema";
import {mapError, sendResponse} from "@utils";
import {HttpStatusCode} from "axios";
import {GameLocationNameResponse} from "@types";
import {getGameLocation} from "@service";

export async function GET(req: NextRequest): Promise<NextResponse<GameLocationNameResponse>>
{
    try
    {
        const {searchParams} = new URL(req.url);

        const gameParamId: string | null = searchParams.get("gameId") ?? null;
        const pokemonParamId: string | null = searchParams.get("pokemonId") ?? null;
        const formParamId: string | null = searchParams.get("formId") ?? null;

        let gameId: number | null = null;
        let pokemonId: number | null = null;
        let formId: number | null = null;

        if (gameParamId !== null)
        {
            const gameIdPassed: SafeParseReturnType<string, number> = numberSchema.safeParse(gameParamId);
            if (!gameIdPassed.success)
            {
                return sendResponse({success: false, error: mapError(gameIdPassed)}, HttpStatusCode.BadRequest);
            }
            gameId = gameIdPassed.data;
        }

        if (pokemonParamId !== null)
        {
            const pokemonIdPassed: SafeParseReturnType<string, number> = numberSchema.safeParse(pokemonParamId);
            if (!pokemonIdPassed.success)
            {
                return sendResponse({success: false, error: mapError(pokemonIdPassed)}, HttpStatusCode.BadRequest);
            }
            pokemonId = pokemonIdPassed.data;
        }

        if (formParamId !== null)
        {
            const formIdPassed: SafeParseReturnType<string, number> = numberSchema.safeParse(formParamId);
            if (!formIdPassed.success)
            {
                return sendResponse({success: false, error: mapError(formIdPassed)}, HttpStatusCode.BadRequest);
            }
            formId = formIdPassed.data;
        }

        return sendResponse({
            success: true,
            data: (await getGameLocation(pokemonId, gameId, formId))
        }, HttpStatusCode.Ok)

    } catch (e)
    {
        console.log(e)
        return sendResponse({success: false, error: 'Generic error'}, HttpStatusCode.InternalServerError);
    }
}
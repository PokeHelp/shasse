import {NextResponse} from "next/server";
import {mapError, sendResponse} from "@utils";
import {HttpStatusCode} from "axios";
import {CreateHuntingResponse, User} from "@types";
import {getRequiredUser} from "@src/lib/auth-server";
import {CreateHuntingSchema} from "@schema";
import {createOwnedPokemon} from "@service";

export async function POST(req: Request): Promise<NextResponse<CreateHuntingResponse>>
{

    try
    {
        const user: User = await getRequiredUser();

        const data = await req.json();
        const dataPassed = CreateHuntingSchema.safeParse(data);
        if (!dataPassed.success)
        {
            return sendResponse({success: false, error: mapError(dataPassed)}, HttpStatusCode.BadRequest);
        }

        return sendResponse({
            success: true,
            data:    {
                ownedId: Number((await createOwnedPokemon(dataPassed.data, user.id)).id)
            }
        }, HttpStatusCode.Ok);
    } catch (e)
    {
        console.log(e)
        return sendResponse({success: false, error: 'Generic error'}, HttpStatusCode.InternalServerError);
    }
}
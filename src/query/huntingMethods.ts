import {prisma} from "@lib";
import {reference_table} from "@prisma/client";
import {HuntingMethods} from "@types";

export async function getAllHuntingMethods(langId: number = 2): Promise<HuntingMethods[]>
{
    interface MethodsRaw
    {
        id: bigint;
        name: string;
        canBeShiny: boolean;
    }

    const raw: MethodsRaw[] = await prisma.$queryRaw<MethodsRaw[]>`
        WITH translation_methods as (SELECT name, reference_id
                                     FROM translation
                                     WHERE reference_table = ${reference_table.HUNTING_METHOD}
                                       AND status = 'on'
                                       AND langue_id = ${langId})

        SELECT id, name, can_be_shiny
        FROM hunting_method hm
                 JOIN translation_methods tm ON hm.id = tm.reference_id;`;

    return raw.map((raw: MethodsRaw): HuntingMethods => ({
        id: Number(raw.id),
        name: raw.name
    }));
}
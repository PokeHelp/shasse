import {prisma} from "@lib";
import {reference_table} from "@prisma/client";
import {TranslationIdNames} from "@types";

export async function getAllPokeball(): Promise<TranslationIdNames[]>
{
    interface RawQuery
    {
        id: bigint;
        name: string;
    }

    const rawQuery: RawQuery[] = await prisma.$queryRaw<RawQuery[]>`
        SELECT p.id, t.name
        FROM pokeball p
                 JOIN translation t ON t.reference_id = p.id AND t.langue_id = 1 AND
                                       t.reference_table = ${reference_table.POKEBALL} AND
                                       t.status = 'on'
        WHERE p.status = 'on';
    `;

    return rawQuery.map((raw: RawQuery): TranslationIdNames => ({
        id: Number(raw.id),
        name: raw.name
    }));
}
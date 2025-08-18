import {Prisma, reference_table} from "@prisma/client";
import {prisma} from "@lib";

export async function getGameFiltered(pokemonId: number | null, langId: number): Promise<{ name: string, referenceId: bigint }[]>
{
    interface GameRaw
    {
        reference_id: bigint;
        name: string;
    }

    const raw: GameRaw[] = await prisma.$queryRaw<GameRaw[]>`
        WITH translation_game as (SELECT name, reference_id
                                  FROM translation
                                  WHERE reference_table = ${reference_table.GAME}
                                    AND status = 'on'
                                    AND langue_id = ${langId})

        SELECT DISTINCT tg.reference_id, tg.name
        FROM pokemon_game_location as pgl
                 INNER JOIN translation_game as tg ON pgl.game_id = tg.reference_id
            ${pokemonId ? Prisma.sql`
                INNER JOIN pokemon_form pf ON pf.id = pgl.pokemon_form_id AND pf.status = 'on'
        WHERE pf.pokemon_id = ${pokemonId} ` : Prisma.empty};
    `;

    return raw.map((raw: GameRaw): { name: string, referenceId: bigint } => ({
        name: raw.name,
        referenceId: raw.reference_id
    }))
}
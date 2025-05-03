import {prisma} from "@lib";
import {NationalNumberGeneration} from "@types";
import {Prisma, reference_table} from "@prisma/client";

export async function getNationalNumber(pokemonId: number, generationId: number | null, langId: number): Promise<NationalNumberGeneration[]>
{
    interface RawQueryResults extends Omit<NationalNumberGeneration, 'generationId' | 'groupGameName'>
    {
        name: string;
        generation_id: bigint;
    }

    console.log(pokemonId, generationId, langId);

    const rawResults: RawQueryResults[] = await prisma.$queryRaw<RawQueryResults[]>`
        SELECT DISTINCT nn.number, t.name, g.generation_id
        FROM national_number nn
                 INNER JOIN translation t ON t.reference_id = nn.group_game_id AND t.status = 'on' AND
                                             t.reference_table = ${reference_table.GROUP_GAME} AND t.langue_id = ${langId}
                 INNER JOIN group_game gg ON nn.group_game_id = gg.id AND gg.status = 'on'
                 INNER JOIN game_group_game ggg ON gg.id = ggg.group_game_id
                 INNER JOIN game g ON g.id = ggg.game_id AND g.status = 'on'
            ${generationId ? Prisma.sql`AND g.generation_id = ${generationId}` : Prisma.empty}
        WHERE nn.pokemon_id = ${pokemonId}
    `;

    return rawResults.map((raw: RawQueryResults): NationalNumberGeneration => ({
        number:        raw.number,
        groupGameName: raw.name,
        generationId:  Number(raw.generation_id)
    }));
}
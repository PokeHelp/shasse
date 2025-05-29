import {StatisticGeneration} from "@types";
import {prisma} from "@lib";
import {Prisma} from "@prisma/client";

export async function getPokemonStatisticWithName(pokemonId: number, generationId?: number | null): Promise<StatisticGeneration[]>
{
    interface RawQueryStatisticGeneration extends Omit<StatisticGeneration, 'id' | 'generationId' | 'specialDefense' | 'specialAttack'>
    {
        id: bigint;
        generation_id: bigint;
        special_attack: number;
        special_defense: number;
    }

    const rawResults: RawQueryStatisticGeneration[] = await prisma.$queryRaw`
        SELECT DISTINCT s.id,
                        g.generation_id,
                        s.pv,
                        s.attack,
                        s.defense,
                        s.special_attack,
                        s.special_defense,
                        s.special,
                        s.speed
        FROM pokemon p
                 JOIN statistic_group_game sgg ON sgg.pokemon_id = p.id
                 JOIN group_game gg ON gg.id = sgg.group_game_id AND gg.status = 'on'
                 JOIN game_group_game ggg ON ggg.group_game_id = gg.id
                 JOIN game g ON ggg.game_id = g.id AND g.status = 'on' ${generationId ? Prisma.sql`AND g.generation_id = ${generationId}` : Prisma.empty}
                 JOIN statistic s
        ON s.id = sgg.statistic_id AND s.status = 'on'
        WHERE p.status = 'on' AND p.id = ${pokemonId};
    `;

    return rawResults.map(row => ({
        id:             Number(row.id),
        generationId:   Number(row.generation_id),
        pv:             row.pv,
        attack:         row.attack,
        defense:        row.defense,
        specialAttack:  row.special_attack,
        specialDefense: row.special_defense,
        special:        row.special,
        speed:          row.speed
    }));
}
import {prisma} from "@lib";
import {Prisma, reference_table} from "@prisma/client";
import {LocationGeneration} from "@types";

export async function getLocationWithName(pokemonId: number | null, generationId: number | null, langId: number, onlyShassable: boolean = false, formId: number | null = null, gameId: number | null = null): Promise<LocationGeneration[]>
{
    interface RawQueryResults extends Omit<LocationGeneration, 'generationId' | 'minLevel' | 'maxLevel' | 'locationName' | 'conditionName' | 'detailName' | 'isAlpha' | 'meteoName' | 'obtationName' | 'zoneName' | 'isShassable'>
    {
        generation_id: bigint;
        min_level: number;
        max_level: number;
        location_name: string;
        condition_name: string;
        detail_name: string;
        is_alpha: boolean;
        meteo_name: string;
        obtation_name: string;
        zone_name: string;
        obtation_id: number;
        game_name: string;
    }

    console.log('_______________________HERE___________________________')
    console.log(langId, generationId, gameId, onlyShassable, pokemonId, formId)


    const rawResults: RawQueryResults[] = await prisma.$queryRaw<RawQueryResults[]>`
        WITH translations AS (SELECT *
                              FROM translation
                              WHERE status = 'on'
                                AND langue_id IN (2, ${langId})),
             active_games AS (SELECT *
                              FROM game
                              WHERE status = 'on'
            ${generationId ? Prisma.sql`AND generation_id = ${generationId}` : Prisma.empty}
            ${gameId ? Prisma.sql`AND id = ${gameId}` : Prisma.empty}
            ), active_forms AS (
        SELECT *
        FROM pokemon_form
        WHERE status = 'on')
            , active_pgl AS (
        SELECT *
        FROM pokemon_game_location
            ${onlyShassable ? Prisma.sql`WHERE pokemon_obtation_id != 1` : Prisma.empty}), active_rate AS (
        SELECT *
        FROM rate
        WHERE status = 'on')

        SELECT DISTINCT tpo.name AS obtation_name,
                        g.generation_id,
                        tz.name  AS zone_name,
                        tl.name  AS location_name,
                        r.rate,
                        r.min_level,
                        r.max_level,
                        r.limit,
                        r.is_alpha,
                        po.id    AS obtation_id,
                        tm.name  AS meteo_name,
                        td.name  AS detail_name,
                        tc.name  AS condition_name,
                        tg.name  AS game_name

        FROM active_forms pf
                 JOIN active_pgl pgl ON pgl.pokemon_form_id = pf.pokemon_id
                 JOIN active_games g ON g.id = pgl.game_id
                 JOIN active_rate r ON r.id = pgl.rate_id
                 JOIN pokemon_obtation po ON po.id = pgl.pokemon_obtation_id AND po.status = 'on'
                 JOIN location_zone lz ON lz.id = pgl.location_zone_id AND lz.status = 'on'
                 JOIN zone z ON z.id = lz.zone_id AND z.status = 'on'
                 JOIN location l ON l.id = lz.location_id AND l.status = 'on'
                 JOIN meteo m ON m.id = r.meteo_id AND m.status = 'on'
                 JOIN detail d1 ON d1.id = r.detail_rate_id AND d1.status = 'on'
                 JOIN detail d2 ON d2.id = r.condition_rate_id AND d2.status = 'on'

                 LEFT JOIN translations tpo ON tpo.reference_id = pgl.pokemon_obtation_id AND tpo.langue_id = 2 AND
                                               tpo.reference_table = ${reference_table.POKEMON_OBTENTION}
                 LEFT JOIN translations tz ON tz.reference_id = lz.zone_id AND tz.langue_id = ${langId} AND
                                              tz.reference_table = ${reference_table.ZONE}
                 LEFT JOIN translations tl ON tl.reference_id = lz.location_id AND tl.langue_id = ${langId} AND
                                              tl.reference_table = ${reference_table.LOCATION}
                 LEFT JOIN translations tm ON tm.reference_id = r.meteo_id AND tm.langue_id = 2 AND
                                              tm.reference_table = ${reference_table.METEO}
                 LEFT JOIN translations td ON td.reference_id = r.detail_rate_id AND td.langue_id = ${langId} AND
                                              td.reference_table = ${reference_table.DETAIL}
                 LEFT JOIN translations tc ON tc.reference_id = r.condition_rate_id AND tc.langue_id = ${langId} AND
                                              tc.reference_table = ${reference_table.DETAIL}
                 LEFT JOIN translations tg ON tg.reference_id = g.id AND tg.langue_id = ${langId} AND
                                              tg.reference_table = ${reference_table.GAME}

        WHERE ${pokemonId ? Prisma.sql`pf.pokemon_id = ${pokemonId}` : Prisma.empty} ${(formId && pokemonId) ? Prisma.sql` AND ` : Prisma.empty} ${formId ? Prisma.sql`pf.form_id = ${formId}` : Prisma.empty}
    `;

    return rawResults.map((raw: RawQueryResults): LocationGeneration => ({
        minLevel:      raw.min_level,
        meteoName:     raw.meteo_name,
        isAlpha:       raw.is_alpha,
        detailName:    raw.detail_name,
        locationName:  raw.location_name,
        conditionName: raw.condition_name,
        obtationName:  raw.obtation_name,
        maxLevel:      raw.max_level,
        generationId:  Number(raw.generation_id),
        zoneName:      raw.zone_name,
        limit:         raw.limit,
        rate:          raw.rate,
        isShassable:   raw.obtation_id != 1,
        gameName:      raw.game_name
    }))
}

export async function getPokemonGameLocation(pokemonId: number | null, formId: number, gameId: number | null)
{
    return prisma.pokemon_game_location.findMany({
        where:  {
            pokemonForm: {
                ...(pokemonId && {pokemonId: pokemonId}),
                formId:    formId,
            },
            ...(gameId && {gameId: gameId}),
        },
        select: {
            id: true
        },
    })
}
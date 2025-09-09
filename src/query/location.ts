import {prisma} from "@lib";
import {Prisma, reference_table} from "@prisma/client";
import {GameLocationName, LocationGeneration} from "@types";

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
                 JOIN pokemon_obtation po ON po.id = pgl.hunting_method_id AND po.status = 'on'
                 JOIN location_zone lz ON lz.id = pgl.location_zone_id AND lz.status = 'on'
                 JOIN zone z ON z.id = lz.zone_id AND z.status = 'on'
                 JOIN location l ON l.id = lz.location_id AND l.status = 'on'
                 JOIN meteo m ON m.id = r.meteo_id AND m.status = 'on'
                 JOIN detail d1 ON d1.id = r.detail_rate_id AND d1.status = 'on'
                 JOIN detail d2 ON d2.id = r.condition_rate_id AND d2.status = 'on'

                 LEFT JOIN translations tpo ON tpo.reference_id = pgl.hunting_method_id AND tpo.langue_id = 2 AND
                                               tpo.reference_table = ${reference_table.HUNTING_METHOD}
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

export async function getPokemonGameLocation(pokemonId: number | null, formId: number | null, gameId: number | null):Promise<{id: number}[]>
{
    return prisma.pokemon_game_location.findMany({
        where:  {
            pokemonForm: {
                ...(pokemonId && {pokemonId: pokemonId}),
                ...(formId && {formId: formId}),
            },
            ...(gameId && {gameId: gameId}),
        },
        select: {
            id: true
        },
    })
}

export async function getPokemonGameLocationName(pokemonId: number | null, formId: number | null, gameId: number | null): Promise<GameLocationName[]>
{
    interface Raw {
        game_id: bigint;
        game_name: string;
        rate_id: bigint;
        rate: number;
        min_level: number;
        max_level: number;
        limit: number;
        meteo_id: bigint;
        meteo_name: string;
        detail_rate_id: bigint;
        detail_name: string;
        condition_rate_id: bigint;
        condition_name: string;
        is_alpha: boolean;
        hunting_method_id: bigint;
        hunting_method_name: string;
        id: bigint;
    }

    const raw: Raw[] = await prisma.$queryRaw<Raw[]>`
        WITH tg AS (SELECT name, reference_id
                    FROM translation
                    WHERE status = 'on' AND langue_id = 1
                      AND reference_table = ${reference_table.GAME}
                    ${gameId !== null ? Prisma.sql` AND reference_id = ${gameId}` : Prisma.empty}
                    ),
             thm as (SELECT name, reference_id
                     FROM translation
                     WHERE status = 'on' AND langue_id = 2 AND reference_table = ${reference_table.HUNTING_METHOD}),
             tm as (SELECT name, reference_id
                    FROM translation
                    WHERE status = 'on' AND langue_id = 2 AND reference_table = ${reference_table.METEO}),
             td as (SELECT name, reference_id
                    FROM translation
                    WHERE status = 'on' AND langue_id = 1 AND reference_table = ${reference_table.DETAIL}),
             pgl as (SELECT pokemon_game_location.*
                     FROM pokemon_game_location
                              JOIN pokemon_form pf ON pokemon_game_location.pokemon_form_id = pf.id
                     WHERE pf.status = 'on'
                        ${pokemonId !== null ? Prisma.sql` AND pf.pokemon_id = ${pokemonId}` : Prisma.empty}
                        ${formId !== null ? Prisma.sql` AND pf.form_id = ${formId}` : Prisma.empty}
                        ${gameId !== null ? Prisma.sql` AND pokemon_game_location.game_id = ${gameId}` : Prisma.empty}
            ),
             d as (SELECT id FROM detail WHERE status = 'on')

        SELECT pgl.game_id,
               tg.name as game_name,
               pgl.rate_id,
               r.rate,
               r.min_level,
               r.max_level,
               r.limit,
               r.meteo_id,
               tm.name as meteo_name,
               r.detail_rate_id,
               tdd.name as detail_name,
               r.condition_rate_id,
               tdc.name as condition_name,
               r.is_alpha,
               pgl.hunting_method_id,
               thm.name as hunting_method_name,
               pgl.id
        FROM pgl
                 JOIN tg ON pgl.game_id = tg.reference_id
                 JOIN thm ON pgl.hunting_method_id = thm.reference_id
                 JOIN rate r ON pgl.rate_id = r.id AND r.status = 'on'
                 JOIN tm ON r.meteo_id = tm.reference_id
                 JOIN d dd ON r.detail_rate_id = dd.id
                 JOIN td tdd ON dd.id = tdd.reference_id
                 JOIN d dc ON r.condition_rate_id = dc.id
                 JOIN td tdc ON dc.id = tdc.reference_id;
    `;

    return raw.map((raw: Raw): GameLocationName => ({
        gameId: Number(raw.game_id),
        conditionName: raw.condition_name,
        detailRateId: Number(raw.detail_rate_id),
        huntingMethodName: raw.hunting_method_name,
        gameName: raw.game_name,
        detailName: raw.detail_name,
        maxLevel: raw.max_level,
        meteoName: raw.meteo_name,
        rate: raw.rate,
        conditionRateId: Number(raw.condition_rate_id),
        limit: raw.limit,
        isAlpha: raw.is_alpha,
        huntingMethodId: Number(raw.hunting_method_id),
        meteoId: Number(raw.meteo_id),
        minLevel: raw.min_level,
        rateId: Number(raw.rate_id),
        id: Number(raw.id)
    }))
}
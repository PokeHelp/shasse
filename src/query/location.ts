import {prisma} from "@lib";
import {Prisma, reference_table} from "@prisma/client";
import {LocationGeneration} from "@types";

export async function getLocationWithName(pokemonId: number, generationId: number | null, langId: number, formId: number = 1): Promise<LocationGeneration[]> // TODO: Chnager pour la gestion des formes
{
    interface RawQueryResults extends Omit<LocationGeneration, 'generationId' | 'minLevel' | 'maxLevel' | 'locationName' | 'conditionName' | 'detailName' | 'isAlpha' | 'meteoName' | 'obtationName' | 'zoneName'>
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
    }

    const rawResults: RawQueryResults[] = await prisma.$queryRaw<RawQueryResults[]>`
        SELECT tpo.name as obtation_name,
               g.generation_id,
               tz.name  as zone_name,
               tl.name  as location_name,
               r.rate,
               r.min_level,
               r.max_level,
               r.limit,
               r.is_alpha,
               tm.name  AS meteo_name,
               td.name  as detail_name,
               tc.name  as condition_name
        FROM pokemon_form pf
                 INNER JOIN pokemon_game_location pgl ON pgl.pokemon_id = pf.pokemon_id
                 INNER JOIN game g ON g.id = pgl.game_id AND g.status = 'on' ${generationId ? Prisma.sql`AND g.generation_id = ${generationId}` : Prisma.empty}
            INNER JOIN translation tpo
        ON tpo.reference_id = pgl.pokemon_obtation_id AND tpo.langue_id = 2 AND tpo.status = 'on' AND tpo.reference_table = ${reference_table.POKEMON_OBTENTION}
            INNER JOIN location_zone lz ON lz.id = pgl.location_zone_id AND lz.status = 'on'
            INNER JOIN translation tz ON tz.reference_id = lz.zone_id AND tz.langue_id = ${langId} AND tz.status = 'on' AND tz.reference_table = ${reference_table.ZONE}
            INNER JOIN translation tl ON tl.reference_id = lz.location_id AND tl.langue_id = ${langId} AND tl.status = 'on' AND tl.reference_table = ${reference_table.LOCATION}
            INNER JOIN rate r ON r.id = pgl.rate_id AND r.status = 'on'
            INNER JOIN translation tm ON tm.reference_id = r.meteo_id AND tm.langue_id = 2 AND tm.status = 'on' AND tm.reference_table = ${reference_table.METEO}
            INNER JOIN translation td ON td.reference_id = r.detail_rate_id AND td.langue_id = ${langId} AND td.status = 'on' AND td.reference_table = ${reference_table.DETAIL}
            INNER JOIN translation tc ON tc.reference_id = r.condition_rate_id AND tc.langue_id = ${langId} AND tc.status = 'on' AND tc.reference_table = ${reference_table.DETAIL}
            INNER JOIN pokemon_obtation po ON pgl.pokemon_obtation_id = po.id AND po.status = 'on'
            INNER JOIN zone z ON z.id = lz.zone_id AND z.status = 'on'
            INNER JOIN location l ON l.id = lz.location_id AND l.status = 'on'
            INNER JOIN meteo m ON m.id = r.meteo_id AND m.status = 'on'
            INNER JOIN detail d1 ON d1.id = r.detail_rate_id AND d1.status = 'on'
            INNER JOIN detail d2 ON d2.id = r.condition_rate_id AND d2.status = 'on'
        WHERE pf.pokemon_id = ${pokemonId}
          AND pf.form_id = ${formId}
          AND pf.status = 'on';
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
        rate:          raw.rate
    }))
}
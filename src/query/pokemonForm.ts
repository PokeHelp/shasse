import {Prisma, reference_table} from "@prisma/client";
import {prisma} from "@lib";
import {Pokedex, Type} from "@types";

export async function getPokemonForm<T extends Prisma.pokemon_formSelect>(
    data: { pokemonId?: number; formId?: number; },
    select?: T
): Promise<Prisma.pokemon_formGetPayload<{ select: T }>[]>
{
    return prisma.pokemon_form.findMany({
        where:  {
            pokemonId: data.pokemonId,
            formId:    data.formId,
            status:    'on'
        },
        select: select || {id: true} as T,
    });
}

export async function getPokemonFormPokedexQuery(formId: number, langId: number): Promise<Pokedex[]>
{
    interface RawQueryResult extends Omit<Pokedex, 'types' | 'generationIdApear' | 'internationalNumber'>
    {
        types: string;
        pokemon_info_id: bigint;
        generation_id: number;
        international_number: number;
    }

    interface RawQueryType extends Omit<Type, 'id' | 'name'>
    {
        type_id: number;
        type_name: string;
    }

    const rawResults: RawQueryResult[] = await prisma.$queryRaw<RawQueryResult[]>`
        WITH latest_pokemon_info AS (SELECT pokemon_id, MAX(generation_id) as max_generation
                                     FROM pokemon_info
                                     WHERE status = 'on'
                                     GROUP BY pokemon_id),
             pokemon_base AS (SELECT t.name,
                                     p.id,
                                     p.international_number,
                                     p.generation_id,
                                     pi.id AS pokemon_info_id
                              FROM pokemon_form pf
                                       JOIN pokemon p ON pf.pokemon_id = p.id AND p.status = 'on'
                                       JOIN pokemon_info pi ON p.id = pi.pokemon_id
                                       JOIN latest_pokemon_info lpi
                                            ON pi.pokemon_id = lpi.pokemon_id AND pi.generation_id = lpi.max_generation
                                       JOIN translation t ON pf.pokemon_id = t.reference_id
                                  AND t.langue_id = ${langId}
                                  AND t.reference_table = ${reference_table.POKEMON}
                                  AND t.status = 'on'
                              WHERE pf.form_id = ${formId}
                                AND pf.status = 'on'),
             type_translations AS (SELECT tr.reference_id AS type_id,
                                          tr.name         AS type_name
                                   FROM translation tr
                                   WHERE tr.langue_id = ${langId}
                                     AND tr.reference_table = ${reference_table.TYPE}
                                     AND tr.status = 'on')
        SELECT pb.name,
               pb.id,
               pb.international_number,
               pb.generation_id,
               JSON_ARRAYAGG(
                       JSON_OBJECT(
                               'type_id', tyo.type_id,
                               'order', tyo.order,
                               'type_name', tt.type_name
                       ) ORDER BY tyo.order
               ) AS types
        FROM pokemon_base pb
                 LEFT JOIN type_order tyo ON pb.pokemon_info_id = tyo.pokemon_info_id
                 LEFT JOIN type_translations tt ON tt.type_id = tyo.type_id
        GROUP BY pb.name, pb.id, pb.international_number
        ORDER BY pb.international_number
    `;

    return rawResults.map(row => ({
        id:                  Number(row.id),
        name:                row.name,
        internationalNumber: row.international_number,
        generationIdApear:   Number(row.generation_id),
        types: (JSON.parse(row.types) as RawQueryType[]).map((type: RawQueryType): Type => ({
            id: type.type_id,
            order: type.order,
            name: type.type_name
        }))
    }));
}
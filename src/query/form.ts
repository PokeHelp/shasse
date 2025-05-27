import {prisma} from "@lib";
import {Prisma, reference_table} from "@prisma/client";
import {FormWithName, RegionalFormWithName} from "@types";

export function getFormsByPokemonId<T extends Prisma.pokemon_formSelect>(pokemonId: number, select?: T)
    : Promise<Prisma.pokemon_formGetPayload<{ select: T }>[]>
{
    return prisma.pokemon_form.findMany({
        where:  {status: "on", pokemonId: pokemonId},
        select: select || {id: true} as T
    });
}

export async function getFormsByPokemonIdWithName(pokemonId: number, langueId: number): Promise<FormWithName[]>
{
    interface FormRaw
    {
        name: string;
        form_id: number;
    }

    const rawResults: FormRaw[] = await prisma.$queryRaw`
        SELECT t.name as name, pf.form_id as form_id
        FROM pokemon_form pf
                 INNER JOIN translation t
                            ON pf.form_id = t.reference_id AND t.status = 'on' AND t.langue_id = ${langueId}
                                AND t.reference_table = ${reference_table.FORM}
        WHERE pf.status = 'on'
          AND pf.pokemon_id = ${pokemonId};
    `;

    return rawResults.map((row: FormRaw): FormWithName =>
    {
        return {name: row.name, id: Number(row.form_id)}
    })
}

export async function getRegionalFormsByPokemonIdWithName(pokemonId: number, langueId: number): Promise<RegionalFormWithName[]>
{
    interface FormRaw
    {
        name: string;
        id: bigint;
        international_number: number;
        form_id: bigint;
    }

    const rawResults: FormRaw[] = await prisma.$queryRaw`
        SELECT p.id, t.name, p.international_number, pf.form_id
        FROM pokemon p
                 INNER JOIN translation t
                            ON t.status = 'on' AND t.langue_id = ${langueId} AND t.reference_id = p.id AND
                               t.reference_table = ${reference_table.POKEMON}
                 INNER JOIN pokemon_form pf ON pf.status = 'on' AND pf.pokemon_id = p.id
        WHERE p.international_number = (SELECT international_number
                                        FROM pokemon
                                        WHERE id = ${pokemonId});
    `;

    return rawResults.map((row: FormRaw): RegionalFormWithName =>
    ({
        id: Number(row.id),
        formId: Number(row.form_id),
        name: row.name,
        internationalNumber: row.international_number
    }))
}
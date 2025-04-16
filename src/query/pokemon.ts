import {prisma} from "@lib";
import {PokemonInfo} from "@types";
import {Prisma, reference_table} from "@prisma/client";

export async function getPokemonInfoById(pokemonId: number, langId: number, generationId?: number | null): Promise<PokemonInfo[]>
{
    interface RawQueryResult extends Omit<PokemonInfo, 'id' | 'internationalNumber' | 'hatchingCycle' | 'captureRate' |
        'callHelpRate' | 'globalXp' | 'maleRate' | 'femelleRate' | 'xpGift' | 'generationId' | 'generationAppear' |
        'categoryName'>
    {
        id: bigint;
        international_number: number;
        capture_rate: number;
        call_help_rate: number;
        male_rate: number;
        femelle_rate: number;
        xp_gift: number;
        generation_id: bigint;
        gen_apear: bigint;
        category_name: string;
        hatching_cycle: number;
        global_xp: number;
    }

    const rawResults: RawQueryResult[] = await prisma.$queryRaw`
        SELECT p.id,
               p.international_number,
               p.hatching_cycle,
               p.global_xp,
               p.capture_rate,
               p.call_help_rate,
               p.size,
               p.weight,
               p.male_rate,
               p.femelle_rate,
               pi.xp_gift,
               p.generation_id as gen_apear,
               pi.generation_id,
               t.name          as name,
               tr.name         as category_name
        FROM pokemon p
                 LEFT JOIN pokemon_info pi ON pi.pokemon_id = p.id AND pi.status = 'on'
                 LEFT JOIN translation t ON t.reference_id = p.id AND t.reference_table = ${reference_table.POKEMON} AND
                                            t.langue_id = ${langId} AND t.status = 'on'
                 LEFT JOIN translation tr ON tr.reference_id = p.category_id AND
                                             tr.reference_table = ${reference_table.POKEMON_CATEGORY} AND
                                             tr.langue_id = ${langId} AND tr.status = 'on'
        WHERE p.id = ${pokemonId}
          AND p.status = 'on'
            ${generationId ? Prisma.sql`AND pi.generation_id = ${generationId}` : Prisma.empty};
    `;

    return rawResults.map((row: RawQueryResult): PokemonInfo => ({
        id:                  Number(row.id),
        name:                row.name,
        internationalNumber: row.international_number,
        hatchingCycle:       row.hatching_cycle,
        globalXp:            row.global_xp,
        captureRate:         row.capture_rate,
        callHelpRate:        row.call_help_rate,
        size:                row.size,
        weight:              row.weight,
        maleRate:            row.male_rate,
        femelleRate:         row.femelle_rate,
        generationAppear:    Number(row.gen_apear),
        categoryName:        row.category_name,
        generationId:        Number(row.generation_id),
        xpGift:              row.xp_gift
    }));
}

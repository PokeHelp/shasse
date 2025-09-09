import {CreateHunting, OwnedPokemon, OwnedPokemonDetail, OwnedPokemonIdByUser, OwnedSumarry} from "@types";
import {prisma} from "@lib";
import {reference_table} from "@prisma/client";

export async function createOwned(data: CreateHunting, userId: string)
{
    const ownedId: { id: bigint } = await prisma.owned_pokemon.create({
        data:   {
            userId:                userId,
            time:                  data.time,
            isFinish:              data.isFinish,
            creationDate:          data.createdAt,
            isShiny:               true,
            useCharmChroma:        data.useCC,
            meetingNumber:         data.meetingNumber,
            pokemonGameLocationId: data.pokemonGameLocationId,
            spriteInShiny:         data.spriteInShiny
        },
        select: {id: true}
    });

    if (data.isFinish)
    {
        await createOwnedDetail(ownedId.id, data.nickname!, data.finishAt ?? new Date())
    }

    return ownedId;
}

export async function getAllOwned(userId: string): Promise<OwnedSumarry[]>
{
    interface RawQuery
    {
        id: bigint;
        international_number: number;
        pokemon_name: string;
        form_id: bigint;
        form_name: string;
    }

    const rawQuery: RawQuery[] = await prisma.$queryRaw<RawQuery[]>`
        WITH translations_form AS (SELECT name, reference_id, reference_table
                                   FROM translation
                                   WHERE status = 'on'
                                     AND langue_id = 1
                                     AND reference_table = ${reference_table.FORM}),
             translations_pokemon AS (SELECT name, reference_id, reference_table
                                      FROM translation
                                      WHERE status = 'on'
                                        AND langue_id = 1
                                        AND reference_table = ${reference_table.POKEMON})

        SELECT op.id, tp.name as pokemon_name, pf.form_id, tf.name as form_name, p.international_number
        FROM owned_pokemon op
                 JOIN pokemon_game_location pgl on op.pokemon_game_location_id = pgl.id
                 JOIN pokemon_form pf ON pgl.pokemon_form_id = pf.id AND pf.status = 'on'
                 JOIN pokemon p ON p.id = pf.pokemon_id AND p.status = 'on'
                 JOIN translations_form tf ON pf.form_id = tf.reference_id
                 JOIN translations_pokemon tp ON tp.reference_id = pf.pokemon_id
        WHERE op.status = 'on'
          AND is_finish = 0
          AND op.user_id = ${userId};
    `;

    return rawQuery.map((raw: RawQuery): OwnedSumarry => ({
        id:                  Number(raw.id),
        internationalNumber: raw.international_number,
        formId:              Number(raw.form_id),
        formName:            raw.form_name,
        pokemonName:         raw.pokemon_name
    }))
}

export async function getLastOwned(userId: string): Promise<OwnedPokemon | null>
{
    interface RawQuery
    {
        id: bigint;
        international_number: number;
        pokemon_name: string;
        form_id: bigint;
        form_name: string;
        sprite_in_shiny: boolean;
        game_id: bigint;
        method_name: string;
        meeting_number: number;
        time: number;
        use_charm_chroma: boolean;
    }

    const raw: RawQuery = (await prisma.$queryRaw<RawQuery[]>`
        WITH translations_form AS (SELECT name, reference_id, reference_table
                                   FROM translation
                                   WHERE status = 'on'
                                     AND langue_id = 1
                                     AND reference_table = ${reference_table.FORM}),
             translations_pokemon AS (SELECT name, reference_id, reference_table
                                      FROM translation
                                      WHERE status = 'on'
                                        AND langue_id = 1
                                        AND reference_table = ${reference_table.POKEMON}),
             translations_method AS (SELECT name, reference_id, reference_table
                                     FROM translation
                                     WHERE status = 'on'
                                       AND langue_id = 2
                                       AND reference_table = ${reference_table.HUNTING_METHOD})

        SELECT op.id,
               tp.name as pokemon_name,
               pf.form_id,
               tf.name as form_name,
               p.international_number,
               op.sprite_in_shiny,
               pgl.game_id,
               tm.name as method_name,
               op.meeting_number,
               op.time,
               op.use_charm_chroma
        FROM owned_pokemon op
                 JOIN pokemon_game_location pgl on op.pokemon_game_location_id = pgl.id
                 JOIN pokemon_form pf ON pgl.pokemon_form_id = pf.id AND pf.status = 'on'
                 JOIN pokemon p ON p.id = pf.pokemon_id AND p.status = 'on'
                 JOIN translations_form tf ON pf.form_id = tf.reference_id
                 JOIN translations_pokemon tp ON tp.reference_id = pf.pokemon_id
                 JOIN translations_method tm ON tm.reference_id = pgl.hunting_method_id
        WHERE op.status = 'on'
          AND is_finish = 0
          AND op.user_id = ${userId}
        ORDER BY op.creation_date DESC LIMIT 1;
    `)[0];

    if (raw === undefined) return null;

    return {
        id:                  Number(raw.id),
        internationalNumber: raw.international_number,
        formId:              Number(raw.form_id),
        formName:            raw.form_name,
        pokemonName:         raw.pokemon_name,
        spriteInShiny:       raw.sprite_in_shiny,
        gameId:              Number(raw.game_id),
        time:                Number(raw.time),
        useCC:               raw.use_charm_chroma,
        meetingNumber:       Number(raw.meeting_number),
        methodName:          raw.method_name
    }
}

export async function getOwnedById(userId: string, huntingId: number): Promise<OwnedPokemon | null>
{
    interface RawQuery
    {
        id: bigint;
        international_number: number;
        pokemon_name: string;
        form_id: bigint;
        form_name: string;
        sprite_in_shiny: boolean;
        game_id: bigint;
        method_name: string;
        meeting_number: number;
        time: number;
        use_charm_chroma: boolean;
    }

    const raw: RawQuery | undefined = (await prisma.$queryRaw<RawQuery[]>`
        WITH translations_form AS (SELECT name, reference_id, reference_table
                                   FROM translation
                                   WHERE status = 'on'
                                     AND langue_id = 1
                                     AND reference_table = ${reference_table.FORM}),
             translations_pokemon AS (SELECT name, reference_id, reference_table
                                      FROM translation
                                      WHERE status = 'on'
                                        AND langue_id = 1
                                        AND reference_table = ${reference_table.POKEMON}),
             translations_method AS (SELECT name, reference_id, reference_table
                                     FROM translation
                                     WHERE status = 'on'
                                       AND langue_id = 2
                                       AND reference_table = ${reference_table.HUNTING_METHOD})

        SELECT op.id,
               tp.name as pokemon_name,
               pf.form_id,
               tf.name as form_name,
               p.international_number,
               op.sprite_in_shiny,
               pgl.game_id,
               tm.name as method_name,
               op.meeting_number,
               op.time,
               op.use_charm_chroma
        FROM owned_pokemon op
                 JOIN pokemon_game_location pgl on op.pokemon_game_location_id = pgl.id
                 JOIN pokemon_form pf ON pgl.pokemon_form_id = pf.id AND pf.status = 'on'
                 JOIN pokemon p ON p.id = pf.pokemon_id AND p.status = 'on'
                 JOIN translations_form tf ON pf.form_id = tf.reference_id
                 JOIN translations_pokemon tp ON tp.reference_id = pf.pokemon_id
                 JOIN translations_method tm ON tm.reference_id = pgl.hunting_method_id
        WHERE op.status = 'on'
          AND is_finish = 0
          AND op.user_id = ${userId}
          AND op.id = ${huntingId}
        ORDER BY op.creation_date DESC LIMIT 1;
    `)[0];

    if (raw === undefined) return null;

    return {
        id:                  Number(raw.id),
        internationalNumber: raw.international_number,
        formId:              Number(raw.form_id),
        formName:            raw.form_name,
        pokemonName:         raw.pokemon_name,
        spriteInShiny:       raw.sprite_in_shiny,
        gameId:              Number(raw.game_id),
        time:                Number(raw.time),
        useCC:               raw.use_charm_chroma,
        meetingNumber:       Number(raw.meeting_number),
        methodName:          raw.method_name
    }
}

export async function updateOwned(ownedId: number, meetingNumber: number, time: number, nickname: string, isFinish: boolean)
{
    await prisma.owned_pokemon.update({
        data:  {
            meetingNumber: meetingNumber,
            time:          time,
            isFinish:      isFinish
        },
        where: {
            id: ownedId
        }
    });

    if (isFinish)
    {
        await createOwnedDetail(BigInt(ownedId), nickname, new Date());
    }
}

export async function getOwnedPokemonByUser(userId: string): Promise<OwnedPokemonIdByUser[]>
{
    interface RawQuery
    {
        id: bigint;
        pokemon_id: bigint;
        hunting_method: string;
    }

    const rawQuery: RawQuery[] = await prisma.$queryRaw`
        WITH translation_hunting_method as (SELECT name, reference_id
                                            FROM translation
                                            WHERE status = 'on'
                                              AND langue_id = 2
                                              AND reference_table = ${reference_table.HUNTING_METHOD})

        SELECT op.id,
               pf.pokemon_id,
               thm.name as hunting_method
        FROM owned_pokemon op
                 JOIN pokemon_game_location pgl ON pgl.id = op.pokemon_game_location_id
                 JOIN pokemon_form pf ON pf.id = pgl.pokemon_form_id
                 JOIN translation_hunting_method thm ON thm.reference_id = pgl.hunting_method_id
        WHERE op.status = 'on'
          AND op.user_id = ${userId}
          AND op.is_shiny = TRUE
          AND op.is_finish = TRUE;
    `;

    return rawQuery.map((raw: RawQuery): OwnedPokemonIdByUser => ({
        id:                Number(raw.id),
        pokemonId:         Number(raw.pokemon_id),
        huntingMethodName: raw.hunting_method
    }))
}

export async function retrieveOwnedId(ownedId: number, userId: string): Promise<OwnedPokemonDetail>
{
    interface RawQuery
    {
        id: bigint;
        meeting_number: bigint;
        time: bigint;
        pokemon_name: string;
        hunting_method_name: string;
        form_name: string;
        game_id: bigint;
        form_id: bigint;
    }

    const raw: RawQuery = (await prisma.$queryRaw<RawQuery[]>`
        WITH translation_pokemon as (SELECT name, reference_id
                                     FROM translation
                                     WHERE status = 'on'
                                       AND langue_id = 1
                                       AND reference_table = ${reference_table.POKEMON}),
             translation_hunting_method as (SELECT name, reference_id
                                            FROM translation
                                            WHERE status = 'on'
                                              AND langue_id = 2
                                              AND reference_table = ${reference_table.HUNTING_METHOD}),
             translation_form as (SELECT name, reference_id
                                  FROM translation
                                  WHERE status = 'on'
                                    AND langue_id = 1
                                    AND reference_table = ${reference_table.FORM})

        SELECT op.id,
               op.meeting_number,
               op.time,
               tp.name  as pokemon_name,
               thm.name as hunting_method_name,
               tf.name  as form_name,
               pgl.game_id,
               pf.form_id
        FROM owned_pokemon op
                 JOIN pokemon_game_location pgl ON pgl.id = op.pokemon_game_location_id
                 JOIN pokemon_form pf ON pf.id = pgl.pokemon_form_id AND pf.status = 'on'
                 JOIN translation_pokemon tp ON tp.reference_id = pf.pokemon_id
                 JOIN translation_hunting_method thm ON thm.reference_id = pgl.hunting_method_id
                 JOIN translation_form tf ON tf.reference_id = pf.form_id
        WHERE op.id = ${ownedId}
          AND op.is_finish = true
          AND op.status = 'on'
          AND op.user_id = ${userId};
    `)[0];

    return {
        id:                Number(raw.id),
        formName:          raw.form_name,
        pokemonName:       raw.pokemon_name,
        meetingNumber:     Number(raw.meeting_number),
        time:              Number(raw.time),
        huntingMethodName: raw.hunting_method_name,
        gameId:            Number(raw.game_id),
        formId:            Number(raw.form_id)
    }
}

async function createOwnedDetail(ownedId: bigint, nickname: string, finishDate: Date)
{
    await prisma.owned_pokemon_detail.create({
        data: {
            ownedPokemonId: ownedId,
            nickname:       nickname,
            pokeballId:     1,
            finishDate:     finishDate
        }
    });
}
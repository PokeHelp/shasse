'use server';

import {getFormsByPokemonIdWithName, getTranslationsByReferenceId} from "@query";
import {formChoices} from '@config';
import {reference_table} from "@prisma/client";
import {getLangueId} from "@service";
import {FormWithName, TranslationName} from "@types";

export async function getFormChoice(langId?: number | null): Promise<TranslationName[]>
{
    langId = !langId ? await getLangueId('french') : langId;

    return getTranslationsByReferenceId(
        formChoices, langId, reference_table.FORM
    );
}

export async function getAllPokemonForm(pokemonId: number, langId?: number | null): Promise<FormWithName[]>
{
    langId = !langId ? await getLangueId('french') : langId;

    return getFormsByPokemonIdWithName(pokemonId, langId);
}
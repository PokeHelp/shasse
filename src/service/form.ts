'use server';

import {getTranslationsByReferenceId} from "@query";
import {formChoices} from '@config';
import {reference_table} from "@prisma/client";
import {getLangueId} from "@service";
import {TranslationName} from "@types";

export async function getFormChoice(langId?: number | null): Promise<TranslationName[]>
{
    langId = !langId ? await getLangueId('french') : langId;

    return getTranslationsByReferenceId(
        formChoices, langId, reference_table.FORM
    );
}
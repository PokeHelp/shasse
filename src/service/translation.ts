import {reference_table} from "@prisma/client";
import {getLangueId} from "@service";
import {getAllTranslationIdNames, getReferenceId, getTranslation} from "@query";
import {TranslationIdNames} from "@types";

/**
 * Permet de récupérer l'id de référence pour une langue, une table de référence et une traduction
 *
 * @param name
 * @param referenceTable
 * @param langId
 */
export async function findIdByReferenceTable(name: string, referenceTable: reference_table, langId?: number | null): Promise<bigint>
{
    langId = !langId ? await getLangueId('french') : langId;
    const translateId: { referenceId: bigint } | null = await getReferenceId({name, referenceTable, langId});

    if (!translateId)
    {
        throw new Error(`La traduction de "${name}" n'a pas été trouvée.`);
    }

    return translateId.referenceId;
}

/**
 * Permet de récupérer la traduction pour une langue, une table de référence et un id
 *
 * @param id
 * @param referenceTable
 * @param langId
 */
export async function findNameByReferenceTable(id: bigint, referenceTable: reference_table, langId?: number | null): Promise<string>
{
    langId = !langId ? await getLangueId('french') : langId;
    const translation: { name: string } | null = await getTranslation({id, referenceTable, langId});

    if (!translation)
    {
        throw new Error(`La traduction n'a pas été trouvée.`);
    }

    return translation.name;
}

export async function getAllIdName(referenceTable: reference_table, langId: number | null = null): Promise<TranslationIdNames[]>
{
    langId = !langId ? await getLangueId('french') : langId;
    const idNames: { name: string, referenceId: bigint }[] = await getAllTranslationIdNames(referenceTable, langId);

    return idNames.map((idName: { name: string, referenceId: bigint }): TranslationIdNames => ({
        id:   Number(idName.referenceId),
        name: idName.name
    }));
}
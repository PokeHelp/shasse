import {reference_table} from "@prisma/client";
import {prisma} from "@lib";

/**
 * Récupère l'id d'une traduction
 *
 * @param data
 */
export async function getReferenceId(data: {
    referenceTable: reference_table;
    name: string;
    langId: number;
}): Promise<{ referenceId: bigint } | null>
{
    return prisma.translation.findFirst({
        where: {
            referenceTable: data.referenceTable,
            name:           data.name,
            langueId:       data.langId
        },
        select: {referenceId: true}
    });
}

export async function getTranslation(data: {
    referenceTable: reference_table;
    id: bigint;
    langId: number;
}): Promise<{ name: string } | null>
{
    return prisma.translation.findFirst({
        where: {
            referenceTable: data.referenceTable,
            referenceId:    data.id,
            langueId:       data.langId
        },
        select: {name: true}
    });
}
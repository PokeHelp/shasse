import {prisma} from "@lib";

/**
 * Permet de récupérer tous les isoCode
 */
export async function getAllIsoCode(): Promise<string[]>
{
    const isoCode: {isoCode: string}[] = await prisma.langue.findMany({
        select: {isoCode: true},
        where: {status: 'on'}
    });

    return isoCode.map(item => item.isoCode)
}

/**
 * Permet de récupérer la langue par défaut
 */
export function getDefaultLangue(): string
{
    return 'fr';
}
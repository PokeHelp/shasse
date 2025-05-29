import {logger} from "@lib";
import {getLangue, getAllLangue} from "@query";

/**
 * Permet de récupérer tous les isoCode
 */
export async function getAllIsoCode(): Promise<string[]>
{
    const isoCode: { isoCode: string }[] = await getAllLangue({isoCode: true});

    return isoCode.map(item => item.isoCode)
}

/**
 * Permet de récupérer la langue par défaut
 */
export function getDefaultLangue(): string
{
    return 'fr';
}

/**
 * Permet de récupérer l'id d'une langue suivant son nom
 *
 * @param name
 */
export async function getLangueId(name: string): Promise<number>
{
    const langId: {id: number} | null = await getLangue({name: name}, {id: true})

    if (!langId)
    {
        throw new Error(`La langue "${name}" n'a pas été trouvée.`);
    }

    return langId.id;
}
import {getLastGeneration as getLastGen} from '@query';

export async function getLastGeneration(): Promise<number>
{
    const lastGen: { id: number } | null = await getLastGen({id: true});

    if (!lastGen)
    {
        throw Error('Derniere génération pas trouvée');
    }

    return lastGen.id;
}
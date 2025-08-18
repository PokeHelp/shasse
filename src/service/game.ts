import {TranslationIdNames} from "@types";
import {getLangueId} from "@src/service/langue";
import {getGameFiltered} from "@query";

export async function getAllGameIdNameByPokemon(pokemonId: number | null = null, langId: number | null = null): Promise<TranslationIdNames[]>
{
    langId = !langId ? await getLangueId('french') : langId;
    const idNames: { name: string, referenceId: bigint }[] = await getGameFiltered(pokemonId, langId);

    return idNames.map((idName: { name: string, referenceId: bigint }): TranslationIdNames => ({
        id:   Number(idName.referenceId),
        name: idName.name
    }));
}
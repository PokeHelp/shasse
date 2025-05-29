import {getLangueId} from "@src/service/langue";
import {getAllTypeWithName, getPokemonTypeWithName} from "@query";
import {TypeGeneration, TypeName} from "@types";

export async function getAllTypeWithTranslation(langId?: number | null): Promise<TypeName[]>
{
    langId = !langId ? await getLangueId('french') : langId;

    return getAllTypeWithName(langId);
}

export async function getPokemonTypeWithTranslation(pokemonId: number, generationId?: number | null, langId?: number | null): Promise<TypeGeneration[]>
{
    langId = !langId ? await getLangueId('french') : langId;

    return getPokemonTypeWithName(pokemonId, langId, generationId);
}
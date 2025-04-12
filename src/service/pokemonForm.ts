import {getLangueId} from "@src/service/langue";
import {findIdByReferenceTable} from "@src/service/translation";
import {reference_table} from "@prisma/client";
import {getPokemonFormPokedexQuery} from "@query";
import {Pokedex} from "@types";

export async function getPokemonFormPokedex(formId?: number | null, langId?: number | null): Promise<Pokedex[]>
{
    langId = !langId ? await getLangueId('french') : langId;
    formId = !formId ? Number(await findIdByReferenceTable('Normal', reference_table.FORM)) : formId;

    return await getPokemonFormPokedexQuery(langId, formId);
}


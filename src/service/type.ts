import {getLangueId} from "@src/service/langue";
import {getAllTypeQuery} from "@query";
import {TypeName} from "@types";

export async function getAllTypeWithTranslation(langId?: number | null): Promise<TypeName[]>
{
    langId = !langId ? await getLangueId('french') : langId;

    return getAllTypeQuery(langId);
}
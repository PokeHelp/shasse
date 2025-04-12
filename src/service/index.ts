import {getDefaultLangue, getAllIsoCode, getLangueId} from './langue';
import {register, refreshToken, login} from'./auth';
import {findIdByReferenceTable, findNameByReferenceTable} from './translation';
import {getPokemonFormPokedex} from './pokemonForm';
import {getAllTypeWithTranslation} from './type';

export {
    getDefaultLangue,
    getAllIsoCode,
    register,
    refreshToken,
    login,
    getLangueId,
    findIdByReferenceTable,
    findNameByReferenceTable,
    getPokemonFormPokedex,
    getAllTypeWithTranslation
}
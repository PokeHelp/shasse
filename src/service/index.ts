import {getDefaultLangue, getAllIsoCode, getLangueId} from './langue';
import {register, refreshToken, login} from'./auth';
import {findIdByReferenceTable, findNameByReferenceTable} from './translation';
import {getPokemonFormPokedex} from './pokemonForm';

export {
    getDefaultLangue,
    getAllIsoCode,
    register,
    refreshToken,
    login,
    getLangueId,
    findIdByReferenceTable,
    findNameByReferenceTable,
    getPokemonFormPokedex
}
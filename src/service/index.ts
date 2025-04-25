import {getDefaultLangue, getAllIsoCode, getLangueId} from './langue';
import {register, refreshToken, login} from'./auth';
import {findIdByReferenceTable, findNameByReferenceTable} from './translation';
import {getPokemonFormPokedex} from './pokemonForm';
import {getAllTypeWithTranslation, getPokemonTypeWithTranslation} from './type';
import {getDetail} from './pokemon';
import {getPokemonEggGroupWithTranslation} from './eggGroup';
import {getPokemonAbilityWithTranslation} from './ability';
import {getPokemonStatisticWithTranslation} from './statistic';
import {getLastGeneration} from './generation';
import {getFormChoice} from './form';

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
    getAllTypeWithTranslation,
    getPokemonTypeWithTranslation,
    getDetail,
    getPokemonEggGroupWithTranslation,
    getPokemonAbilityWithTranslation,
    getPokemonStatisticWithTranslation,
    getLastGeneration,
    getFormChoice
}
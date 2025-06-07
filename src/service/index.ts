import {getDefaultLangue, getAllIsoCode, getLangueId} from './langue';
import {register, refreshToken, login} from'./auth';
import {findIdByReferenceTable, findNameByReferenceTable, getAllIdName} from './translation';
import {getPokemonFormPokedex} from './pokemonForm';
import {getAllTypeWithTranslation, getPokemonTypeWithTranslation} from './type';
import {getDetail} from './pokemon';
import {getPokemonEggGroupWithTranslation} from './eggGroup';
import {getPokemonAbilityWithTranslation} from './ability';
import {getPokemonStatisticWithTranslation} from './statistic';
import {getLastGeneration} from './generation';
import {getFormChoice, getAllPokemonForm} from './form';
import {getPokemonGenerationLocation} from './location';

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
    getFormChoice,
    getAllIdName,
    getPokemonGenerationLocation,
    getAllPokemonForm
}
import {DataError, ErrorMap} from "./zod";
import {Errors, ErrorResponse} from './error';
import {PokedexResponse, Pokedex, PokemonInfoDetail, GroupedPokemonInfoDetailResponse, PokemonInfo, GroupedPokemonInfoDetail, TranslationIdNamesResponse, TranslationIdNames} from './pokemon';
import {TypeName, TypesResponse, Type, TypeGeneration, TypeGenerationResponse} from './type';
import {EggGroup, EggGroupGeneration, EggGroupGenerationResponse} from './eggGroup';
import {Ability, AbilityGeneration, AbilityGenerationResponse} from './ability';
import {Statistic, StatisticGenerationResponse, StatisticGeneration} from './statistic';
import {TypePictureStyle, PokemonPictureStyle, PokemonPicture} from './picture';
import {Generation, GenerationResponse} from './generation';
import {TranslationName, Translation} from './translation';
import {NationalNumber, NationalNumberGeneration} from './nationalNumber';
import {CapacityGeneration} from './capacity';
import {LocationGeneration, LocationGenerationsResponse, GameLocationName, GameLocationNameResponse, Location} from './location';
import {EvolutionNode, EvolutionTree} from './evolution';
import {FormWithName, RegionalFormWithName, FormWithNamesResponse} from './forms';
import {AuthProviderEnum, Session, User} from './auth';
import {HuntingMethods, HuntingMethodsResponse} from "./huntingMethods";
import {CreateHunting, CreateHuntingResponse} from './hunting';
import {OwnedSumarry, OwnedPokemon} from './owned';

export type {
    DataError,
    ErrorMap,
    Errors,
    ErrorResponse,
    PokedexResponse,
    Pokedex,
    TypeName,
    TypesResponse,
    Type,
    EggGroup,
    Ability,
    PokemonInfoDetail,
    Statistic,
    GroupedPokemonInfoDetailResponse,
    TypeGeneration,
    TypeGenerationResponse,
    EggGroupGeneration,
    EggGroupGenerationResponse,
    AbilityGeneration,
    AbilityGenerationResponse,
    StatisticGenerationResponse,
    StatisticGeneration,
    PokemonInfo,
    GroupedPokemonInfoDetail,
    TypePictureStyle,
    Generation,
    GenerationResponse,
    TranslationName,
    PokemonPictureStyle,
    PokemonPicture,
    NationalNumber,
    NationalNumberGeneration,
    CapacityGeneration,
    LocationGeneration,
    EvolutionNode,
    EvolutionTree,
    FormWithName,
    RegionalFormWithName,
    TranslationIdNames,
    TranslationIdNamesResponse,
    FormWithNamesResponse,
    LocationGenerationsResponse,
    AuthProviderEnum,
    Session,
    User,
    Translation,
    HuntingMethods,
    HuntingMethodsResponse,
    GameLocationName,
    GameLocationNameResponse,
    Location,
    CreateHunting,
    CreateHuntingResponse,
    OwnedSumarry,
    OwnedPokemon
}
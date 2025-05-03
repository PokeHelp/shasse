import {
    LoginData,
    RegisterData,
    RefreshToken,
    AuthContext,
    AuthGuardProps,
    AuthState,
    RefreshTokenData,
    AccessTokenData,
    RegisterForm,
    AuthResponse,
    RefreshTokenResponse
} from "./auth";
import {DataError, ErrorMap} from "./zod";
import {Errors, ErrorResponse} from './error';
import {PokedexResponse, Pokedex, PokemonInfoDetail, GroupedPokemonInfoDetailResponse, PokemonInfo, GroupedPokemonInfoDetail} from './pokemon';
import {TypeName, TypesResponse, Type, TypeGeneration, TypeGenerationResponse} from './type';
import {EggGroup, EggGroupGeneration, EggGroupGenerationResponse} from './eggGroup';
import {Ability, AbilityGeneration, AbilityGenerationResponse} from './ability';
import {Statistic, StatisticGenerationResponse, StatisticGeneration} from './statistic';
import {TypePictureStyle, PokemonPictureStyle, PokemonPicture} from './picture';
import {Generation, GenerationResponse} from './generation';
import {TranslationName} from './translation';
import {NationalNumber, NationalNumberGeneration} from './nationalNumber';
import {CapacityGeneration} from './capacity';

export type {
    LoginData,
    RegisterData,
    RefreshToken,
    DataError,
    ErrorMap,
    Errors,
    AuthContext,
    AuthGuardProps,
    AuthState,
    RefreshTokenData,
    AccessTokenData,
    RegisterForm,
    AuthResponse,
    ErrorResponse,
    RefreshTokenResponse,
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
    CapacityGeneration
}
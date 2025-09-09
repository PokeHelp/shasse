'use server';

import {getAllPokeball as getAllPokeballQuery} from '@query';
import {TranslationIdNames} from "@types";

export async function getAllPokeball(): Promise<TranslationIdNames[]>
{
    return getAllPokeballQuery();
}
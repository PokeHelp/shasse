import {CreateHunting} from "@types";
import {createOwned, getPokemonForm} from "@query";

export async function createOwnedPokemon(data: CreateHunting, userId: string): Promise<{ id: bigint }>
{
    const dataPokemonForm = {pokemonId: data.pokemonId} as { pokemonId: number; formId?: number };

    if (data.formId !== null) dataPokemonForm.formId = data.formId;

    const pokemonFormId: { id: number } = (await getPokemonForm(dataPokemonForm, {id: true}))[0]

    return createOwned(data, userId, pokemonFormId.id);
}
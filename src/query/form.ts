import {prisma} from "@lib";
import {Prisma} from "@prisma/client";

export function getFormsByPokemonId<T extends Prisma.pokemon_formSelect>(pokemonId: number, select?: T)
    : Promise<Prisma.pokemon_formGetPayload<{ select: T }>[]>
{
    return prisma.pokemon_form.findMany({
        where:  {status: "on", pokemonId: pokemonId},
        select: select || {id: true} as T
    });
}
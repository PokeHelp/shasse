import {CreateHunting} from "@types";
import {prisma} from "@lib";

export function createOwned(data: CreateHunting, userId: string, pokemonFormId: number)
{
    return prisma.owned_pokemon.create({
        data: {
            userId: userId,
            gameId: data.gameId,
            time: data.time,
            isFinish: data.isFinish,
            creationDate: data.createdAt,
            finishDate: data.finishAt,
            isShiny: true,
            useCharmChroma: data.useCC,
            methodId: data.huntingMethodId,
            pokemonFormId: pokemonFormId
        },
        select: {id: true}
    })
}
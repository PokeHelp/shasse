import {JSX} from "react";
import {PokemonDetail} from "@components";

export default async function PokemonInfoPage({params}: { params: { id: string } }): Promise<JSX.Element>
{
    const pokemonId: number = Number(params.id);

    return (
        <>
            <PokemonDetail pokemonId={pokemonId} />
        </>
    )
}
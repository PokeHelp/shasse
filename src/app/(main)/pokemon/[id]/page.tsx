import { JSX } from "react";
import { PokemonDetail } from "@components";

type PokemonInfoPageProps = {
    params: { id: string };
};

export default function PokemonInfoPage({ params }: PokemonInfoPageProps): JSX.Element {
    const pokemonId: number = Number(params.id);

    return (
        <>
            <PokemonDetail pokemonId={pokemonId} />
        </>
    );
}
import { JSX } from "react";
import {PageLayout, PokemonDetail} from "@components";

type PokemonInfoPageProps = {
    params: { id: string };
};

export default function PokemonInfoPage({ params }: PokemonInfoPageProps): JSX.Element {
    const pokemonId: number = Number(params.id);

    return (
        <PageLayout>
            <PokemonDetail pokemonId={pokemonId} />
        </PageLayout>
    );
}
import { JSX } from "react";
import {PageLayout, PokemonDetail} from "@components";

type PokemonInfoPageProps = {
    params: { id: string };
};

export default async function PokemonInfoPage({ params }: PokemonInfoPageProps): Promise<JSX.Element> {
    const pokemonId: number = Number(params.id);

    return (
        <PageLayout>
            <PokemonDetail pokemonId={pokemonId} />
        </PageLayout>
    );
}
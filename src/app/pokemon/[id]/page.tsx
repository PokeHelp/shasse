import {JSX} from "react";
import {PokemonDetail} from "@components";
import { PageProps } from "@/.next/types/app/page";

type PokemonInfoPageProps = PageProps & {
    params: { id: string };
}

export default async function PokemonInfoPage({params}: PokemonInfoPageProps): Promise<JSX.Element>
{
    const pokemonId: number = Number(params.id);

    return (
        <>
            <PokemonDetail pokemonId={pokemonId}/>
        </>
    )
}
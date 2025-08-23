import {PageLayout, PokemonDetail} from "@components";
import {JSX} from "react";

export default async function PokemonInfoPage({params}: { params: Promise<{ id: string }> }): Promise<JSX.Element>
{
    const {id} = await params;

    return (
        <PageLayout>
            <PokemonDetail pokemonId={Number(id)}/>
        </PageLayout>
    );
}

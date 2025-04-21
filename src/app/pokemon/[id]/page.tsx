import {JSX} from "react";

export default async function PokemonInfoPage({params}: { params: { id: string } }): Promise<JSX.Element>
{
    return (
        <>
            {params.id}
        </>
    )
}
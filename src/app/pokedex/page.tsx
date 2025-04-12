import {JSX} from "react";
import {Pokedex} from "@components";

export default async function PokedexPage(): Promise<JSX.Element>
{
    return (
        <>
            <h1>Pokedex</h1>
            <Pokedex />
        </>
    )
}
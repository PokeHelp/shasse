import {JSX} from "react";
import {Pokedex, Typography} from "@components";

export default async function PokedexPage(): Promise<JSX.Element>
{
    return (
        <>
            <Typography type={"h1"}>Pokedex</Typography>
            <Pokedex />
        </>
    )
}
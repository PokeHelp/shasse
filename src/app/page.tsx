import {Typography} from "@components";
import {JSX} from "react";

/**
 * Page: /
 *
 * @constructor
 */
export default function HomePage(): JSX.Element
{
    return (
        <>
            <Typography>Ceci est la page de home</Typography>
            <h1 className={"text-3xl font-bold underline"}>Ceci est un test</h1>
        </>
    );
}

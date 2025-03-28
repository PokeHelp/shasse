import {Button} from "@components";
import {useTheme} from "next-themes";
import {JSX} from "react";

export default function ThemeButton(): JSX.Element
{
    const { setTheme } = useTheme();

    return (
        <>
            <Button onClick={(): void => setTheme("light")}>Light</Button>
            <Button onClick={(): void => setTheme("dark")}>Dark</Button>
        </>
    )
}
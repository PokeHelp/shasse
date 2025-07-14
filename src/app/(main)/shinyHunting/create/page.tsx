import {JSX} from "react";
import {ShinyHuntingCreate} from "@components";

export default async function CreateShinyHuntingPage(): Promise<JSX.Element>
{
    return (
        <>
            <div className="w-full flex flex-col items-center">
                <div className="container">
                    <ShinyHuntingCreate />
                </div>
            </div>
        </>
    );
}
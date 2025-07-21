import {JSX} from "react";
import {PageLayout, ShinyHuntingCreate} from "@components";

export default async function CreateShinyHuntingPage(): Promise<JSX.Element>
{
    return (
        <PageLayout>
            <div className="w-full flex flex-col items-center">
                <div className="container">
                    <ShinyHuntingCreate />
                </div>
            </div>
        </PageLayout>
    );
}
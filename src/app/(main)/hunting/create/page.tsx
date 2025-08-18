import {JSX} from "react";
import {PageLayout, ShinyHuntingCreate} from "@components";
import {getRequiredUser} from "@src/lib/auth-server";

export default async function CreateHuntingPage(): Promise<JSX.Element>
{
    await getRequiredUser();

    return (
        <PageLayout>
            <ShinyHuntingCreate />
        </PageLayout>
    );
}
import {JSX} from "react";
import {Livingdex, PageLayout, Typography} from "@components";
import {User} from "@types";
import {getRequiredUser} from "@lib/auth-server";

export default async function PokedexPage(): Promise<JSX.Element>
{
    const user: User = await getRequiredUser();

    return (
        <PageLayout>
            <Typography as={"h1"} className="mb-3">ShinyLivingDex de {user.name}</Typography>
            <Livingdex userId={user.id}/>
        </PageLayout>
    )
}
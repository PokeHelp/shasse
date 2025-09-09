import {JSX} from "react";
import {OwnedDetail, PageLayout} from "@components";
import {getRequiredUser} from "@src/lib/auth-server";
import {User} from "@types";

export default async function CreateHuntingPage(): Promise<JSX.Element>
{
    const user: User = await getRequiredUser();

    return (
        <PageLayout>
            <div className="flex h-full items-center ml-2">
                <OwnedDetail userId={user.id}/>
            </div>
        </PageLayout>
    );
}
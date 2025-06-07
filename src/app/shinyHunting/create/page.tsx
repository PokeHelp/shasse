import {JSX} from "react";
import {AuthGuard, ShinyHuntingCreate} from "@components";
import {role} from "@prisma/client";

export default async function CreateShinyHuntingPage(): Promise<JSX.Element>
{
    return (
        <AuthGuard requiredRole={role.PUBLIC}>
            <div className="w-full flex flex-col items-center">
                <div className="container">
                    <ShinyHuntingCreate />
                </div>
            </div>
        </AuthGuard>
    );
}
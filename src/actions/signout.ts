'use server';

import {auth} from "@lib";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

export async function signOutAction() {
    await auth.api.signOut({
        headers: await headers(),
    });

    redirect("/login");
}

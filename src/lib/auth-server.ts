'use server'

import {headers} from "next/headers";
import {auth} from "@src/lib/auth";

export const getSession = async () => {
    return auth.api.getSession({
        headers: await headers()
    })
}

export const getUser = async () => {
    const session = await getSession();

    return session?.user;
}
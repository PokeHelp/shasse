'use server'

import {headers} from "next/headers";
import {auth} from "@src/lib/auth";
import {unauthorized} from "next/navigation";

export const getSession = async () => {
    return auth.api.getSession({
        headers: await headers()
    })
}

export const getUser = async () => {
    const session = await getSession();

    return session?.user;
}

export const getRequiredUser = async () => {
    const session = await getSession();

    if (!session?.user) return unauthorized();

    return session.user;
}
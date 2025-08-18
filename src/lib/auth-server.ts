'use server'

import {headers} from "next/headers";
import {auth} from "@src/lib/auth";
import {unauthorized} from "next/navigation";
import { User, Session } from "@types";

export const getSession: () => Promise<Session | null> = async (): Promise<Session | null> => {
    return auth.api.getSession({
        headers: await headers()
    })
}

export const getUser: () => Promise<User | undefined> = async (): Promise<User | undefined> => {
    const session: Session | null = await getSession();

    return session?.user;
}

export const getRequiredUser: () => Promise<User> = async (): Promise<User> => {
    const session: Session | null = await getSession();

    if (!session?.user) return unauthorized();

    return session.user;
}
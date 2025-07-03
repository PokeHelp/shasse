import {createAuthClient} from "better-auth/react";

const authClient =  createAuthClient({});

export const {useSession, signIn, signUp, signOut} = authClient;
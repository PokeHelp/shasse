import {authClient} from "@lib";


export type AuthProviderEnum = Parameters<typeof authClient.signIn.social>[0]["provider"];
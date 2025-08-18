import {authClient} from "@src/lib/auth-client";

export type AuthProviderEnum = Parameters<typeof authClient.signIn.social>[0]["provider"];

export interface User
{
    id: string;
    name: string;
    emailVerified: boolean;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined;
    banned: boolean | null | undefined;
    role?: string | null | undefined;
    banReason?: string | null | undefined;
    banExpires?: Date | null | undefined;
}

export interface Session
{
    session: {
        id: string
        token: string
        userId: string
        expiresAt: Date
        createdAt: Date
        updatedAt: Date
        ipAddress?: string | null | undefined
        userAgent?: string | null | undefined
        impersonatedBy?: string | null | undefined
    }
    user: User
}
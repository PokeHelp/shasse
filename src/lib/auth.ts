import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";
import {prisma} from "@lib";

export const auth= betterAuth({
   database: prismaAdapter(prisma, {
       provider: 'mysql'
   }),
    emailAndPassword: {
       enabled: true
    },
    socialProviders: {
        discord: {
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        },
    },
});
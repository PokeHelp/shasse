import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";
import {prisma} from "@lib";
import {getResendInstance} from "@src/lib/resend";

export const auth = betterAuth({
    database:          prismaAdapter(prisma, {
        provider: 'mysql'
    }),
    emailAndPassword:  {
        enabled:           true,
        sendResetPassword: async ({user, url}) =>
                           {
                               const resend = getResendInstance();

                               await resend.emails.send({
                                   to:      user.email,
                                   subject: "Reset your password",
                                   text:    `Click the link to reset your password: ${url}`,
                                   from:    "noreply@pokehelp.fr"
                               })
                           }
    },
    emailVerification: {
        sendVerificationEmail: async ({user, url}) =>
                               {
                                   const resend = getResendInstance();

                                   await resend.emails.send({
                                       to:      user.email,
                                       subject: "Verify your email",
                                       text:    `Click the link to verify your email: ${url}`,
                                       from:    "noreply@pokehelp.fr"
                                   })
                               }
    },
    socialProviders:   {
        discord: {
            clientId:     process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        },
        google:  {
            clientId:     process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});
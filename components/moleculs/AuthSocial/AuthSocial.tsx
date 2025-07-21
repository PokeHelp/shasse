'use client';

import {Button} from "@components";
import {ReactSVG} from "react-svg";
import {useTranslations} from "next-intl";
import {AuthProviderEnum} from "@types";
import {ErrorContext} from "@better-fetch/fetch";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";
import {authClient} from "@src/lib/auth-client";
import {toast} from "sonner";
import {JSX} from "react";

export default function AuthSocial(): JSX.Element
{
    const t = useTranslations('page.login');
    const router: AppRouterInstance = useRouter();

    async function signInSocial(social: AuthProviderEnum): Promise<void>
    {
        await authClient.signIn.social({
            provider:    social,
            callbackURL: "/"
        }, {
            onSuccess: (): void => router.refresh(),
            onError:   (error: ErrorContext): void =>
                       {
                           console.log(error);
                           toast(t(`auth.code.${error.error.code}`));
                       }
        });
    }

    return (
        <div className="flex gap-3 flex-col">
            <Button className="w-full" onClick={(): Promise<void> => signInSocial('google')}>
                <div className="flex items-center gap-2">
                    <ReactSVG className="h-6 w-6" src='/svg/google.svg'/>
                    {t('connexionWith', {connexionName: 'Google'})}
                </div>
            </Button>
            <Button className="w-full" onClick={(): Promise<void> => signInSocial('discord')}>
                <div className="flex items-center gap-2">
                    <ReactSVG className="h-6 w-6" src='/svg/discord.svg'/>
                    {t('connexionWith', {connexionName: 'Discord'})}
                </div>
            </Button>
        </div>
    );
}
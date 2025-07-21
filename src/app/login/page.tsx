import {Typography, LoginForm, BodyBackground} from "@components";
import {JSX} from "react";
import {getTranslations} from 'next-intl/server';

/**
 * Page: /login
 *
 * @constructor
 */
export default async function LoginPage(): Promise<JSX.Element>
{
    const t = await getTranslations('page.login');

    return (
        <>
            <BodyBackground />
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-background w-full max-w-4xl p-4 rounded shadow-2xl">
                    <Typography as={"h1"}>
                        {t('title')}
                    </Typography>
                    <LoginForm/>
                </div>
            </div>
        </>
    );
}
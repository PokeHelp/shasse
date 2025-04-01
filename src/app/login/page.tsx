import {Typography, LoginForm} from "@components";
import {JSX} from "react";
import {getTranslations} from 'next-intl/server';

/**
 * Page: /login
 *
 * @constructor
 */
export default async function LoginPage(): Promise<JSX.Element>
{
    const t = await getTranslations('loginPage');

    return (
        <>
            <Typography>{t('title')}</Typography>
            <LoginForm/>
        </>
    );
}
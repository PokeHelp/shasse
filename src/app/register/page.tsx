'use server';

import {Typography, RegisterForm} from "@components";
import {JSX} from "react";
import {getTranslations} from "next-intl/server";

/**
 * Page: /register
 *
 * @constructor
 */
export default async function RegisterPage(): Promise<JSX.Element>
{
    const t = await getTranslations('RegisterPage');

    return (
        <>
            <Typography>{t('title')}</Typography>
            <RegisterForm/>
        </>
    );
}
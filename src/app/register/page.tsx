'use server';

import {RegisterForm} from "@components";
import {JSX} from "react";
import {getTranslations} from "next-intl/server";

/**
 * Page: /register
 *
 * @constructor
 */
export default async function RegisterPage(): Promise<JSX.Element>
{
    const t = await getTranslations('registerPage');

    return (
        <>
            <h1>{t('title')}</h1>
            <RegisterForm/>
        </>
    );
}
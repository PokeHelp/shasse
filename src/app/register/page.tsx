'use server';

import {BodyBackground, RegisterForm, Typography} from "@components";
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
            <BodyBackground />
            <div className="flex justify-center items-center min-h-screen">
                <div className="bg-background w-full max-w-4xl p-4 rounded shadow-2xl">
                    <Typography type={"h1"}>
                        {t('title')}
                    </Typography>
                    <RegisterForm/>
                </div>
            </div>
        </>
    );
}
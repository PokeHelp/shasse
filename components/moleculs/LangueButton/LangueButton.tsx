'use client';

import {Button} from "@components";
import {JSX, useEffect, useState} from "react";
import {getCookie, setCookie} from "@utils";

export default function LangueButton(): JSX.Element
{
    const locales: string[] = ['fr', 'en'];
    const [currentLangue, setCurrentLangue] = useState<string | null>(null);

    useEffect((): void =>
    {
        setCurrentLangue(getCookie('userLang'));
    }, []);

    const handleChangeLangue: (locale: string) => void = (locale: string): void =>
    {
        setCookie('userLang', locale, 60 * 60 * 24 * 365);
        window.location.reload();
    }

    return (
        <>
            {locales.map((locale: string): JSX.Element => (
                <Button
                    key={locale}
                    onClick={(): void => handleChangeLangue(locale)}
                    className={locale === currentLangue ? 'active' : ''}
                    disabled={locale === currentLangue}
                >
                    {locale.toUpperCase()}
                </Button>
            ))}
        </>
    )
}
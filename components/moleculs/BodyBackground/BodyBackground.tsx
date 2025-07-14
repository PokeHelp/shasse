"use client";

import { useEffect } from 'react';
import {useTheme} from "next-themes";

export default function BodyBackground (): null
{
    const {resolvedTheme} = useTheme();

    useEffect((): () => void => {
        document.body.style.backgroundImage =
            resolvedTheme === 'dark'
                ? "url('/image/auth/login_background_dark.jpg')"
                : "url('/image/auth/login_background_light.jpg')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.minHeight = '100vh';

        return (): void => {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundPosition = '';
            document.body.style.minHeight = '';
        };
    }, [resolvedTheme]);

    return null;
};

'use client';

import {JSX, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Typography} from "@components";
import {useAuthStore} from "@store";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

/**
 * Page: /logout
 *
 * @constructor
 */
export default function Logout(): JSX.Element
{
    const router: AppRouterInstance = useRouter();
    const {clearAuth} = useAuthStore();

    useEffect((): void =>
    {
        clearAuth();

        router.push('/login');
    }, [clearAuth, router]);

    return (
        <Typography type={"h1"}>
            Déconnexion ...
        </Typography>
    );
}
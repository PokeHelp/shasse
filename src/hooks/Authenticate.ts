'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useAuthStore} from '@store';
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export function useAuthenticate(requiredLevelAccess: number): void
{
    const router: AppRouterInstance = useRouter();
    const {levelAccess} = useAuthStore();

    useEffect((): void =>
    {
        if (levelAccess === null)
        {
            router.push('/login');
        } else if (levelAccess < requiredLevelAccess)
        {
            // TODO: redirection /unauthorized
            // TODO: voir pk il y a eus déduplication
            router.push('/unauthorized');
        }
    }, [router, levelAccess, requiredLevelAccess]);
}
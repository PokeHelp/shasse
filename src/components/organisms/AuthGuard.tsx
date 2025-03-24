'use client';

import {JSX, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAuthStore} from '@store';
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {AuthGuardProps} from "@types";

export default function AuthGuard({requiredLevelAccess, children}: AuthGuardProps): JSX.Element | null
{
    const router: AppRouterInstance = useRouter();
    const {levelAccess} = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect((): void =>
    {
        if (levelAccess !== null)
        {
            setIsLoading(false);
            if (levelAccess < requiredLevelAccess)
            {
                router.push('/unauthorize');
            }
        }
    }, [levelAccess, requiredLevelAccess, router]);

    if (isLoading)
    {
        return <p>Vérification de l authentification...</p>;
    }

    if (levelAccess !== null && levelAccess >= requiredLevelAccess)
    {
        return <>{children}</>;
    }

    return null;
}
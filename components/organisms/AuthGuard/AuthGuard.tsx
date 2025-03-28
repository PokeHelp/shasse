'use client';

import {ReactNode, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useAuthStore} from '@store';
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {role} from "@prisma/client";
import {getLevelAccess, RoleName} from "@utils";

interface AuthGuardProps
{
    requiredRole: RoleName;
    children: ReactNode;
}

export default function AuthGuard({requiredRole = role.SUPER_ADMIN, children}: AuthGuardProps): ReactNode | null
{
    const router: AppRouterInstance = useRouter();
    const {levelAccess, isInitialized} = useAuthStore();
    const requiredLevelAccess: number = getLevelAccess(requiredRole);

    useEffect((): void =>
    {
        if (!isInitialized) return;

        if (requiredLevelAccess === 0) return;

        if (levelAccess === null)
        {
            router.push('/login');
        } else if (levelAccess < requiredLevelAccess)
        {
            router.push('/unauthorized');
        }
    }, [levelAccess, isInitialized, requiredLevelAccess, router]);

    if (!isInitialized) return (<div>Chargement...</div>);

    if (requiredLevelAccess === 0) return children;

    if (levelAccess !== null && levelAccess >= requiredLevelAccess) return children;

    return null;
}
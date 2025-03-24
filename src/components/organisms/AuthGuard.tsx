'use client';

import {ReactNode, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@store';

interface AuthGuardProps {
    requiredLevelAccess?: number;
    fallback?: ReactNode;
    children: ReactNode;
    redirectUnauthenticated?: string;
    redirectUnauthorized?: string;
}

export default function AuthGuard({
                                      requiredLevelAccess = 0,
                                      fallback = <div>Chargement...</div>,
                                      children,
                                      redirectUnauthenticated = '/login',
                                      redirectUnauthorized = '/unauthorized'
                                  }: AuthGuardProps) {
    const router = useRouter();
    const { levelAccess, isInitialized } = useAuthStore();

    useEffect(() => {
        if (!isInitialized) return;

        // Page publique
        if (requiredLevelAccess === 0) return;

        // Non authentifié
        if (levelAccess === null) {
            router.push(redirectUnauthenticated);
        }
        // Niveau insuffisant
        else if (levelAccess < requiredLevelAccess) {
            router.push(redirectUnauthorized);
        }
    }, [levelAccess, isInitialized, requiredLevelAccess]);

    if (!isInitialized) return fallback;

    if (requiredLevelAccess === 0) return children; // Page publique
    if (levelAccess !== null && levelAccess >= requiredLevelAccess) return children;

    return null;
}
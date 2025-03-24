'use client';

import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '@lib';
import {JSX, ReactNode, useEffect} from "react";
import {useAuthStore} from "@store";

export default function Providers({children}: { children: ReactNode }): JSX.Element
{
    const {initializeAuth} = useAuthStore();

    useEffect((): void =>
    {
        initializeAuth();
    }, [initializeAuth]);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
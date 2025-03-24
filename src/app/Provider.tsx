'use client';

import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '@lib';
import {ReactNode, JSX, useEffect} from "react";
import {useAuthStore} from "@store";
import {getCookie} from "@utils";
import {JwtInfoSchema} from "@schema";
import jwt from "jsonwebtoken";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {axiosService} from "@lib";
import {AxiosResponse} from "axios";
import {SafeParseReturnType} from "zod";
import {JwtInfo} from "@types";

export default function Providers({children}: { children: ReactNode }): JSX.Element
{
    const {setAuth, clearAuth} = useAuthStore();
    const router: AppRouterInstance = useRouter();

    useEffect((): void =>
    {
        const token: string | null = localStorage.getItem('accessToken');
        const refreshToken: string | null = getCookie('refreshToken');

        /**
         * Permet de refresh l'accessToken suivant le refreshToken
         *
         * @param refreshToken
         */
        const refreshAccessToken: (refreshToken: string) => void = async (refreshToken: string): Promise<void> =>
        {
            try
            {
                const response: AxiosResponse = await axiosService.post('/api/auth/refresh', {refreshToken});
                const {accessToken} = response.data;

                const decoded: SafeParseReturnType<JwtInfo, JwtInfo> = JwtInfoSchema.safeParse(jwt.decode(accessToken));

                if (decoded.success)
                {
                    setAuth(accessToken, refreshToken);
                }
            } catch (error)
            {
                console.error('Erreur lors du rafraîchissement du token :', error);
                clearAuth();
                router.push('/login');
            }
        };

        if (!token && refreshToken)
        {
            refreshAccessToken(refreshToken);
        } else if (token && refreshToken)
        {
            const decoded: SafeParseReturnType<JwtInfo, JwtInfo> = JwtInfoSchema.safeParse(jwt.decode(token));

            if (decoded.success)
            {
                setAuth(token, refreshToken);
            }
        } else
        {
            clearAuth();
            router.push('/login');
        }
    }, [setAuth, clearAuth, router]);

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
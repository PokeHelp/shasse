import {create, StoreApi, UseBoundStore} from 'zustand';
import jwt from 'jsonwebtoken';
import {AccessTokenDataSchema} from '@schema';
import {AccessTokenData, AuthState, RefreshTokenResponse} from "@types";
import {SafeParseReturnType} from "zod";
import {getCookie, setCookie} from "@utils";
import {refreshToken as refreshTokenFn} from "@service";

export const useAuthStore: UseBoundStore<StoreApi<AuthState>> = create<AuthState>((set: (state: Partial<AuthState> | ((prev: AuthState) => Partial<AuthState>)) => void): AuthState => ({
    levelAccess:     null,
    isAuthenticated: false,
    isLoading:       true,
    isInitialized:   false,

    initializeAuth: async (): Promise<void> =>
                    {
                        let token: string | null = localStorage.getItem('accessToken');
                        const refreshToken: string | null = getCookie('refreshToken');

                        if (refreshToken && !token)
                        {
                            const response: RefreshTokenResponse = await refreshTokenFn({refreshToken: refreshToken});

                            if (!response.success)
                            {
                                console.log(response.error);
                                set({isInitialized: true})
                            } else
                            {
                                localStorage.setItem('accessToken', response.accessToken);
                                token = response.accessToken;
                            }
                        }

                        if (token && refreshToken)
                        {
                            const decoded: SafeParseReturnType<AccessTokenData, AccessTokenData> = AccessTokenDataSchema.safeParse(jwt.decode(token));

                            if (decoded.success)
                            {
                                set({
                                    levelAccess:     decoded.data.levelAccess,
                                    isAuthenticated: true,
                                    isInitialized:   true
                                });
                                return;
                            }
                        }
                        set({isInitialized: true});
                    },

    setAuth: (accessToken: string, refreshToken: string): void =>
             {
                 const decoded: SafeParseReturnType<AccessTokenData, AccessTokenData> = AccessTokenDataSchema.safeParse(jwt.decode(accessToken));

                 if (decoded.success)
                 {
                     set({levelAccess: decoded.data.levelAccess, isAuthenticated: true, isLoading: false});
                     localStorage.setItem('accessToken', accessToken);
                     setCookie('refreshToken', refreshToken, (14 * 24 * 60 * 60));
                 }
             },

    clearAuth: (): void =>
               {
                   set({levelAccess: null, isAuthenticated: false, isLoading: false});
                   localStorage.removeItem('accessToken');
                   document.cookie = 'refreshToken=; Max-Age=0; Path=/;';
               },
}));
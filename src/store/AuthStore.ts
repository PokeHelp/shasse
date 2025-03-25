import {create, StoreApi, UseBoundStore} from 'zustand';
import jwt from 'jsonwebtoken';
import {AccessTokenDataSchema} from '@schema';
import {AccessTokenData, AuthState} from "@types";
import {SafeParseReturnType} from "zod";
import {getCookie} from "@utils";
import {AxiosResponse} from "axios";
import {axiosService} from "@lib";

export const useAuthStore: UseBoundStore<StoreApi<AuthState>> = create<AuthState>((set: (state: Partial<AuthState> | ((prev: AuthState) => Partial<AuthState>)) => void): AuthState => ({
    levelAccess:     null,
    isAuthenticated: false,
    isLoading:       true,
    isInitialized:   false,

    initializeAuth: async (): Promise<void> =>
                    {
                        try
                        {
                            let token: string | null = localStorage.getItem('accessToken');
                            const refreshToken: string | null = getCookie('refreshToken');

                            if (refreshToken && !token)
                            {
                                const response: AxiosResponse = await axiosService.post('/api/auth/refresh', {refreshToken});
                                const {accessToken} = response.data;
                                localStorage.setItem('accessToken', accessToken);
                                token = accessToken;
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
                        } catch (error)
                        {
                            console.log(error)
                            set({isInitialized: true});
                        }
                    },

    setAuth: (accessToken: string, refreshToken: string): void =>
             {
                 const decoded: SafeParseReturnType<AccessTokenData, AccessTokenData> = AccessTokenDataSchema.safeParse(jwt.decode(accessToken));

                 if (decoded.success)
                 {
                     set({levelAccess: decoded.data.levelAccess, isAuthenticated: true, isLoading: false});
                     localStorage.setItem('accessToken', accessToken);
                     document.cookie = `refreshToken=${refreshToken}; SameSite=Strict; Path=/; Max-Age=${14 * 24 * 60 * 60}`;
                 }
             },

    clearAuth: (): void =>
               {
                   set({levelAccess: null, isAuthenticated: false, isLoading: false});
                   localStorage.removeItem('accessToken');
                   document.cookie = 'refreshToken=; Max-Age=0; Path=/;';
               },
}));
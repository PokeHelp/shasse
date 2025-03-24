import {create, StoreApi, UseBoundStore} from 'zustand';
import jwt from 'jsonwebtoken';
import {JwtInfoSchema} from '@schema';
import {AuthState, JwtInfo, SimplifyRole} from "@types";
import {SafeParseReturnType} from "zod";

export const useAuthStore: UseBoundStore<StoreApi<AuthState>> = create<AuthState>((set: (state: Partial<AuthState> | ((prev: AuthState) => Partial<AuthState>)) => void): AuthState => ({
    levelAccess:     null,
    isAuthenticated: false,
    isLoading:       true,

    setAuth: (accessToken: string, refreshToken: string): void =>
             {
                 const decoded: SafeParseReturnType<JwtInfo, JwtInfo> = JwtInfoSchema.safeParse(jwt.decode(accessToken));

                 if (decoded.success)
                 {
                     const highestRole: SimplifyRole = decoded.data.roles.reduce((maxRole: SimplifyRole, currentRole: SimplifyRole): SimplifyRole =>
                     {
                         return currentRole.levelAccess > maxRole.levelAccess ? currentRole : maxRole;
                     });

                     set({levelAccess: highestRole.levelAccess, isAuthenticated: true, isLoading: false});
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
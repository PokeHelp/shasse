import {ReactNode} from "react";

export interface SimplifyRole
{
    name: string;
    levelAccess: number;
}

export interface RefreshTokenData
{
    refreshToken: string;
}

export interface LoginData
{
    email: string;
    password: string;
}

export interface RegisterData
{
    email: string;
    pseudonym: string;
    password: string;
    langue?: string | undefined;
}

export interface AuthContext
{
    levelAccess: number | null;
    setAuth: (token: string) => void;
    clearAuth: () => void;
}

export interface JwtInfo
{
    exp: number;
    iat: number;
    userId: number;
    roles: { name: string; levelAccess: number }[];
}

export interface AuthGuardProps
{
    requiredLevelAccess: number;
    children: ReactNode;
}

export interface AuthState
{
    isAuthenticated: boolean;
    levelAccess: number | null;
    isLoading: boolean;
    setAuth: (accessToken: string, refreshToken: string) => void;
    clearAuth: () => void;
}

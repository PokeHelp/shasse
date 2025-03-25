import {ReactNode} from "react";

export interface RefreshToken
{
    refreshToken: string;
}

export interface RefreshTokenData
{
    userId: number;
    exp: number;
    iat: number;
}

export interface AccessTokenData
{
    levelAccess: number;
    exp: number;
    iat: number;
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
    isInitialized: boolean;
    initializeAuth: () => Promise<void>;
}

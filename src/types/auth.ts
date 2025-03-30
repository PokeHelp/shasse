import {ReactNode} from "react";
import {ErrorResponse} from "@types";

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

export type RegisterResponse = | {
    success: true;
    accessToken: string;
    refreshToken: string;
} | ErrorResponse

export interface RegisterForm extends RegisterData
{
    passwordVerify: string;
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

export interface createUserData
{
    email: string,
    pseudonym: string,
    password: string
}

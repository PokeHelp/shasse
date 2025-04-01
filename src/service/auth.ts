'use server';

import bcrypt from 'bcryptjs';
import {role, user} from '@prisma/client';
import {SafeParseReturnType} from "zod";
import {LoginData, RefreshToken, RefreshTokenData, RefreshTokenResponse, RegisterData, AuthResponse} from "@types";
import {createJWT, mapError, getLevelAccess, verifyJWT} from "@utils";
import {LoginSchema, RefreshTokenDataSchema, RefreshTokenSchema, RegisterSchema} from "@schema";
import {getTranslations} from "next-intl/server";
import {createRefreshToken, createUser, getActiveUser, getRefreshToken} from "@query";

export async function register(data: RegisterData): Promise<AuthResponse>
{
    const registerData: SafeParseReturnType<RegisterData, RegisterData> = RegisterSchema.safeParse(data);
    const t = await getTranslations('register');

    if (!registerData.success)
    {
        return {success: false, error: mapError(registerData)};
    }

    const searchUser = {email: registerData.data.email, pseudonym: registerData.data.pseudonym};
    const existingUser: { id: number } | null = await getActiveUser(searchUser, {id: true});

    if (existingUser)
    {
        return {success: false, error: t("alreadyExist")};
    }

    const hashedPassword: string = bcrypt.hashSync(registerData.data.password + process.env.PASSWORD_SECRET!, 14);

    const user: user = await createUser({
        email:     registerData.data.email,
        pseudonym: registerData.data.pseudonym,
        password:  hashedPassword
    });

    const accessToken: string = createJWT({levelAccess: getLevelAccess(user.role)});
    const refreshToken: string = createJWT({userId: user.id}, true, '15d');

    await createRefreshToken({token: refreshToken, userId: user.id});

    return {success: true, accessToken, refreshToken};
}

export async function refreshToken(data: RefreshToken): Promise<RefreshTokenResponse>
{
    const refreshTokenData: SafeParseReturnType<RefreshToken, RefreshToken> = RefreshTokenSchema.safeParse(data);
    const t = await getTranslations('refresh');

    if (!refreshTokenData.success)
    {
        return {success: false, error: mapError(refreshTokenData)};
    }

    const decodedJWT: SafeParseReturnType<RefreshTokenData, RefreshTokenData> = RefreshTokenDataSchema.safeParse(verifyJWT(refreshTokenData.data.refreshToken, true));

    if (!decodedJWT.success)
    {
        return {success: false, error: mapError(decodedJWT)};
    }

    const user: { role: role } | null = await getActiveUser({id: decodedJWT.data.userId}, {role: true});

    if (!user)
    {
        return {success: false, error: t('userNotFound')};
    }

    const accessToken: string = createJWT({levelAccess: getLevelAccess(user.role)});

    return {success: true, accessToken};
}

export async function login(data: LoginData): Promise<AuthResponse>
{
    const loginData: SafeParseReturnType<LoginData, LoginData> = LoginSchema.safeParse(data);
    const t = await getTranslations('login');

    if (!loginData.success)
    {
        return {success: false, error: mapError(loginData)};
    }

    const user: {
        role: role,
        id: number,
        password: string
    } | null = await getActiveUser({email: loginData.data.email}, {role: true, id: true, password: true});

    if (!user)
    {
        return {success: false, error: t("invalidCredentials")};
    }

    const isValid: boolean = bcrypt.compareSync(loginData.data.password + process.env.PASSWORD_SECRET!, user.password);

    if (!isValid)
    {
        return {success: false, error: t("invalidCredentials")};
    }

    const userRefreshTokens: { token: string } | null = await getRefreshToken({userId: user.id}, {token: true});

    let refreshToken: string;

    if (!userRefreshTokens)
    {
        refreshToken = createJWT({userId: user.id}, true, '15d');
        await createRefreshToken({token: refreshToken, userId: user.id});
    } else
    {
        refreshToken = userRefreshTokens.token;
    }

    const accessToken: string = createJWT({levelAccess: getLevelAccess(user.role)});
    return {success: true, accessToken, refreshToken};
}
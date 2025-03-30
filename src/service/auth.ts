'use server';

import bcrypt from 'bcryptjs';
import {role, user} from '@prisma/client';
import {SafeParseReturnType} from "zod";
import {RefreshToken, RefreshTokenData, RefreshTokenResponse, RegisterData, RegisterResponse} from "@types";
import {createJWT, mapError, getLevelAccess, verifyJWT} from "@utils";
import {RefreshTokenDataSchema, RefreshTokenSchema, RegisterSchema} from "@schema";
import {getTranslations} from "next-intl/server";
import {createRefreshToken, createUser, getUser} from "@query";

export async function register(data: RegisterData): Promise<RegisterResponse>
{
    const registerData: SafeParseReturnType<RegisterData, RegisterData> = RegisterSchema.safeParse(data);
    const t = await getTranslations('register');

    if (!registerData.success)
    {
        return {success: false, error: mapError(registerData)};
    }

    const searchUser = {email: registerData.data.email, pseudonym: registerData.data.pseudonym}
    const existingUser: { id: number } | null = await getUser(searchUser, {id: true});

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

    const user: {role: role} | null = await getUser({id: decodedJWT.data.userId}, {role: true});

    if (!user)
    {
        return {success: false, error: t('userNotFound')};
    }

    const accessToken: string = createJWT({levelAccess: getLevelAccess(user.role)});

    return {success: true, accessToken};
}
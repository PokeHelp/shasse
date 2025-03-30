'use server';

import bcrypt from 'bcryptjs';
import {user} from '@prisma/client';
import {SafeParseReturnType} from "zod";
import {RegisterData, RegisterResponse} from "@types";
import {createJWT, mapError, getLevelAccess} from "@utils";
import {RegisterSchema} from "@schema";
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
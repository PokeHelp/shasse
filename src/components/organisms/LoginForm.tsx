'use client';

import {ChangeEvent, FormEvent, JSX, useState} from 'react';
import {useRouter} from 'next/navigation';
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {AxiosResponse} from "axios";
import {TextField, Button, PasswordTextField} from "@components";
import {clearAllErrors, handleGenericError, validateData} from "@utils";
import {Errors} from "@types";
import {LoginSchema} from "@schema";
import {useAuthStore} from "@store";
import {axiosService} from "@lib";

export default function LoginForm(): JSX.Element
{
    const router: AppRouterInstance = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<Errors>({});
    const {setAuth} = useAuthStore();

    const handleSubmit: (e: FormEvent) => Promise<void> = async (e: FormEvent): Promise<void> =>
    {
        e.preventDefault();
        clearAllErrors(setErrors);

        const isValid: boolean = validateData({email, password}, LoginSchema, setErrors);
        if (!isValid) return;

        try
        {
            const response: AxiosResponse = await axiosService.post('/api/auth/login', {email, password});
            const {accessToken, refreshToken} = response.data;

            setAuth(accessToken, refreshToken)
            router.push('/');
        } catch (error)
        {
            handleGenericError(error, setErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="E-mail"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                errorText={errors.email || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}
                required={true}
            />
            <PasswordTextField
                label="Mot de passe"
                variant="outlined"
                fullWidth
                value={password}
                errorText={errors.password || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)}
                required={true}
            />

            <Button type={'submit'}>
                Connexion
            </Button>


            {errors.general && <p style={{color: 'red'}}>{errors.general}</p>}
        </form>
    );
}
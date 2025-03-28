'use client';

import {ChangeEvent, FormEvent, JSX, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Button, Input} from "@components";
import {clearAllErrors, handleError, setFieldError, validateData} from "@utils";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {Errors} from "@types";
import {AxiosResponse} from "axios";
import {RegisterSchema} from "@schema";
import {useAuthStore} from "@store";
import {axiosService} from "@lib";

export default function RegisterForm(): JSX.Element
{
    const router: AppRouterInstance = useRouter();
    const [email, setEmail] = useState('');
    const [pseudonym, setPseudonym] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [langue, setLangue] = useState('fr');
    const [errors, setErrors] = useState<Errors>({});
    const {setAuth} = useAuthStore();

    useEffect((): void =>
    {
        setLangue(navigator.language.split('-')[0]);
    }, []);

    const handleSubmit: (e: FormEvent) => Promise<void> = async (e: FormEvent): Promise<void> =>
    {
        e.preventDefault();
        clearAllErrors(setErrors);

        const isValid: boolean = validateData({email, pseudonym, password}, RegisterSchema, setErrors);
        if (password !== passwordVerify)
        {
            setFieldError(setErrors, 'passwordVerify', 'Le mot de passe et le mot de passe de vériication ne sont pas identique');
        }
        if (!isValid || password !== passwordVerify) return;

        try
        {
            const response: AxiosResponse = await axiosService.post('/api/auth/register', {
                email,
                password,
                pseudonym,
                langue
            });
            const {accessToken, refreshToken} = response.data;

            setAuth(accessToken, refreshToken);

            router.push('/');
        } catch (error)
        {
            handleError(error, setErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                // label="E-mail"
                // variant="outlined"
                // fullWidth
                // type="email"
                // value={email}
                // errorText={errors.email || ''}
                // onChange={(e: ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}
                // required={true}
            />
            <Input
                // label="Pseudonyme"
                // variant="outlined"
                // fullWidth
                // type="text"
                // value={pseudonym}
                // errorText={errors.pseudonym || ''}
                // onChange={(e: ChangeEvent<HTMLInputElement>): void => setPseudonym(e.target.value)}
                // required={true}
            />
            {/*<PasswordInput*/}
            {/*    label="Mot de passe"*/}
            {/*    variant="outlined"*/}
            {/*    fullWidth*/}
            {/*    value={password}*/}
            {/*    errorText={errors.password || ''}*/}
            {/*    onChange={(e: ChangeEvent<HTMLInputElement>): void => setPassword(e.target.value)}*/}
            {/*    required={true}*/}
            {/*/>*/}
            {/*<PasswordInput*/}
            {/*    label="Vérification du mot de passe"*/}
            {/*    variant="outlined"*/}
            {/*    fullWidth*/}
            {/*    value={passwordVerify}*/}
            {/*    errorText={errors.passwordVerify || ''}*/}
            {/*    onChange={(e: ChangeEvent<HTMLInputElement>): void => setPasswordVerify(e.target.value)}*/}
            {/*    required={true}*/}
            {/*/>*/}

            <Button type={'submit'}>
                Inscription
            </Button>

            {errors.general && <p style={{color: 'red'}}>{errors.general}</p>}
        </form>
    );
}
'use client';

import {JSX, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Button, InputFormField} from "@components";
import {clearAllErrors, excludeFields, handleError, setFieldError, validateData} from "@utils";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {Errors, RegisterData, RegisterForm as RegisterFormType} from "@types";
import {AxiosResponse} from "axios";
import {RegisterSchema} from "@schema";
import {useAuthStore} from "@store";
import {axiosService} from "@lib";
import {useForm, UseFormReturn} from "react-hook-form";
import {Form} from "@ui/form";

export default function RegisterForm(): JSX.Element
{
    const router: AppRouterInstance = useRouter();
    const [langue, setLangue] = useState('fr');
    const [errors, setErrors] = useState<Errors>({});
    const {setAuth} = useAuthStore();

    useEffect((): void =>
    {
        setLangue(navigator.language.split('-')[0]);
    }, []);

    const form: UseFormReturn<RegisterFormType> = useForm<RegisterFormType>({
        defaultValues: {
            email:    "",
            pseudonym: "",
            password: "",
            passwordVerify: ""
        },
    });

    const handleSubmit: (data: RegisterFormType) => Promise<void> = async (data: RegisterFormType): Promise<void> =>
    {
        clearAllErrors(setErrors);

        const isValid: boolean = validateData(data, RegisterSchema, setErrors);
        if (data.password !== data.passwordVerify)
        {
            setFieldError(setErrors, 'passwordVerify', 'Le mot de passe et le mot de passe de vériication ne sont pas identique');
        }
        if (!isValid || data.password !== data.passwordVerify) return;
        const partData: RegisterData = excludeFields(data, ["passwordVerify"]);

        try
        {
            const response: AxiosResponse = await axiosService.post('/api/auth/register', {
                ...partData,
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
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <InputFormField
                        name={"pseudonym"}
                        label={"Pseudonyme"}
                        formControl={form.control}
                        type={"text"}
                        placeholder="Votre pseudonyme"
                        errorText={errors.pseudonym || ''}
                        required
                    />
                    <InputFormField
                        name={"email"}
                        label={"Email"}
                        formControl={form.control}
                        type={"email"}
                        placeholder="votre e-mail"
                        errorText={errors.email || ''}
                        required
                    />
                    <InputFormField
                        label="Mot de passe"
                        formControl={form.control}
                        errorText={errors.password || ''}
                        name={"password"}
                        placeholder={"Veuillez-entrer votre mot de passe"}
                        type={"password"}
                        required
                    />
                    <InputFormField
                        label="Vérification du mot de passe"
                        formControl={form.control}
                        errorText={errors.passwordVerify || ''}
                        name={"passwordVerify"}
                        placeholder={"Veuillez-entrer votre mot de passe"}
                        type={"password"}
                        required
                    />
                    <Button type="submit">Inscription</Button>
                </form>
            </Form>

            {errors.general && <p style={{color: 'red'}}>{errors.general}</p>}
        </>
    );
}
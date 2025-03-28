'use client';

import {JSX, useState} from 'react';
import {Button, InputFormField} from "@components";
import {Errors, LoginData} from "@types";
import {Form} from "@/components/ui/form"
import {useForm, UseFormReturn} from "react-hook-form"
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useAuthStore} from "@store";
import {clearAllErrors, handleError, validateData} from "@utils";
import {AxiosResponse} from "axios";
import {axiosService} from "@lib";
import {LoginSchema} from "@schema";

export default function LoginForm(): JSX.Element
{
    const router: AppRouterInstance = useRouter();
    const [errors, setErrors] = useState<Errors>({});
    const {setAuth} = useAuthStore();

    const form: UseFormReturn<LoginData> = useForm<LoginData>({
        defaultValues: {
            password: "",
            email:    "",
        },
    });

    async function onSubmit(data: LoginData): Promise<void>
    {
        clearAllErrors(setErrors);

        const isValid: boolean = validateData(data, LoginSchema, setErrors);
        if (!isValid) return;

        try
        {
            const response: AxiosResponse = await axiosService.post('/api/auth/login', data);
            const {accessToken, refreshToken} = response.data;

            setAuth(accessToken, refreshToken)
            router.push('/');
        } catch (error)
        {
            handleError(error, setErrors);
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <InputFormField
                        name={"email"}
                        label={"Email"}
                        formControl={form.control}
                        type={"email"}
                        placeholder="E-mail"
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
                    <Button type="submit">Connexion</Button>
                </form>
            </Form>

            {errors.general && <p style={{color: 'red'}}>{errors.general}</p>}
        </>

    );
}
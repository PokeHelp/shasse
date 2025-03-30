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
import {useTranslations} from "next-intl";

export default function LoginForm(): JSX.Element
{
    const router: AppRouterInstance = useRouter();
    const [errors, setErrors] = useState<Errors>({});
    const {setAuth} = useAuthStore();
    const t = useTranslations();

    const form: UseFormReturn<LoginData> = useForm<LoginData>({
        defaultValues: {
            password: "",
            email:    "",
        },
    });

    const handleSubmit: (data: LoginData) => Promise<void> = async (data: LoginData): Promise<void> =>
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
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <InputFormField
                        name={"email"}
                        label={t('auth.email.label')}
                        formControl={form.control}
                        type={"email"}
                        placeholder={t('auth.email.placeholder')}
                        errorText={errors.email || ''}
                        required
                    />
                    <InputFormField
                        label={t('auth.password.label')}
                        formControl={form.control}
                        errorText={errors.password || ''}
                        name={"password"}
                        placeholder={t('auth.password.placeholder')}
                        type={"password"}
                        required
                    />
                    <Button type="submit">{t('LoginPage.form.btnLogin')}</Button>
                </form>
            </Form>

            {errors.general && <p style={{color: 'red'}}>{errors.general}</p>}
        </>
    );
}
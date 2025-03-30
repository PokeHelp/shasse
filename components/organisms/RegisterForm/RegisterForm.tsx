'use client';

import {JSX, useState} from "react";
import {useRouter} from "next/navigation";
import {Button, InputFormField} from "@components";
import {clearAllErrors, excludeFields, handleError, setFieldError, validateData} from "@utils";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {Errors, RegisterData, RegisterForm as RegisterFormType, RegisterResponse} from "@types";
import {RegisterSchema} from "@schema";
import {useAuthStore} from "@store";
import {useForm, UseFormReturn} from "react-hook-form";
import {Form} from "@ui/form";
import {useTranslations} from "next-intl";
import {register} from "@service";

export default function RegisterForm(): JSX.Element
{
    const router: AppRouterInstance = useRouter();
    const [errors, setErrors] = useState<Errors>({});
    const {setAuth} = useAuthStore();
    const t = useTranslations();

    const form: UseFormReturn<RegisterFormType> = useForm<RegisterFormType>({
        defaultValues: {
            email:          "",
            pseudonym:      "",
            password:       "",
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
        const registerData: RegisterData = excludeFields(data, ["passwordVerify"]);

        const response: RegisterResponse = await register(registerData);

        if (response.success)
        {
            setAuth(response.accessToken, response.refreshToken);
            router.push('/');
        } else
        {
            handleError(response, setErrors);
        }
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <InputFormField
                        name={"pseudonym"}
                        label={t('auth.pseudonym.label')}
                        formControl={form.control}
                        type={"text"}
                        placeholder={t('auth.pseudonym.placeholder')}
                        errorText={errors.pseudonym || ''}
                        required
                    />
                    <InputFormField
                        name={"email"}
                        label={t("auth.email.label")}
                        formControl={form.control}
                        type={"email"}
                        placeholder={t('auth.email.placeholder')}
                        errorText={errors.email || ''}
                        required
                    />
                    <InputFormField
                        label={t("auth.password.label")}
                        formControl={form.control}
                        errorText={errors.password || ''}
                        name={"password"}
                        placeholder={t('auth.password.placeholder')}
                        type={"password"}
                        required
                    />
                    <InputFormField
                        label={t("auth.passwordVerify.label")}
                        formControl={form.control}
                        errorText={errors.passwordVerify || ''}
                        name={"passwordVerify"}
                        placeholder={t("auth.passwordVerify.label")}
                        type={"password"}
                        required
                    />
                    <Button type="submit">{t('registerPage.form.btnRegister')}</Button>
                </form>
            </Form>

            {errors.general && <p style={{color: 'red'}}>{errors.general}</p>}
        </>
    );
}
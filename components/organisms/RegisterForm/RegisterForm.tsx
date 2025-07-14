'use client';

import {JSX} from "react";
import {
    Button,
    Input,
    Link,
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    AuthSocial, Checkbox
} from "@components";
import {RegisterSchema} from "@schema";
import {useForm, UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {ErrorContext} from "@better-fetch/fetch";
import {authClient} from "@src/lib/auth-client";
import {toast} from "sonner";
import {useTranslations} from "next-intl";

export default function RegisterForm(): JSX.Element
{
    const t = useTranslations();
    const router: AppRouterInstance = useRouter();

    const form: UseFormReturn<z.infer<typeof RegisterSchema>> = useForm<z.infer<typeof RegisterSchema>>({
        resolver:      zodResolver(RegisterSchema),
        defaultValues: {
            email:     "",
            pseudonym: "",
            password:  "",
            passwordVerify: "",
            termsAccepted: false
        },
    });

    async function onSubmit(values: z.infer<typeof RegisterSchema>): Promise<void>
    {
        await authClient.signUp.email({
            email:    values.email,
            password: values.password,
            name:     values.pseudonym
        }, {
            onSuccess: (): void =>
                       {
                           router.push('/');
                           router.refresh();
                       },
            onError:   (error: ErrorContext): void =>
                       {
                           console.log(error);
                           toast.error(t(`auth.code.${error.error.code}`));
                       }
        });
    }

    return (
        <>
            <Form form={form} callback={onSubmit} className="flex gap-3 flex-col mt-4">
                <FormField
                    name='email'
                    control={form.control}
                    render={({field}): JSX.Element => (
                        <FormItem>
                            <FormLabel>
                                {t('auth.email.label')}
                            </FormLabel>
                            <FormControl>
                                <Input type='email' {...field} placeholder={t('auth.email.placeholder')} required/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    name='pseudonym'
                    control={form.control}
                    render={({field}): JSX.Element => (
                        <FormItem>
                            <FormLabel>
                                {t('auth.pseudonym.label')}
                            </FormLabel>
                            <FormControl>
                                <Input type='text' {...field} placeholder={t('auth.pseudonym.placeholder')} required/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    name='password'
                    control={form.control}
                    render={({field}): JSX.Element => (
                        <FormItem>
                            <FormLabel>
                                {t('auth.password.label')}
                            </FormLabel>
                            <FormControl>
                                <Input type='password' {...field} required
                                       placeholder={t('auth.password.placeholder')}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    name='passwordVerify'
                    control={form.control}
                    render={({field}): JSX.Element => (
                        <FormItem>
                            <FormLabel>
                                {t('auth.passwordVerify.label')}
                            </FormLabel>
                            <FormControl>
                                <Input type='password' {...field} required
                                       placeholder={t('auth.passwordVerify.placeholder')}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <Checkbox form={form} label={t("acceptTerme")} name={"termsAccepted"}/>

                <div className="flex justify-end mt-2">
                    <Button type='submit' disabled={!form.watch('termsAccepted')}>
                        {t('register')}
                    </Button>
                </div>
            </Form>

            <div className="mt-8">
                <AuthSocial/>
            </div>

            <div className="mt-8 flex justify-end gap-2">
                {t('registerPage.haveCount')}
                <Link href={"/login"}>
                    {t('login')}
                </Link>
            </div>
        </>
    );
}
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
    AuthSocial
} from "@components";
import {LoginSchema} from "@schema";
import {useForm, UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {ErrorContext} from "@better-fetch/fetch";
import {authClient} from "@src/lib/auth-client";
import {toast} from "sonner";
import {useTranslations} from "next-intl";

export default function LoginForm(): JSX.Element
{
    const t = useTranslations();
    const router: AppRouterInstance = useRouter();

    const form: UseFormReturn<z.infer<typeof LoginSchema>> = useForm<z.infer<typeof LoginSchema>>({
        resolver:      zodResolver(LoginSchema),
        defaultValues: {
            email:    "",
            password: ""
        },
    });

    async function onSubmit(values: z.infer<typeof LoginSchema>): Promise<void>
    {
        await authClient.signIn.email({
            email:    values.email,
            password: values.password
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
                    name='password'
                    control={form.control}
                    render={({field}): JSX.Element => (
                        <FormItem>
                            <FormLabel>
                                {t('auth.password.label')}
                            </FormLabel>
                            <FormControl>
                                <Input type='password' {...field} required placeholder={t('auth.password.placeholder')}/>
                            </FormControl>
                            <Link className="ml-2" href={"/auth/forget-password"}>{t('auth.password.forgot')}</Link>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button type='submit'>{t('login')}</Button>
                </div>
            </Form>

            <div className="mt-8">
                <AuthSocial />
            </div>

            <div className="mt-8 flex justify-end gap-2">
                {t('page.login.anyCount')}
                <Link href={"/register"}>{t('register')}</Link>
            </div>
        </>
    );
}
'use client';

import {JSX, useEffect} from "react";
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
import {Translation} from "@types";
import {useQueryState} from "nuqs";

export default function RegisterForm(): JSX.Element
{
    const t: Translation = useTranslations();
    const router: AppRouterInstance = useRouter();

    const form: UseFormReturn<z.infer<typeof RegisterSchema>> = useForm<z.infer<typeof RegisterSchema>>({
        resolver:      zodResolver(RegisterSchema),
        defaultValues: {
            email:          "",
            pseudonym:      "",
            password:       "",
            passwordVerify: "",
            termsAccepted:  false
        },
    });

    const [fallbackUri, setFallbackUri] = useQueryState('fallback', {defaultValue: '/', clearOnDefault: true});

    useEffect(() =>
    {
        if (fallbackUri === "/")
        {
            setFallbackUri("/");
        }
    }, [fallbackUri, setFallbackUri]);

    async function onSubmit(values: z.infer<typeof RegisterSchema>): Promise<void>
    {
        await authClient.signUp.email({
            email:    values.email,
            password: values.password,
            name:     values.pseudonym
        }, {
            onSuccess: (): void =>
                       {
                           router.push(fallbackUri);
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

                <Checkbox
                    form={form}
                    label={
                        <span className="flex gap-1">
                            {t('page.register.acceptThe')}
                            <Link href={"/cgu"}>
                                {t("cgu").toLowerCase()}
                            </Link>
                        </span>
                    }
                    name={"termsAccepted"}
                />

                <div className="flex justify-end mt-2">
                    <Button type='submit' disabled={!form.watch('termsAccepted')}>
                        {t('register')}
                    </Button>
                </div>
            </Form>

            <div className="mt-8">
                <AuthSocial fallbackUri={fallbackUri} isLogin={false}/>
            </div>

            <div className="mt-8 flex justify-end gap-2">
                {t('page.register.haveCount')}
                <Link href={`/login?fallback=${fallbackUri}`}>
                    {t('login')}
                </Link>
            </div>
        </>
    );
}
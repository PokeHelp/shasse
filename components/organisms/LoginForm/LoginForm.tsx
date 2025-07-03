'use client';

import {JSX} from "react";
import {Button, Input} from "@components";
import {LoginSchema} from "@schema";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@ui/form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {signIn} from "@src/lib/auth-client";
import {useRouter} from "next/navigation";

export default function RegisterForm(): JSX.Element
{
    const router = useRouter();

    type AuthProviderEnum = Parameters<typeof signIn.social>[0]["provider"];

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver:      zodResolver(LoginSchema),
        defaultValues: {
            email:     "",
            password:  ""
        },
    });

    async function onSubmit(values: z.infer<typeof LoginSchema>)
    {
        await signIn.email({
            email: values.email,
            password: values.password
        }, {
            onSuccess: (): void => {
                router.push('/');
                router.refresh();
            },
            onError: (error): void => {
                console.log(error)
            }
        });
    }

    async function signInSocial(social: AuthProviderEnum)
    {
        await signIn.social({
            provider: social
        }, {
            onSuccess: (): void => {
                router.push('/');
                router.refresh();
            },
            onError: (error): void => {
                console.log(error)
            }
        });
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        name='email'
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type='email' {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name='password'
                        control={form.control}
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Mot de passe</FormLabel>
                                <FormControl>
                                    <Input type='password' {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button type='submit'>Connexion</Button>
                </form>
            </Form>

            <Button onClick={() => signInSocial('discord')}>Connexion via Discord</Button>
        </>
    );
}
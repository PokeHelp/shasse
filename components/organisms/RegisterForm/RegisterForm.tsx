'use client';

import {JSX} from "react";
import {Button, Input} from "@components";
import {RegisterSchema} from "@schema";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@ui/form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {signUp} from "@src/lib/auth-client";
import {useRouter} from "next/navigation";

export default function RegisterForm(): JSX.Element
{
    const router = useRouter();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver:      zodResolver(RegisterSchema),
        defaultValues: {
            email:     "",
            name: "",
            password:  ""
        },
    });

    async function onSubmit(values: z.infer<typeof RegisterSchema>)
    {
        await signUp.email({
          email: values.email,
          password: values.password,
          name: values.name
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    name='name'
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Pseudo</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
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

                <Button type='submit'>Créer</Button>
            </form>
        </Form>
    );
}
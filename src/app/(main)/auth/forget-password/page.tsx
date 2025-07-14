'use client';

import {Label} from "@ui/label";
import {Button, Input} from "@components";
import {authClient} from "@src/lib/auth-client";
import {useRouter} from "next/navigation";

export default function ForgetPasswordPage()
{
    const router = useRouter();

    async function onSubmit(formData: FormData)
    {
        const email = formData.get('email');
        await authClient.forgetPassword({
            email: String(email),
            redirectTo: '/auth/reset-password'
        }, {
           onSuccess: (): void => {
               router.push(`/auth/verify?email=${email}`);
               router.refresh();
           },
            onError: (error): void => {
                console.log(error)
            }
        });
    }

    return (
        <form action={onSubmit}>
            <Label htmlFor="email">Email</Label>
            <Input type='email' name='email'/>

            <Button type='submit'>Réinitialiser le mdp</Button>
        </form>
    )
}
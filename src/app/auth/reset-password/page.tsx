'use client';

import {useRouter, useSearchParams} from "next/navigation";
import {authClient} from "@src/lib/auth-client";
import {Label} from "@ui/label";
import {Button, Input} from "@components";

export default function ResetPasswordPage()
{
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    async function onSubmit(formData: FormData)
    {
        const password = formData.get("password");

        if (!token)
        {
            console.log('Invalid tokan');
            return;
        }

        await authClient.resetPassword({
            newPassword:      String(password),
            token
        }, {
            onSuccess: (): void =>
                       {
                           router.push("/login");
                           router.refresh();
                       },
            onError:   (error): void =>
                       {
                           console.log(error)
                       }
        });
    }

    return (
        <>
            <h1>Reset password</h1>
            <form action={onSubmit}>
                <Label>New password</Label>
                <Input type='password' name='password'/>
                <Button type="submit">Submit</Button>
            </form>
        </>
    );
}
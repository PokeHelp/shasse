'use client';

import {Label} from "@ui/label";
import {Button, Input, PageLayout} from "@components";
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
        <PageLayout>
            <div className="flex justify-center">
                <form action={onSubmit} className="flex flex-col gap-2 w-full md:w-1/3">
                    <Label htmlFor="email">Email</Label>
                    <Input type='email' name='email'/>

                    <Button type='submit' className="mt-3">Réinitialiser le mdp</Button>
                </form>
            </div>
        </PageLayout>
    )
}
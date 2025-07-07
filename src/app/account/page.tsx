import {getUser} from "@src/lib/auth-server";
import {redirect, unauthorized} from "next/navigation";
import {Check} from "lucide-react";
import {Button} from "@components";
import {auth} from "@lib";
import {headers} from "next/headers";

export default async function Auth()
{
    const user = await getUser();

    if (!user)
    {
        return unauthorized();
    }

    return (
        <>
            <p>{user.name}</p>
            <p>{user.email}</p>
            {
                user.emailVerified
                    ? <Check />
                    : <form>
                        <Button
                            type="submit"
                            formAction={async () => {
                                "use server";

                                await auth.api.sendVerificationEmail({
                                    headers: await headers(),
                                    body: {
                                        email: user.email,
                                        callbackURL: "/account"
                                    }
                                });

                                redirect(`/auth/verify?email=${user.email}`);
                            }}
                        >
                            Vérifie ton email
                        </Button>
                    </form>
            }
        </>
    )
}
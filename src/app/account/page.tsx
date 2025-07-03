import {getUser} from "@src/lib/auth-server";

export default async function Auth()
{
    const user = await getUser();

    if (!user)
    {
        return <div>Pas authorisé</div>
    }

    return (
        <>
            <p>{user.name}</p>
            <p>{user.email}</p>
        </>
    )
}
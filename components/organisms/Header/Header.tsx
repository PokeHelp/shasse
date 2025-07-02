import {Button, Link} from "@components";
import {getUser} from "@lib";
import {JSX, Suspense} from "react";
import {DropdownMenu, DropdownMenuTrigger} from "@ui/dropdown-menu";
import {Avatar, AvatarFallback} from "@ui/avatar";

export const Header: () => JSX.Element = (): JSX.Element => {
    return (
        <header className="flex items-center gap-4 px-4 py-2 border-b">
            <Link href='/' className='flex-1'>PokeHelp</Link>
            <Suspense fallback={<Skeleton/>}>
                <AuthButton/>
            </Suspense>
        </header>
    )
}

// 20.30

const AuthButton: () => Promise<JSX.Element> = async (): Promise<JSX.Element> => {
    const user = await getUser();

    if (!user)
    {
        return <Link href={'/login'}>Login</Link>
    }

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button>
                <Avatar>
                    <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <p>{user.name}</p>
            </Button>
        </DropdownMenuTrigger>
    </DropdownMenu>
}

const Skeleton = () => {
    return <div>Wait</div>
}
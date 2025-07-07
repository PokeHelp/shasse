import {Button, Link} from "@components";
import {JSX, Suspense} from "react";
import {getUser} from "@src/lib/auth-server";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@ui/avatar";
import {LogOut, User2} from "lucide-react";
import {signOutAction} from "@src/actions/signout";

export const Header: () => JSX.Element = (): JSX.Element =>
{
    return (
        <header className="flex items-center gap-4 px-4 py-2 border-b">
            <Link href='/' className='flex-1'>PokeHelp</Link>
            <Suspense fallback={<Skeleton/>}>
                <AuthButton/>
            </Suspense>
        </header>
    )
}

const AuthButton = async () =>
{
    const user = await getUser();

    if (!user)
    {
        return (
            <Link href={'/register'}>
                Inscription
            </Link>
        );
    }

    console.log(user)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>
                    <Avatar>
                        {user.image
                            ? <AvatarImage src={user.image}/>
                            : <AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
                        }
                    </Avatar>
                    <p>{user.name}</p>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <Link href={'/account'} className='flex items-center gap-2'>
                        <User2 className='size-3'/>
                        Mon compte
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <form action={signOutAction}>
                        <button type="submit" className='flex items-center gap-2 w-full'>
                            Déconnexion
                            <LogOut className='size-4'/>
                        </button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const Skeleton = () =>
{
    return <div className='bg-red-950 h-10 w-20'></div>
}
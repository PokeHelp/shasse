import {Button, Link} from "@components";
import {JSX, Suspense} from "react";
import {getUser} from "@src/lib/auth-server";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@ui/avatar";
import {LogOut, User2, House} from "lucide-react";
import {signOutAction} from "@src/actions/signout";

export default function Header(): JSX.Element
{
    return (
        <header
            className="flex items-center gap-4 px-4 py-2 border-b fixed top-0 w-full z-9999 bg-background justify-between">
            <div className="flex gap-5">
                <Link href='/' className="hidden sm:block">PokeHelp</Link>
                <Link href='/' className="block sm:hidden"><House/></Link>
                <Link href={"/pokedex"}>Pokédex</Link>
                <Link href={"/hunting"} className="hidden sm:block">Mes shasses</Link>
                <Link href={"/hunting/create"} className="hidden sm:block">Créer une shasse</Link>
                <DropdownMenu>
                    <DropdownMenuTrigger className="block sm:hidden text-primary cursor-pointer">
                        Shasses
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem asChild>
                            <Link href={"/hunting"}>Mes shasses</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={"/hunting/create"}>Créer un shasse</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
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
import {JSX} from "react";
import {Link, PageLayout, Picture, Typography} from "@components";
import {getRequiredUser} from "@src/lib/auth-server";
import {getAllOwnedPokemon, getLastOwnedPokemonCreated} from "@service";
import {OwnedPokemon, OwnedSumarry, User} from "@types";
import {getPokemonPictureFromId} from "@utils";
import {Plus} from "lucide-react";

export default async function CreateHuntingPage(): Promise<JSX.Element>
{
    const user: User = await getRequiredUser();
    const ownedPokemonsSummary: OwnedSumarry[] = await getAllOwnedPokemon(user.id);
    const ownedPokemon: OwnedPokemon = await getLastOwnedPokemonCreated(user.id);

    return (
        <PageLayout>
            <div className="flex h-full items-center ml-2">
                <Typography as="section" className="border-2 border-primary rounded w-fit p-3 flex flex-col gap-2">
                    {
                        ownedPokemonsSummary.map((ownedSumarry: OwnedSumarry): JSX.Element => (
                            <Picture
                                className="border border-primary p-2 rounded-full cursor-pointer hover:bg-primary"
                                key={ownedSumarry.id}
                                alt={`Image de la shasse de ${ownedSumarry.pokemonName}`}
                                width={48}
                                height={48}
                                src={getPokemonPictureFromId({
                                    internationalNumber: ownedSumarry.internationalNumber,
                                    formId:              ownedSumarry.formId
                                })}
                            />
                        ))
                    }
                    <Link href={"/hunting/create"}
                          className="border border-primary p-2 rounded-full cursor-pointer text-primary hover:bg-primary hover:text-background">
                        <Plus height={32} width={32}/>
                    </Link>
                </Typography>
            </div>

            <div>

            </div>
        </PageLayout>
    );
}
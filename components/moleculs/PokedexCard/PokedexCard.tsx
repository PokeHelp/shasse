'use client';

import {useState, JSX, useEffect} from "react";
import {Card, CardFooter} from "@ui/card";
import {PokedexCardProps} from "@typesFront";
import {useTranslations} from "next-intl";
import {getPokemonPictureFromId, getTypePictureById} from "@utils";
import {Picture, Slider, Typography} from "@components";
import {PokemonDetailSlider} from "@components";
import {cn} from "@lib";
import {OwnedPokemonDetail, OwnedPokemonIdByUser, Translation, Type} from "@types";
import {SheetTitle} from "@ui/sheet";
import {getOwnedDetailById} from "@service";

export default function PokedexCard({
                                        pokemon,
                                        formId,
                                        pictureStyle = "Artwork",
                                        pictureClassName,
                                        showTypes = true,
                                        ownedPokemons = [],
                                        userId = '',
                                        haveOwnedPokemons = false,
                                        ...other
                                    }: PokedexCardProps): JSX.Element
{
    const t: Translation = useTranslations();
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
    const [ownedId, setOwnedId] = useState<number | null>(null);
    const [ownedPokemonDetail, setOwnedPokemonDetail] = useState<OwnedPokemonDetail | null>(null);

    useEffect(() =>
    {
        if (ownedPokemons.length > 0)
        {
            setOwnedId(ownedPokemons[0].id);
        }
    }, [ownedPokemons]);


    useEffect(() =>
    {
        if (showTypes || userId === '' || ownedPokemons.length === 0 || ownedId === null) return;

        ((async () =>
        {
            setOwnedPokemonDetail(await getOwnedDetailById(ownedId, userId));
        }))()
    }, [ownedId, showTypes, userId, ownedPokemons])

    console.log(ownedPokemons);

    return (
        <>
            <Card {...other} className="border border-primary w-fit p-0 relative gap-0">
                <div className="absolute justify-center top-0 translate-y-[-18px] flex"
                     style={{width: '-webkit-fill-available'}}>
                    <div className="text-[24px] p-2 py-0.5 border border-primary bg-background rounded">
                        {pokemon.internationalNumber}
                    </div>
                </div>
                <div
                    className="cursor-pointer"
                    onClick={(): void => setIsSheetOpen(true)}
                >
                    <Picture
                        src={getPokemonPictureFromId({
                            internationalNumber: pokemon.internationalNumber,
                            formId,
                            style:               pictureStyle
                        })}
                        alt={t('pokemonPictureAlt', {pokemonName: pokemon.name})}
                        width={250}
                        height={250}
                        className={cn("pt-7 p-4", pictureClassName)}
                        key={pokemon.id}
                    />
                    <hr className="border-primary"/>
                    <CardFooter className="p-0 justify-around py-4">
                        {pokemon.name}
                        {
                            showTypes && (
                                <div className="flex gap-2">
                                    {pokemon.types.map((type): JSX.Element => (
                                        <Picture
                                            src={getTypePictureById(type.id)}
                                            width={25}
                                            height={25}
                                            title={type.name}
                                            alt={t('typePictureAlt', {typeName: type.name})}
                                            key={type.id}
                                        />
                                    ))}
                                </div>
                            )
                        }
                    </CardFooter>
                </div>
            </Card>

            {isSheetOpen && showTypes && (<PokemonDetailSlider
                pokemonId={pokemon.id}
                isOpen={isSheetOpen}
                onClose={(): void => setIsSheetOpen(false)}
            />)}

            {
                isSheetOpen && !showTypes && haveOwnedPokemons && (
                    <Slider open={isSheetOpen} onOpenChange={(): void => setIsSheetOpen(false)}
                            SliderHeader={<SheetTitle>Informations de votre Pokémon</SheetTitle>}>
                        <div className="grid gap-4">
                            <Typography as="h2">#{pokemon.internationalNumber} - {pokemon.name}</Typography>

                            {/* Pokemon picture */}
                            <div className="flex justify-center">
                                <Picture
                                    key={pokemon.id}
                                    src={getPokemonPictureFromId(
                                        {
                                            internationalNumber: pokemon.internationalNumber,
                                            formId:              1,
                                            style:               "Game",
                                            gameId:              ownedPokemonDetail?.gameId,
                                            isShiny:             true
                                        }
                                    )}
                                    alt={pokemon.name}
                                    width={300}
                                    height={300}
                                />
                            </div>

                            {/* Pokemon info */}
                            <div className="flex gap-4 w-full flex-col">
                                {/* Pokemon type */}
                                <div className="flex items-center justify-between">
                                    <Typography as={'h3'}>{t('type.name')}</Typography>
                                    <div className="flex gap-2">
                                        {
                                            pokemon.types.map((type: Type): JSX.Element => (
                                                <Picture
                                                    key={type.id}
                                                    src={getTypePictureById(type.id, "fullName")}
                                                    alt={type.name}
                                                    width={88}
                                                    height={40}
                                                />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* Owned liste */}
                            {
                                ownedPokemons.length > 1 && (
                                    <div>
                                        <Typography as={'h3'}>Captures effectués :</Typography>
                                        <ul className="ms-4">
                                            {
                                                ownedPokemons.map((owned: OwnedPokemonIdByUser): JSX.Element => (
                                                    <li key={owned.id} className="text-primary cursor-pointer select-none"
                                                        onClick={(): void => setOwnedId(owned.id)}>
                                                        {pokemon.name} - {owned.huntingMethodName}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )
                            }

                            <Typography as="section" className="flex flex-col gap-3">
                                {
                                    ownedPokemonDetail && ownedPokemonDetail.meetingNumber > 0 && (
                                        <Typography>
                                            Nombre de rencontre: <strong>{ownedPokemonDetail.meetingNumber}</strong>
                                        </Typography>
                                    )
                                }
                                {
                                    ownedPokemonDetail && ownedPokemonDetail.time > 0 && (
                                        <Typography>
                                            Durée de la rencontre: <strong>{ownedPokemonDetail.time}</strong>
                                        </Typography>
                                    )
                                }
                                <Typography>
                                    Méthode de shasse: <strong>{ownedPokemonDetail?.huntingMethodName}</strong>
                                </Typography>
                            </Typography>
                        </div>
                    </Slider>
                )
            }
        </>
    );
}
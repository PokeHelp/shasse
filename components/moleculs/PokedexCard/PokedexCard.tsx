'use client';

import {useState, JSX} from "react";
import {Card, CardFooter} from "@ui/card";
import {PokedexCardProps} from "@typesFront";
import {useTranslations} from "next-intl";
import {getPokemonPictureFromId, getTypePictureById} from "@utils";
import {Picture} from "@components";
import {PokemonDetailSlider} from "@components";

export default function PokedexCard({pokemon, formId, ...other}: PokedexCardProps): JSX.Element
{
    const t = useTranslations('pokedex.card');
    const [isSheetOpen, setIsSheetOpen] = useState(false);

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
                        src={getPokemonPictureFromId({internationalNumber: pokemon.internationalNumber, formId}, "Artwork")}
                        alt={t('pokemonPictureAlt', {pokemonName: pokemon.name})}
                        width={250}
                        height={250}
                        className="pt-7 p-4"
                        key={pokemon.id}
                    />
                    <hr className="border-primary"/>
                    <CardFooter className="p-0 justify-around py-4">
                        {pokemon.name}
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
                    </CardFooter>
                </div>
            </Card>

            {isSheetOpen && (<PokemonDetailSlider
                pokemonId={pokemon.id}
                isOpen={isSheetOpen}
                onClose={(): void => setIsSheetOpen(false)}
            />)}
        </>
    );
}
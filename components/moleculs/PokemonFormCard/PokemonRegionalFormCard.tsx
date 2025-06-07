import {JSX} from "react";
import {RegionalFormWithName} from "@types";
import {Card, CardFooter} from "@ui/card";
import {Picture} from "@components";
import {getPokemonPictureFromId} from "@utils";
import {useTranslations} from "next-intl";
import {redirect} from "next/navigation";

export default function PokemonRegionalFormCard({regionalForms}: {regionalForms: RegionalFormWithName[]}): JSX.Element
{
    const t = useTranslations();

    regionalForms = regionalForms.filter(
        (objet: RegionalFormWithName, index: number, tableau: RegionalFormWithName[]): boolean =>
            index === tableau.findIndex((o: RegionalFormWithName): boolean => o.id === objet.id)
    );

    return (
        <div>
            <h2>{t("regionalForms.title")}</h2>
            <div className="flex justify-evenly">
                {
                    regionalForms.map((regionalForm: RegionalFormWithName): JSX.Element => (
                        <Card key={regionalForm.id} className="border border-primary h-fit p-0 gap-0 cursor-pointer"
                              onClick={(): void => {
                                  redirect(`/pokemon/${regionalForm.id}`);
                              }}
                        >
                            <Picture
                                src={getPokemonPictureFromId({internationalNumber: regionalForm.internationalNumber, formId: regionalForm.formId, style: 'Artwork'})}
                                alt={t('pokemonPictureAlt', {pokemonName: regionalForm.name})}
                                width={250}
                                height={250}
                                className="pt-7 p-4"
                                key={regionalForm.id}
                            />
                            <hr className="border-primary"/>
                            <CardFooter className="p-0 justify-around py-4">
                                {regionalForm.name}
                            </CardFooter>
                        </Card>
                    ))
                }
            </div>
        </div>
    )
}
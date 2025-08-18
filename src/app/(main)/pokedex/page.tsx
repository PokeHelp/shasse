import {JSX} from "react";
import {PageLayout, Pokedex, Typography} from "@components";
import {getTranslations} from "next-intl/server";

export default async function PokedexPage(): Promise<JSX.Element>
{
    const t = await getTranslations();

    return (
        <PageLayout>
            <Typography as={"h1"} className="mb-3">
                {t('pokedex')}
            </Typography>
            <Pokedex />
        </PageLayout>
    )
}
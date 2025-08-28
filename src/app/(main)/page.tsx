import {useTranslations} from 'next-intl';
import {JSX} from "react";
import {PageLayout, Typography} from "@components";

/**
 * Page: /
 *
 * @constructor
 */
export default function HomePage(): JSX.Element
{
    const t = useTranslations('page.home');

    return (
        <PageLayout>
            <Typography as={"h1"} className={"text-3xl font-bold underline"}>
                {t('title')}
            </Typography>
        </PageLayout>
    );
}

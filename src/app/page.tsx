import {useTranslations} from 'next-intl';
import {JSX} from "react";

/**
 * Page: /
 *
 * @constructor
 */
export default function HomePage(): JSX.Element
{
    const t = useTranslations('HomePage');

    return (
        <h1 className={"text-3xl font-bold underline"}>{t('title')}</h1>
    );
}

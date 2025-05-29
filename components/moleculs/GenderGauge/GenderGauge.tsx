import {JSX} from "react";
import {cn} from "@lib";
import {GenderGaugeProps} from "@typesFront";
import {useTranslations} from "next-intl";

export default function GenderGauge({maleRate, femelleRate, ...other}: GenderGaugeProps): JSX.Element
{
    const t = useTranslations();

    if (maleRate == 0 && femelleRate == 0)
    {
        return <>{t("gender.assexual")}</>
    } else
    {
        return (
            <>
                {maleRate}
                <div {...other} className={cn("bg-pink-400 rounded-full h-2", other.className)}>
                    <div className="rounded-l-full bg-blue-500 h-full" style={{width: `${maleRate}%`}}></div>
                </div>
                {femelleRate}
            </>

        );
    }
}
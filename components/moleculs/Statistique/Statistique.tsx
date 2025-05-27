import {JSX} from "react";
import {Typography} from "@components";
import {Statistic, PokemonInfoDetail} from "@types";
import {useTranslations} from "next-intl";

export default function Statistique({pokemon}: { pokemon: PokemonInfoDetail }): JSX.Element
{
    const t = useTranslations("stats");

    return (
        <div className="flex flex-col gap-3">
            <Typography type={"h3"} className="font-bold">{t('name')}</Typography>
            <div className="pl-4">
                {
                    pokemon.statistics.map((statistic: Statistic): (JSX.Element | undefined)[] => (
                        Object.entries(statistic).map(([name, value]: [string, number]): JSX.Element | undefined =>
                        {
                            if (!['id', 'generationId'].includes(name))
                            {
                                if (value > 0)
                                {
                                    return (
                                        <div key={name} className="grid grid-cols-2">
                                            <span className="font-medium">{t(name)}</span>
                                            <span className="font-medium">{value}</span>
                                        </div>
                                    )
                                }
                            }
                        })
                    ))
                }
                <div className="grid grid-cols-2" title={t('bstTitle')}>
                    <span className="font-medium">{t(`bst`)}</span>
                    <span className="font-medium">
                    {
                        pokemon.statistics[0].pv +
                        pokemon.statistics[0].attack +
                        pokemon.statistics[0].defense +
                        pokemon.statistics[0].specialAttack +
                        pokemon.statistics[0].specialDefense +
                        pokemon.statistics[0].speed +
                        pokemon.statistics[0].special
                    }
                    </span>
                </div>
            </div>
        </div>
    );
};
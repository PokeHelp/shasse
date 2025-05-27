import {EvolutionNode, EvolutionTree} from "@types";
import {JSX} from "react";
import {getPokemonPictureFromId} from "@utils";
import {Picture} from "@components";
import {useTranslations} from "next-intl";

type Evolution = EvolutionNode | EvolutionTree;

export default function Evolution({pokes}: { pokes: Evolution[] }): JSX.Element
{
    const t = useTranslations();
    const isMerged: boolean = pokes.reduce((acc: string[], curr: Evolution): string[] =>
    {
        const el: string = curr.evos.map((e: EvolutionNode): string => e.evolutionName).join('-');
        if (!acc.includes(el)) acc.push(el)
        return acc
    }, []).length === 1;

    return (
        <div className="h-full flex gap-2 justify-evenly flex-1">
            <div className="h-full flex flex-col gap-2 justify-center flex-1">
                {pokes.map((poke: Evolution): JSX.Element =>
                {
                    const pokemonName: string = 'pokemonName' in poke ? poke.pokemonName : poke.evolutionName;
                    return (
                        <div key={pokemonName} className="flex gap-2 flex-col">
                            <div className="flex gap-2 items-center justify-center">
                                <Picture
                                    src={getPokemonPictureFromId({internationalNumber: poke.internationalNumber, formId: poke.formId}, "Artwork")}
                                    alt={t('pokemonPictureAlt', {pokemonName})}
                                    width={85}
                                    height={85}
                                    title={pokemonName}
                                />
                            </div>
                            {
                                'evolutionName' in poke && (
                                    <p className="text-center">
                                        {poke.methodName}{poke.level > 0 ? ` - ${poke.level}` : ''} <br/>
                                        {poke.infoId !== 1 ? poke.infoName : ''}
                                    </p>
                                )}
                        </div>
                    );
                })}
            </div>
            <div className={`h-full flex flex-col gap-2 flex-${pokes[0] ? pokes[0].evos.length : 1}`}>
                {isMerged ? (
                    pokes[0].evos.length > 0 ? (
                        <Evolution pokes={pokes[0].evos}></Evolution>
                    ) : <div className="h-full"></div>
                ) : (
                    <>
                        {pokes.map((poke: Evolution, index: number): JSX.Element => (
                            poke.evos.length > 0
                                ? <Evolution key={`evo-${index}`} pokes={poke.evos}/>
                                : <div key={`empty-${index}`} className="h-full"/>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};
import {Button} from "@components";
import {JSX} from "react";
import {useTranslations} from "next-intl";
import {GenerationChoiceProps} from '@typesFront';
import {cn} from "@lib";

export default function GenerationChoice({
                                             possibleGenerations,
                                             generationSelecter,
                                             generationSelected,
                                             className,
                                         }: GenerationChoiceProps): JSX.Element
{
    const t = useTranslations('generation');

    return (
        <div className={cn("flex gap-2 w-full mr-3 items-center fixed p-2 bg-background z-[2]", className)}>
            {t('choice')}
            {possibleGenerations.map((generation: string): JSX.Element => (
                <Button
                    onClick={(): void => generationSelecter(generation)}
                    key={generation}
                    fill={generationSelected === generation}
                    className="rounded-full"
                >
                    {generation}
                </Button>
            ))}
        </div>
    );
}
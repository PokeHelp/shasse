import {Button, Typography} from "@components";
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
        <div className={cn("flex gap-2 md:mr-3 items-center fixed p-2 bg-background z-[2] top-10 flex-col md:flex-row w-full md:w-fit", className)}>
            {t('choice')}
            <Typography as={"section"}>
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
            </Typography>

        </div>
    );
}
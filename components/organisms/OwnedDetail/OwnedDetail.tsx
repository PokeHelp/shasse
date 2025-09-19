'use client';

import {JSX, useEffect, useState} from "react";
import {OwnedPokemon, OwnedSumarry} from "@types";
import {
    Button,
    Picture,
    Typography,
    Switch,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    Input,
    FormMessage, FormField, Link
} from "@components";
import {formatSecondsToHMS, getPokemonPictureFromId, useZodForm} from "@utils";
import {UseFormReturn} from "react-hook-form";
import {CounterHuntingSchema} from "@schema";
import {z} from "zod";
import {Timeout} from "@radix-ui/primitive";
import {getAllOwnedPokemon, getOwnedPokemon, updateOwned} from "@service";
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger} from "@ui/dialog";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {useQueryState} from "nuqs";
import {cn} from "@lib";
import {Plus} from "lucide-react";

export default function OwnedDetail({userId}: { userId: string }): JSX.Element
{
    const [ownedPokemonsSummary, setOwnedPokemonsSummary] = useState<OwnedSumarry[]>([]);
    const [ownedPokemon, setOwnedPokemon] = useState<OwnedPokemon | null>(null);

    const [huntingId, setHuntingId] = useQueryState("huntingId");

    useEffect(() =>
    {
        (async () =>
        {
            setOwnedPokemonsSummary(await getAllOwnedPokemon(userId));
            setOwnedPokemon(await getOwnedPokemon(userId, Number(huntingId)));
        })();
    }, [userId, huntingId]);

    const form: UseFormReturn<z.infer<typeof CounterHuntingSchema>> =
              useZodForm(CounterHuntingSchema, {
                  defaultValues: {
                      useTimer:       false,
                      meetingNumber:  ownedPokemon?.meetingNumber ?? 0,
                      time:           ownedPokemon?.time ?? 0,
                      timerActivated: false,
                      nickname:       ownedPokemon?.pokemonName ?? "",
                  },
              });

    useEffect(() =>
    {
        if (ownedPokemon)
        {
            form.reset({
                useTimer:       false,
                meetingNumber:  ownedPokemon.meetingNumber,
                time:           ownedPokemon.time,
                timerActivated: false,
                nickname:       ownedPokemon.pokemonName,
            });
        }
    }, [ownedPokemon, form]);

    const useTimer: boolean = form.watch("useTimer");
    const meetingNumber: number = form.watch("meetingNumber");
    const time: number = form.watch("time");
    const timerActivated: boolean = form.watch("timerActivated");
    const router: AppRouterInstance = useRouter();

    useEffect((): (() => void) | undefined =>
    {
        if (!timerActivated) return;

        const interval: Timeout = setInterval((): void =>
        {
            const current: number = form.getValues("time");
            form.setValue("time", current + 1, {shouldDirty: true});
        }, 1000);

        return (): void => clearInterval(interval);
    }, [timerActivated, form]);

    const onClick: (isFinish: boolean) => Promise<void> = async (isFinish: boolean): Promise<void> =>
    {
        if (!ownedPokemon) return;

        form.setValue("timerActivated", false);

        const response: {
            status: string
        } = await updateOwned(ownedPokemon.id, meetingNumber, time, isFinish, form.getValues("nickname"))

        if (response.status === 'success')
        {
            if (isFinish)
            {
                router.push('/livingdex');
            } else
            {
                toast("Votre compteur à été mis à jour avec succès")
            }
        } else
        {
            toast("Une erreur est survenue, veuillez-réessayer.");
        }
    }

    return (
        <div className="flex flex-col sm:flex-row items-center w-full">
            <Typography as="section" className="border-2 border-primary rounded w-fit h-fit p-3 flex flex-row sm:flex-col gap-2">
                {
                    ownedPokemonsSummary.map((ownedSumarry: OwnedSumarry): JSX.Element => (
                        <Picture
                            className={cn("border p-2 rounded-full",
                                ownedPokemon?.id === ownedSumarry.id ? "border-secondary" : "cursor-pointer border-primary hover:bg-primary")}
                            key={ownedSumarry.id}
                            alt={`Image de la shasse de ${ownedSumarry.pokemonName}`}
                            width={48}
                            height={48}
                            src={getPokemonPictureFromId({
                                internationalNumber: ownedSumarry.internationalNumber,
                                formId:              ownedSumarry.formId
                            })}
                            onClick={() =>
                            {
                                setHuntingId(ownedSumarry.id.toString())
                            }}
                        />
                    ))
                }
                <Link href={"/hunting/create"}
                      className="border border-primary p-2 rounded-full cursor-pointer text-primary hover:bg-primary hover:text-background">
                    <Plus height={32} width={32}/>
                </Link>
            </Typography>

            <Typography as="section"
                        className="flex-1 p-3 m-3 h-full flex gap-2 justify-center items-center flex-col">
                {
                    ownedPokemon === null ? (
                        <Typography as="h1">Aucune shasse trouvée, veuillez en créer une.</Typography>
                    ) : (
                        <>
                            <Typography
                                as="h1">{ownedPokemon.internationalNumber} - {ownedPokemon.pokemonName}</Typography>
                            <Picture
                                alt={`Image de la shasse de ${ownedPokemon.pokemonName}`}
                                width={124}
                                height={124}
                                src={getPokemonPictureFromId({
                                    internationalNumber: ownedPokemon.internationalNumber,
                                    formId:              ownedPokemon.formId,
                                    isShiny:             ownedPokemon.spriteInShiny,
                                    gameId:              ownedPokemon.gameId,
                                    style:               "Game",
                                })}
                            />
                            <Typography as="section" className="h-full w-full flex justify-center">
                                <div className="w-fit flex items-center flex-col gap-4">
                                    <Switch
                                        labelName="Utiliser un timer"
                                        checked={form.getValues("useTimer")}
                                        onCheckedChange={(checked: boolean) =>
                                        {
                                            form.setValue("useTimer", checked)
                                        }}
                                    />

                                    {useTimer ? (
                                        <Typography as="section" className="flex flex-col gap-2 p-0">
                                            <Typography className="text-4xl">
                                                {formatSecondsToHMS(time)}
                                            </Typography>
                                            <Button
                                                className="w-full text-2xl h-12"
                                                onClick={() =>
                                                {
                                                    form.setValue("timerActivated", !timerActivated)
                                                }}
                                            >
                                                {timerActivated ? "Pause" : "Start"}
                                            </Button>
                                        </Typography>
                                    ) : (
                                        <>
                                            <Typography className="text-4xl">
                                                {meetingNumber}
                                            </Typography>
                                            <div className="flex gap-2">
                                                <Button
                                                    onClick={() => form.setValue("meetingNumber", Math.max(meetingNumber - 1, 0))}
                                                    className="text-3xl h-12 w-16">
                                                    -1
                                                </Button>
                                                <Button
                                                    onClick={() => form.setValue("meetingNumber", meetingNumber + 1)}
                                                    className="text-3xl h-12 w-16">
                                                    +1
                                                </Button>
                                            </div>
                                        </>
                                    )}

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="w-full h-11 text-xl">
                                                <Picture
                                                    src={"/image/shiny.png"}
                                                    alt="Image d'obtention d'un pokémon shiny"
                                                    height={38}
                                                />
                                                Shiny !
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent onOpenAutoFocus={(e: Event): void => e.preventDefault()}>
                                            <DialogTitle>Fin de la shasse</DialogTitle>

                                            <Form form={form} callback={(): Promise<void> => onClick(true)}>
                                                <FormField
                                                    name='nickname'
                                                    control={form.control}
                                                    render={({field}): JSX.Element => (
                                                        <FormItem className="mb-4">
                                                            <FormLabel>Pseudo du pokémon</FormLabel>
                                                            <FormControl>
                                                                <Input type='text' {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />

                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button
                                                            className="text-destructive border-destructive hover:bg-destructive">Fermer</Button>
                                                    </DialogClose>
                                                    <Button variant="success" type="submit">
                                                        Valider
                                                    </Button>
                                                </DialogFooter>
                                            </Form>
                                        </DialogContent>
                                    </Dialog>

                                    <Button className="text-secondary border-secondary hover:bg-secondary w-full"
                                            onClick={(): Promise<void> => onClick(false)}
                                    >
                                        Enregister
                                    </Button>
                                </div>
                            </Typography>
                        </>
                    )
                }
            </Typography>
        </div>
    );
}

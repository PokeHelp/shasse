'use client';

import {JSX, useMemo} from "react";
import {axiosService} from "@lib";
import {useMutation, useQuery} from "@tanstack/react-query";
import {
    Button,
    Checkbox, DatePicker,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage, Input,
    SelectWithSearch, Separator, TableWithFilter, TimeInput, Typography
} from "@components";
import {useTranslations} from "next-intl";
import {
    CreateHuntingResponse,
    FormWithNamesResponse, GameLocationName, GameLocationNameResponse,
    Translation,
    TranslationIdNames,
    TranslationIdNamesResponse
} from "@types";
import {UseFormReturn} from "react-hook-form";
import {HuntingCreateSchema} from "@schema";
import {z} from "zod";
import {useZodForm} from "@utils";
import {CustomColumnDefTable, SelectWithSearchData} from "@typesFront";
import {CellContext} from "@tanstack/table-core";
import {Popover, PopoverContent, PopoverTrigger} from "@ui/popover";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";
import {AxiosResponse} from "axios";

const handlePokemonNames: () => Promise<TranslationIdNamesResponse> = async (): Promise<TranslationIdNamesResponse> =>
{
    const {data} = await axiosService.get('/api/pokemons/allName');
    return data;
};

const fetchGameNamesByPokemon: (pokemonId: string) => Promise<TranslationIdNamesResponse> = async (pokemonId: string): Promise<TranslationIdNamesResponse> =>
{
    const {data} = await axiosService.get(`/api/games/allName?pokemonId=${pokemonId}`);
    return data;
};

const fetchPokemonForms: (pokemonId: string) => Promise<FormWithNamesResponse> = async (pokemonId: string): Promise<FormWithNamesResponse> =>
{
    const {data} = await axiosService.get(`/api/pokemons/${pokemonId}/forms`);
    return data;
};

const fetchLocations: (gameId: number | null, pokemonId: number, formId: number | null) => Promise<GameLocationNameResponse> = async (gameId: number | null, pokemonId: number, formId: number | null): Promise<GameLocationNameResponse> =>
{
    const params = new URLSearchParams();

    if (gameId) params.append("gameId", gameId.toString());
    if (pokemonId) params.append("pokemonId", pokemonId.toString());
    if (formId) params.append("formId", formId.toString());

    const {data} = await axiosService.get(`/api/locations?${params.toString()}`);
    return data;
};


export default function CreateShinyHuntingPage(): JSX.Element
{
    const router: AppRouterInstance = useRouter();
    const t: Translation = useTranslations();

    const {data: dataPokemonName, isLoading: isLoadingPokemonName, error: errorPokemonName} = useQuery({
        queryKey: ['allPokemonName'],
        queryFn:  (): Promise<TranslationIdNamesResponse> => handlePokemonNames(),
    });

    const form: UseFormReturn<z.infer<typeof HuntingCreateSchema>> = useZodForm(HuntingCreateSchema, {
        defaultValues: {
            isFinish:      false,
            useCC:         false,
            createdAt:     new Date(),
            meetingNumber: 0,
            spriteInShiny: true,
            time:          0,
            finishAt:      null
        }
    });

    const pokemon: TranslationIdNames = form.watch("pokemon");

    const {data: dataForm} = useQuery({
        queryKey: ["pokemonForm", pokemon?.id.toString()],
        queryFn:  (): Promise<FormWithNamesResponse> => fetchPokemonForms(pokemon?.id.toString()),
        enabled:  !!pokemon,
    });

    const {data: dataGameName, isLoading: isLoadingGameName, error: errorGameName} = useQuery({
        queryKey: ['allGameName', pokemon?.id.toString()],
        queryFn:  (): Promise<TranslationIdNamesResponse> => fetchGameNamesByPokemon(pokemon?.id.toString()),
        enabled:  !!pokemon,
    });

    const {
              mutate: mutateLocations,
              data:   dataLocations
          } = useMutation({
        mutationFn: ({gameId, pokemonId, formId}: {
            gameId: number | null;
            pokemonId: number;
            formId: number | null
        }) =>
                        fetchLocations(gameId, pokemonId, formId),
    });

    async function onSubmit(): Promise<void>
    {
        const gameId: number | null = form.getValues("gameId") ?? null;
        const pokemonId: number | null = form.getValues("pokemon.id") ?? null;
        const formId: number | null = form.getValues("formId") ?? null;

        if (pokemonId === null)
        {
            form.setError("pokemon", {
                type:    "manual",
                message: "Tu dois choisir un Pokémon pour chercher une shasse",
            });
        }

        mutateLocations({
            gameId:    gameId,
            pokemonId: pokemonId,
            formId:    formId,
        });
    }

    const pokemonNames: TranslationIdNames[] = useMemo((): TranslationIdNames[] =>
    {
        return dataPokemonName?.success ? dataPokemonName.data : [];
    }, [dataPokemonName]);

    const gameNames: TranslationIdNames[] = useMemo((): TranslationIdNames[] =>
    {
        return dataGameName?.success ? dataGameName.data : [];
    }, [dataGameName]);

    const locations: GameLocationName[] = useMemo((): GameLocationName[] =>
    {
        return dataLocations?.success ? dataLocations.data : [];
    }, [dataLocations]);

    const formNames: TranslationIdNames[] = useMemo((): TranslationIdNames[] =>
    {
        return dataForm?.success ? dataForm.data : [];
    }, [dataForm]);

    const selectLocation: (row: GameLocationName) => void = async (row: GameLocationName): Promise<void> =>
    {
        const isFinish: boolean = form.getValues("isFinish");

        const response: AxiosResponse<CreateHuntingResponse, CreateHuntingResponse> = await axiosService.post('/api/huntings', {
            useCC:                 form.getValues("useCC"),
            isFinish:              isFinish,
            finishAt:              form.getValues("finishAt"),
            meetingNumber:         Number(form.getValues("meetingNumber")),
            time:                  form.getValues("time"),
            createdAt:             form.getValues("createdAt"),
            spriteInShiny:         form.getValues("spriteInShiny"),
            pokemonGameLocationId: row.id,
            nickname:              form.getValues("nickname")
        });

        if (response.status === 200 && response.data.success)
        {
            router.push(isFinish ? "/livingdex" : `/hunting?owned=${response.data.data.ownedId}`);
        }
    }

    function getGameLocationColumns(): CustomColumnDefTable<GameLocationName>[]
    {
        return [
            {
                header:      t("game"),
                accessorKey: "gameName",
                cell:        ({row}: CellContext<GameLocationName, unknown>): JSX.Element =>
                                 <div className="font-medium">{row.original.gameName}</div>,
                filter:      true
            },
            {
                header:      t("obtationType"),
                accessorKey: "huntingMethodName",
                cell:        ({row}: CellContext<GameLocationName, unknown>): JSX.Element =>
                                 <div className="font-medium">{row.original.huntingMethodName}</div>,
                filter:      true
            },
            {
                header:      t("rate"),
                accessorKey: "rate",
                cell:        ({row}: CellContext<GameLocationName, unknown>): JSX.Element =>
                                 <div className="font-medium">{row.original.rate} %</div>
            },
            {
                header:      t("level"),
                accessorKey: "minLevel",
                cell:        ({row}: CellContext<GameLocationName, unknown>): JSX.Element =>
                             {
                                 const level: number = row.original.minLevel === row.original.maxLevel ? row.original.minLevel : row.original.minLevel - row.original.maxLevel;
                                 return <div className="font-medium">{level}</div>
                             }
            },
            {
                header:             t("moreInfo"),
                accessorKey:        "moreInfo",
                enableColumnFilter: false,
                cell:               ({row}: CellContext<GameLocationName, unknown>): JSX.Element =>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button>
                                                    +
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                {/* Limit */}
                                                <div
                                                    className="flex gap-2 justify-between border-b-1 border-primary pb-2 mb-2">
                                                    <Typography as={"h3"}
                                                                className="font-bold">{t('limit')}:</Typography>
                                                    <div>{row.original.limit}</div>
                                                </div>

                                                {/* Condition */}
                                                <div
                                                    className="flex gap-2 justify-between border-b-1 border-primary pb-2 mb-2">
                                                    <Typography as={"h3"}
                                                                className="font-bold">{t('condition')}:</Typography>
                                                    <div>{row.original.conditionName}</div>
                                                </div>

                                                {/* Détails */}
                                                <div
                                                    className="flex gap-2 justify-between border-b-1 border-primary pb-2 mb-2">
                                                    <Typography as={"h3"}
                                                                className="font-bold">{t('detail')}:</Typography>
                                                    <div>{row.original.detailName}</div>
                                                </div>

                                                {/* Météo */}
                                                <div
                                                    className="flex gap-2 justify-between border-b-1 border-primary pb-2 mb-2">
                                                    <Typography as={"h3"}
                                                                className="font-bold">{t('meteo')}:</Typography>
                                                    <div>{row.original.meteoName}</div>
                                                </div>

                                                {/* IsAlpha */}
                                                <div className="flex gap-2 justify-between pb-2 mb-2">
                                                    <Typography as={"h3"}
                                                                className="font-bold">{t('isAlpha')}:</Typography>
                                                    <div>{Boolean(row.original.isAlpha) ? t('yes') : t('no')}</div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
            },
            {
                header:             t("action"),
                accessorKey:        "action",
                enableColumnFilter: false,
                cell:               ({row}: CellContext<GameLocationName, unknown>): JSX.Element =>
                                        <Button
                                            variant="success"
                                            onClick={() => selectLocation(row.original)}
                                        >
                                            {t('page.shinyHuntings.create.createButton')}
                                        </Button>
            }
        ];
    }

    if (isLoadingPokemonName) return <></>;
    if (errorPokemonName || errorGameName) return <p>Erreur : {errorPokemonName?.message ?? errorGameName?.message}</p>;
    if (!pokemonNames || !gameNames) return <p>Aucune donnée récupérée</p>;

    return (
        <div className="w-full flex h-full gap-4 flex-col xl:flex-row">
            <Typography as={"section"} className="flex-1">
                <Form form={form} callback={(): void =>
                {
                }} className="flex-1 flex flex-col gap-4 pt-4 ps-4">
                    <FormField
                        name={"pokemon"}
                        control={form.control}
                        render={({field}): JSX.Element => (
                            <FormItem>
                                <FormLabel>{t("page.shinyHuntings.create.selectPokemon")}</FormLabel>
                                <FormControl>
                                    <SelectWithSearch
                                        datas={pokemonNames
                                            .map((t: TranslationIdNames): {
                                                label: string,
                                                value: string
                                            } => ({
                                                label: t.name,
                                                value: t.id.toString()
                                            }))}
                                        placeholder={t("page.shinyHuntings.create.choosePokemon")}
                                        value={
                                            field.value != null
                                                ? {
                                                    label: field.value.name,
                                                    value: field.value.id.toString(),
                                                }
                                                : null
                                        }
                                        onSelectValueAction={(selected: SelectWithSearchData | null): void =>
                                        {
                                            const pokemon: TranslationIdNames | undefined = selected
                                                ? {
                                                    id:   parseInt(selected.value),
                                                    name: selected.label,
                                                }
                                                : undefined;

                                            field.onChange(pokemon);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name={"formId"}
                        control={form.control}
                        render={({field}): JSX.Element => (
                            <FormItem>
                                <FormLabel>
                                    {t("page.shinyHuntings.create.selectForm")}
                                </FormLabel>

                                <FormControl>
                                    <SelectWithSearch
                                        disabled={formNames.length === 0}
                                        placeholder={t("page.shinyHuntings.create.chooseForm", {pokemonName: pokemon?.name ?? t("pokemon.name")})}
                                        datas={formNames.map((t: TranslationIdNames): {
                                            label: string,
                                            value: string
                                        } => ({
                                            label: t.name,
                                            value: t.id.toString(),
                                        }))}
                                        value={
                                            field.value != null
                                                ? {
                                                    label: formNames.find((t: TranslationIdNames): boolean => t.id === field.value)?.name ?? "",
                                                    value: field.value.toString(),
                                                }
                                                : null
                                        }
                                        onSelectValueAction={(selected: SelectWithSearchData | null): void =>
                                        {
                                            const value: number | undefined = selected ? parseInt(selected.value) : undefined;
                                            field.onChange(value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name={"gameId"}
                        control={form.control}
                        render={({field}): JSX.Element => (
                            <FormItem>
                                <FormLabel>
                                    {t("page.shinyHuntings.create.selectGame")}
                                </FormLabel>

                                <FormControl>
                                    <SelectWithSearch
                                        disabled={isLoadingGameName || gameNames.length === 0}
                                        placeholder={t("page.shinyHuntings.create.chooseGame")}
                                        datas={gameNames.map((t: TranslationIdNames): {
                                            label: string,
                                            value: string
                                        } => ({
                                            label: t.name,
                                            value: t.id.toString(),
                                        }))}
                                        value={
                                            field.value != null
                                                ? {
                                                    label: gameNames.find((t: TranslationIdNames): boolean => t.id === field.value)?.name ?? "",
                                                    value: field.value.toString(),
                                                }
                                                : null
                                        }
                                        onSelectValueAction={(selected: SelectWithSearchData | null): void =>
                                        {
                                            const value: number | undefined = selected ? parseInt(selected.value) : undefined;
                                            field.onChange(value);
                                        }}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Checkbox form={form} label={t("page.shinyHuntings.create.useCC")} name={"useCC"}/>

                    <FormItem>
                        <FormLabel>
                            {t("page.shinyHuntings.create.createdAt")}
                        </FormLabel>

                        <FormControl>
                            <DatePicker name={"createdAt"} control={form.control}/>
                        </FormControl>
                    </FormItem>

                    <FormField
                        name="time"
                        control={form.control}
                        render={({field}): JSX.Element => (
                            <FormItem>
                                <FormLabel>
                                    {t("timePassed")}
                                </FormLabel>

                                <FormControl>
                                    <TimeInput
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="meetingNumber"
                        control={form.control}
                        render={({field}): JSX.Element => (
                            <FormItem>
                                <FormLabel>
                                    {t("meetingNumber")}
                                </FormLabel>

                                <FormControl>
                                    <Input type={"number"} value={field.value} onChange={field.onChange}/>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Checkbox form={form} label={t("page.shinyHuntings.create.spriteInShiny")} name={"spriteInShiny"}/>

                    <Checkbox form={form} label={t("page.shinyHuntings.create.isFinish")} name={"isFinish"}/>
                    {
                        form.watch('isFinish') && (
                            <>
                                <DatePicker name={"finishAt"} control={form.control}
                                            placeholder={t("page.shinyHuntings.create.chooseEndingDate")}/>

                                <FormField
                                    name="nickname"
                                    control={form.control}
                                    render={({field}): JSX.Element => (
                                        <FormItem>
                                            <FormLabel>
                                                {t("nickname")}
                                            </FormLabel>

                                            <FormControl>
                                                <Input
                                                    placeholder={t("page.shinyHuntings.create.chooseNickName")}
                                                    type={"text"}
                                                    value={field.value ?? pokemon?.name ?? ""}
                                                    onChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )
                    }

                    <Button type="button" onClick={onSubmit} disabled={!pokemon}>
                        {t("page.shinyHuntings.create.showLocations")}
                    </Button>
                </Form>
            </Typography>

            <Separator direction="vertical" className="hidden md:block"/>

            <div className="flex-1">    
                <TableWithFilter<GameLocationName>
                    data={locations}
                    rawColumns={getGameLocationColumns()}
                    placeholder={t("page.shinyHuntings.create.searchLocations")}
                />
            </div>
        </div>
    );
}
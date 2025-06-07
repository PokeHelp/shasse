'use client';

import {JSX, useMemo, useState} from "react";
import {axiosService} from "@lib";
import {useQuery} from "@tanstack/react-query";
import {Button, SelectWithSearch} from "@components";
import {SelectWithSearchData} from "@typesFront";
import {useTranslations} from "next-intl";
import {
    FormWithName,
    FormWithNamesResponse,
    ShinyHuntingCreateData,
    TranslationIdNames,
    TranslationIdNamesResponse
} from "@types";
import { Controller, useForm } from "react-hook-form";

const handlePokemonNames: () => Promise<TranslationIdNamesResponse> = async (): Promise<TranslationIdNamesResponse> =>
{
    const {data} = await axiosService.get('/api/pokemons/allName');
    return data;
};

const handleGameNames: () => Promise<TranslationIdNamesResponse> = async (): Promise<TranslationIdNamesResponse> =>
{
    const {data} = await axiosService.get('/api/games/allName');
    return data;
};

const fetchPokemonForms: (pokemonId: string) => Promise<FormWithNamesResponse> = async (pokemonId: string): Promise<FormWithNamesResponse> =>
{
    const {data} = await axiosService.get(`/api/pokemons/${pokemonId}/forms`);
    return data;
};


export default function CreateShinyHuntingPage(): JSX.Element
{
    const t = useTranslations();
    const [pokemonSelected, setPokemonSelected] = useState<SelectWithSearchData | null>(null);
    const [gameSelected, setGameSelected] = useState<SelectWithSearchData | null>(null);
    const [formSelected, setFormSelected] = useState<SelectWithSearchData | null>(null);
    const {data: dataPokemonName, isLoading: isLoadingPokemonName, error: errorPokemonName} = useQuery({
        queryKey: ['allPokemonName'],
        queryFn:  (): Promise<TranslationIdNamesResponse> => handlePokemonNames(),
    });
    const {data: dataGameName, isLoading: isLoadingGameName, error: errorGameName} = useQuery({
        queryKey: ['allGameName'],
        queryFn:  (): Promise<TranslationIdNamesResponse> => handleGameNames(),
    });

    const {data: dataForm} = useQuery({
        queryKey: ['pokemonForm', pokemonSelected?.value],
        queryFn:  (): Promise<FormWithNamesResponse> => fetchPokemonForms(pokemonSelected!.value),
        enabled:  !!pokemonSelected,
    });

    const handleSubmit = (data: ShinyHuntingCreateData) => {
        console.log("✅ Formulaire soumis avec : ", data);
    };


    const pokemonNames: TranslationIdNames[] | null = useMemo((): TranslationIdNames[] | null =>
    {
        return dataPokemonName?.success ? dataPokemonName.data : null;
    }, [dataPokemonName]);

    const gameNames: TranslationIdNames[] | null = useMemo((): TranslationIdNames[] | null =>
    {
        return dataGameName?.success ? dataGameName.data : null;
    }, [dataGameName]);

    const form = useForm<ShinyHuntingCreateData>({
        defaultValues: {
        }
    });

    if (isLoadingPokemonName || isLoadingGameName) return <></>;
    if (errorPokemonName || errorGameName) return <p>Erreur : {errorPokemonName?.message ?? errorGameName?.message}</p>;
    if (!pokemonNames || !gameNames) return <p>Aucune donnée récupérée</p>;

    return (
        <>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex gap-3 items-center">
                    <div className="w-3/4">
                        <h2>{t("shinyHuntings.create.selectPokemon")}</h2>



                        <Controller
                            control={form.control}
                            name="pokemonId"
                            rules={{ required: "Le Pokémon est requis" }}
                            render={({ field, fieldState }) => (
                                <>
                                    <SelectWithSearch
                                        datas={pokemonNames.map((p) => ({
                                            label: p.name,
                                            value: p.id.toString(),
                                        }))}
                                        value={
                                            field.value
                                                ? {
                                                    label:
                                                        pokemonNames.find((p) => p.id === field.value)?.name ?? "",
                                                    value: field.value.toString(),
                                                }
                                                : null
                                        }
                                        onSelectValueAction={(selected) => {
                                            setPokemonSelected(selected)
                                            field.onChange(selected ? parseInt(selected.value) : null);
                                        }}
                                        placeholder="Sélectionnez un Pokémon"
                                    />
                                    {fieldState.error && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {fieldState.error.message}
                                        </p>
                                    )}
                                </>
                            )}
                        />
















                        {/*<SelectWithSearch*/}
                        {/*    datas={pokemonNames.map((pokemonName: TranslationIdNames): SelectWithSearchData => ({*/}
                        {/*        label: pokemonName.name,*/}
                        {/*        value: pokemonName.id.toString()*/}
                        {/*    }))}*/}
                        {/*    defaultValue={t("shinyHuntings.create.choosePokemon")}*/}
                        {/*    placeholder={t("searchPokemon")}*/}
                        {/*    value={pokemonSelected}*/}
                        {/*    onSelectValueAction={setPokemonSelected}*/}
                        {/*/>*/}
















                    </div>
                    <div className="w-1/4 flex content-center justify-center flex-col">
                        <>
                            {
                                (dataForm === undefined || !dataForm.success) ? (
                                        <h2>{t("shinyHuntings.create.selectPokemonBeforeForm")}</h2>
                                    )
                                    : dataForm.data.length === 1 ? (<h2>{t("shinyHuntings.create.hasOneForm")}</h2>)
                                        : dataForm.data.length > 1 && (
                                        <>
                                            <h2>{t("shinyHuntings.create.selectForm")}</h2>
                                            <SelectWithSearch
                                                datas={dataForm.data.map((form: FormWithName): SelectWithSearchData => ({
                                                    label: form.name,
                                                    value: form.id.toString()
                                                }))}
                                                defaultValue={t("shinyHuntings.create.chooseForm", {pokemonName: pokemonSelected!.label})}
                                                placeholder={t("searchForm")}
                                                value={formSelected}
                                                onSelectValueAction={setFormSelected}
                                            />
                                        </>
                                    )
                            }
                        </>
                    </div>
                </div>

                <h2>{t("shinyHuntings.create.selectGame")}</h2>
                <SelectWithSearch
                    datas={gameNames.map((gameName: TranslationIdNames): SelectWithSearchData => ({
                        label: gameName.name,
                        value: gameName.id.toString()
                    }))}
                    defaultValue={t("shinyHuntings.create.chooseGame")}
                    placeholder={t("searchGame")}
                    value={gameSelected}
                    onSelectValueAction={setGameSelected}
                />

                <Button type="submit">{t('shinyHuntings.create.btnCreate')}</Button>
            </form>
        </>
    );
}
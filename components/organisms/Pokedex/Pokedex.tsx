'use client';

import {useQuery} from "@tanstack/react-query";
import {
    Generation,
    GenerationResponse,
    Pokedex as PokedexType,
    PokedexResponse,
    Type,
    TypeName,
    TypesResponse
} from "@types";
import {axiosService} from "@lib";
import {ChangeEvent, JSX, useEffect, useMemo, useState} from "react";
import {Dropdown, Input, Pagination, PokedexCard} from "@components";
import {useTranslations} from "next-intl";
import {SelectItem} from "@ui/select";

async function fetchPokedex(): Promise<PokedexResponse>
{
    const {data} = await axiosService.get<PokedexResponse>('/api/pokedex');
    return data;
}

async function fetchTypes(): Promise<TypesResponse>
{
    const {data} = await axiosService.get<PokedexResponse>('/api/types');
    return data;
}

async function fetchGenerations(): Promise<TypesResponse>
{
    const {data} = await axiosService.get<PokedexResponse>('/api/generations');
    return data;
}

const allTypeSelected: TypeName = {id: 0, name: "Tous"};
const allGenerationSelected: Generation = {id: 0}

export default function Pokedex(): JSX.Element
{
    const {data, isLoading, error} = useQuery<PokedexResponse, Error>({
        queryKey: ['pokedex'],
        queryFn:  fetchPokedex,
    });

    const {data: typesData} = useQuery<TypesResponse, Error>({
        queryKey: ['types'],
        queryFn:  fetchTypes,
    });

    const {data: generationsData} = useQuery<GenerationResponse, Error>({
        queryKey: ['generations'],
        queryFn:  fetchGenerations,
    });

    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const t = useTranslations();
    const elementsPerPage: number[] = [10, 25, 50, 100, 500, 1000]
    const [elementPerPage, setElementPerPage] = useState(50);
    const [typeSelection, setTypeSelection] = useState<TypeName[]>([]);
    const [typeSelected, setTypeSelected] = useState<TypeName>(allTypeSelected);
    const [generationSelection, setGenerationSelection] = useState<Generation[]>([]);
    const [generationSelected, setGenerationSelected] = useState<Generation>(allGenerationSelected);

    useEffect((): void =>
    {
        setTypeSelection((typesData && typesData.success) ? [allTypeSelected, ...typesData.data] : []);
    }, [typesData])

    useEffect((): void =>
    {
        setGenerationSelection((generationsData && generationsData.success) ? [allGenerationSelected, ...generationsData.data] : []);
    }, [generationsData])

    const filteredData: PokedexType[] = useMemo((): PokedexType[] =>
    {
        const allPokemon: PokedexType[] = (data && data.success) ? data.data : [];

        return allPokemon.filter((pokemon: PokedexType): boolean =>
        {
            const nameMatch: boolean = pokemon.name.toLowerCase().includes(search.toLowerCase());
            const typeMatch: boolean = typeSelected.id === 0 ? true :
                pokemon.types.some((type: Type): boolean => type.id === typeSelected.id);
            const genMatch: boolean = generationSelected.id === 0 ? true :
                pokemon.generationIdApear === generationSelected.id;

            return nameMatch && typeMatch && genMatch;
        });
    }, [data, search, typeSelected, generationSelected]);

    const handleElementPerPageChange: (value: string) => void = (value: string): void =>
    {
        setElementPerPage(Number(value));
        setCurrentPage(1);
    };

    const totalPages: number = Math.ceil(filteredData.length / elementPerPage);

    const paginatedData: PokedexType[] = useMemo((): PokedexType[] =>
    {
        const start: number = (currentPage - 1) * elementPerPage;
        return filteredData.slice(start, start + elementPerPage);
    }, [filteredData, currentPage, elementPerPage]);

    const handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void = (e: ChangeEvent<HTMLInputElement>): void =>
    {
        setSearch(e.target.value);
        setCurrentPage(1);
    };

    if (isLoading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;
    if (!data || !data.success) return <p>Aucune donnée récupérée</p>;

    return (
        <div className="flex flex-col items-center gap-6">

            <div className="flex">
                <Input type="text" placeholder={t("pokedex.searchPokemon")} value={search}
                       onChange={handleSearchChange}/>

                <Dropdown onValueChange={handleElementPerPageChange}
                          value={elementPerPage.toString()}>
                    {elementsPerPage.map((numberElement: number): JSX.Element => (
                        <SelectItem value={numberElement.toString()} key={numberElement}>{numberElement}</SelectItem>
                    ))}
                </Dropdown>

                <Dropdown
                    onValueChange={(value: string): void => setTypeSelected(typeSelection.find((type: TypeName): boolean => type.id === Number(value)) ?? allTypeSelected)}
                    value={typeSelected.id.toString()}>
                    {typeSelection.map((type: TypeName): JSX.Element => (
                        <SelectItem value={type.id.toString()} key={type.id}>{type.name}</SelectItem>
                    ))}
                </Dropdown>

                <Dropdown
                    onValueChange={(value: string): void => setGenerationSelected(generationSelection.find((gen: Generation): boolean => gen.id === Number(value)) ?? allGenerationSelected)}
                    value={generationSelected.id.toString()}>
                    {generationSelection.map((gen: Generation): JSX.Element => (
                        <SelectItem value={gen.id.toString()} key={gen.id}>
                            {gen.id === 0 ? t('generation.all') : gen.id}
                        </SelectItem>
                    ))}
                </Dropdown>
            </div>

            <div className="flex flex-wrap gap-4 gap-y-9 justify-center">
                {paginatedData.map((pokemon: PokedexType): JSX.Element => (
                    <PokedexCard key={pokemon.id} pokemon={pokemon}/>
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onChangeEvent={setCurrentPage}/>
        </div>
    );
}

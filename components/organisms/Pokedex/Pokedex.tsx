'use client';

import {useQuery} from "@tanstack/react-query";
import {
    Generation,
    GenerationResponse,
    Pokedex as PokedexType,
    PokedexResponse, TranslationName,
    Type,
    TypeName,
    TypesResponse
} from "@types";
import {axiosService} from "@lib";
import {ChangeEvent, JSX, useEffect, useMemo} from "react";
import {Collapse, Dropdown, Input, Pagination, PokedexCard, Typography} from "@components";
import {useTranslations} from "next-intl";
import {SelectItem} from "@ui/select";
import {getFormChoice} from "@service";
import {useQueryState} from "nuqs";
import {Filter, FilterX} from "lucide-react";

const allTypeSelected: TypeName = {id: 0, name: "Tous"};
const allGenerationSelected: Generation = {id: 0};

const handlePokedex: (formId?: number | null) => Promise<PokedexResponse> = async (formId?: number | null): Promise<PokedexResponse> =>
{
    const option: string = formId ? `?formId=${formId}` : '';
    const {data} = await axiosService.get<PokedexResponse>(`/api/pokedex${option}`);
    return data;
}

export default function Pokedex(): JSX.Element
{
    const t = useTranslations();
    const elementsPerPage: number[] = [10, 25, 50, 100, 500, 1000];
    const [formSelected, setFormSelected] = useQueryState('form', {
        shallow:      false,
        parse:        Number,
        serialize:    String,
        defaultValue: 1
    });

    const {data, isLoading, error} = useQuery<PokedexResponse, Error>({
        queryKey: [`pokedex${formSelected}`],
        queryFn:  (): Promise<PokedexResponse> => handlePokedex(Number(formSelected))
    });

    const {data: typesData} = useQuery<TypesResponse, Error>({
        queryKey: ['types'],
        queryFn:  async (): Promise<TypesResponse> =>
                  {
                      const {data} = await axiosService.get<TypesResponse>('/api/types');
                      return data;
                  },
    });

    const {data: generationsData} = useQuery<GenerationResponse, Error>({
        queryKey: ['generations'],
        queryFn:  async (): Promise<GenerationResponse> =>
                  {
                      const {data} = await axiosService.get<GenerationResponse>('/api/generations');
                      return data;
                  },
    });

    const {data: formChoicesData} = useQuery({
        queryKey: ['formChoice'],
        queryFn:  async (): Promise<TranslationName[]> =>
                  {
                      return getFormChoice();
                  }
    });

    // Remplissage des composants
    const generationSelection: Generation[] = useMemo((): Generation[] =>
    {
        return generationsData?.success
            ? [allGenerationSelected, ...generationsData.data]
            : [allGenerationSelected];
    }, [generationsData]);
    const typeSelection: TypeName[] = useMemo((): TypeName[] =>
    {
        return typesData?.success
            ? [allTypeSelected, ...typesData.data]
            : [allTypeSelected];
    }, [typesData]);
    const formSelection: TranslationName[] = useMemo((): TranslationName[] =>
    {
        return formChoicesData ?? [];
    }, [formChoicesData]);

    // Récupération des sélections dans l'url
    const [generationId, setGenerationId] = useQueryState('generation', {
        parse:     Number,
        serialize: String,
        shallow:   false,
    });
    const [typeSelected, setTypeSelected] = useQueryState('type', {shallow: false});
    const [search, setSearch] = useQueryState('search', {shallow: false, defaultValue: ''});
    const [currentPage, setCurrentPage] = useQueryState('page', {
        shallow:      false,
        defaultValue: 1,
        parse:        Number,
        serialize:    String,
    });
    const [nbElementPerPage, setNbElementPerPage] = useQueryState('nbElementPerPage', {
        shallow:      false,
        parse:        Number,
        serialize:    String,
        defaultValue: 50
    });

    // Permet de récupérer les objets sélectionnés
    const generationSelected: Generation = useMemo((): Generation =>
    {
        return generationSelection.find((g: Generation): boolean => g.id === generationId) ?? allGenerationSelected;
    }, [generationId, generationSelection]);
    const typeNameSelected: TypeName = useMemo((): TypeName =>
    {
        return typeSelection.find((t: TypeName): boolean => t.name === typeSelected) ?? allTypeSelected;
    }, [typeSelected, typeSelection]);
    const elementPerPage: number = useMemo((): number =>
    {
        return nbElementPerPage ?? 50;
    }, [nbElementPerPage]);

    useEffect((): void =>
    {
        setCurrentPage(1);
    }, [data, search, typeNameSelected, generationSelected, setCurrentPage]);

    const filteredData: PokedexType[] = useMemo((): PokedexType[] =>
    {
        const allPokemon: PokedexType[] = (data && data.success) ? data.data : [];

        return allPokemon.filter((pokemon: PokedexType): boolean =>
        {
            const nameMatch: boolean = pokemon.name.toLowerCase().includes(search.toLowerCase());
            const typeMatch: boolean = typeNameSelected.id === 0 ? true :
                pokemon.types.some((type: Type): boolean => type.id === typeNameSelected.id);
            const genMatch: boolean = generationSelected.id === 0 ? true :
                pokemon.generationIdApear === generationSelected.id;

            return nameMatch && typeMatch && genMatch;
        });
    }, [data, search, typeNameSelected.id, generationSelected.id]);

    const paginatedData: PokedexType[] = useMemo((): PokedexType[] =>
    {
        const start: number = (currentPage - 1) * elementPerPage;
        return filteredData.slice(start, start + elementPerPage);
    }, [filteredData, currentPage, elementPerPage]);

    const handleFormChange: (value: string) => void = (value: string): void =>
    {
        const selectedForm: TranslationName | undefined = formSelection.find(
            (form: TranslationName): boolean => form.referenceId.toString() === value
        );

        setFormSelected(selectedForm ? Number(selectedForm.referenceId) : null);
        setCurrentPage(1);
    };


    if (isLoading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;
    if (!data || !data.success) return <p>Aucune donnée récupérée</p>;

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex w-full justify-between">
                <Input type="text" placeholder={t("searchPokemon")} value={search} className="w-1/3"
                       onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                       {
                           setSearch(e.target.value);
                       }}/>

                <div className="flex w-3/5 justify-end">
                    <Collapse triggerAction={(isOpen: boolean): JSX.Element => (
                        <div className="flex gap-3 items-center">
                            {t("filters")}
                            {isOpen ? <FilterX/> : <Filter/>}
                        </div>
                    )}>
                        <div className="flex gap-2 flex-wrap gap-y-2">
                            <div className="flex items-center gap-1">
                                <Typography>
                                    {t('elementsPerPage')}
                                </Typography>
                                <Dropdown
                                    onValueChange={(nbElement: string): void =>
                                    {
                                        setNbElementPerPage(Number(nbElement));
                                    }}
                                    value={nbElementPerPage.toString()}>
                                    {elementsPerPage.map((numberElement: number): JSX.Element => (
                                        <SelectItem value={numberElement.toString()}
                                                    key={numberElement}>{numberElement}</SelectItem>
                                    ))}
                                </Dropdown>
                            </div>

                            <div className="flex items-center gap-1">
                                <Typography>
                                    {t('byTypes')}
                                </Typography>
                                <Dropdown
                                    onValueChange={(typeName: string): void =>
                                    {
                                        setTypeSelected(typeName);
                                    }}
                                    value={typeNameSelected.name}>
                                    {typeSelection.map((type: TypeName): JSX.Element => (
                                        <SelectItem value={type.name} key={type.id}>{type.name}</SelectItem>
                                    ))}
                                </Dropdown>
                            </div>

                            <div className="flex items-center gap-1">
                                <Typography>
                                    {t('byGenerations')}
                                </Typography>
                            <Dropdown
                                onValueChange={(value: string): void =>
                                {
                                    setGenerationId(Number(value));
                                }}
                                value={generationId?.toString() ?? '0'}>
                                {generationSelection.map((gen: Generation): JSX.Element => (
                                    <SelectItem value={gen.id.toString()} key={gen.id}>
                                        {gen.id === 0 ? t('generation.all') : gen.id}
                                    </SelectItem>
                                ))}
                            </Dropdown>
                            </div>

                            <div className="flex items-center gap-1">
                                <Typography>
                                    {t('byForms')}
                                </Typography>
                            <Dropdown
                                onValueChange={handleFormChange}
                                value={formSelected?.toString()}>
                                {formSelection.map((form: TranslationName): JSX.Element => (
                                    <SelectItem value={form.referenceId.toString()} key={form.referenceId}>
                                        {form.name}
                                    </SelectItem>
                                ))}
                            </Dropdown>
                            </div>
                        </div>
                    </Collapse>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 gap-y-9 justify-center">
                {paginatedData.map((pokemon: PokedexType): JSX.Element => (
                    <PokedexCard key={pokemon.id} pokemon={pokemon}
                                 formId={formSelected !== null ? Number(formSelected) : null}/>
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredData.length / elementPerPage)}
                        onChangeEvent={setCurrentPage}/>
        </div>
    );
}

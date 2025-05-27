'use client';

import {
    Ability,
    CapacityGeneration,
    EggGroup, FormWithName,
    GroupedPokemonInfoDetail,
    GroupedPokemonInfoDetailResponse, LocationGeneration,
    NationalNumber,
    PokemonInfoDetail,
    Type
} from "@types";
import {axiosService} from "@lib";
import {useQuery} from "@tanstack/react-query";
import {JSX, useEffect, useMemo, useState, useRef, RefObject} from "react";
import {
    Button,
    Evolution,
    GenderGauge,
    GenerationChoice,
    Link,
    Picture,
    TableWithFilter,
    Typography
} from "@components";
import {CustomColumnDefTable} from "@typesFront";
import {useTranslations} from "next-intl";
import {CellContext} from "@tanstack/table-core";
import Statistique from "../../moleculs/Statistique/Statistique";
import {getPokemonPictureFromId, getTypePictureById} from "@utils";
import {Popover, PopoverContent, PopoverTrigger} from "@ui/popover";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import PokemonRegionalFormCard from "../../moleculs/PokemonFormCard/PokemonRegionalFormCard";
import {Card} from "@ui/card";

const handlePokemon: (pokemonId: number, formId: string | null) => Promise<GroupedPokemonInfoDetailResponse> = async (pokemonId: number, formId: string | null): Promise<GroupedPokemonInfoDetailResponse> =>
{
    const {data} = await axiosService.get(`/api/pokemons/${pokemonId}/details?forms=true&eggGroups=true&statistics=true&abilities=true&types=true&nationalNumbers=true&capacities=true&locations=true&evolutions=true&regionnalForms=true${formId ? `&formId=${formId}` : ''}`);
    return data;
};

export default function PokemonDetail({pokemonId}: { pokemonId: number }): JSX.Element
{

    const params: ReadonlyURLSearchParams = useSearchParams();
    const formId: string | null = params.get('form');

    const {data, isLoading, error} = useQuery({
        queryKey: [`pokemon_${pokemonId}_${formId}`],
        queryFn:  (): Promise<GroupedPokemonInfoDetailResponse> => handlePokemon(pokemonId, formId),
    });

    const [generationSelected, setGenerationSelected] = useState<string | null>(params.get('generation'));
    const [pokemonInfo, setPokemonInfo] = useState<PokemonInfoDetail | null>(null);
    const rightPanelRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);
    const t = useTranslations();

    const pokemonGroupedInfo: GroupedPokemonInfoDetail | null = useMemo((): GroupedPokemonInfoDetail | null =>
    {
        return data?.success ? data.data : null;
    }, [data]);

    function getCapacitiesColumns(): CustomColumnDefTable<CapacityGeneration>[]
    {
        return [
            {
                header:      t("name"),
                accessorKey: "name",
                cell:        ({row}: CellContext<CapacityGeneration, unknown>): JSX.Element =>
                                 <div className="font-medium">{row.original.name}</div>,
                search:      true
            },
            {
                header:      t("obtationType"),
                accessorKey: "obtationTypeName",
                cell:        ({row}: CellContext<CapacityGeneration, unknown>): JSX.Element =>
                                 <div className="font-medium">{row.original.obtationTypeName}</div>,
                filter:      true
            },
            {
                header:      t("detail"),
                accessorKey: "detail",
                cell:        ({row}: CellContext<CapacityGeneration, unknown>): JSX.Element =>
                                 <div className="font-medium">{row.original.detail}</div>,
            }
        ];
    }

    function getLocationColumns(): CustomColumnDefTable<LocationGeneration>[]
    {
        return [
            {
                header:      t("isShassable"),
                accessorKey: "isShassable",
                cell:        ({row}: CellContext<LocationGeneration, unknown>): JSX.Element | null =>
                             {
                                 const isShassable: boolean = Boolean(row.original?.isShassable ?? row.original.isShassable);
                                 return isShassable ? <span>★</span> : null;
                             }
            },
            {
                header:      t("game"),
                accessorKey: "gameName",
                cell:        ({row}: CellContext<LocationGeneration, unknown>): JSX.Element =>
                                 <div className="font-medium">{row.original.gameName}</div>,
                filter:      true
            },
            {
                header:      t("zone"),
                accessorKey: "zoneName",
                cell:        ({row}: CellContext<LocationGeneration, unknown>): JSX.Element =>
                                 <div className="font-medium">{row.original.zoneName}</div>,
                filter:      true
            },
            {
                header:      t("rate"),
                accessorKey: "rate",
                cell:        ({row}: CellContext<LocationGeneration, unknown>): JSX.Element =>
                                 <div className="font-medium">{row.original.rate} %</div>
            },
            {
                header:      t("level"),
                accessorKey: "minLevel",
                cell:        ({row}: CellContext<LocationGeneration, unknown>): JSX.Element =>
                                 <div className="font-medium">{row.original.minLevel} - {row.original.maxLevel}</div>
            },
            {
                header:      t("obtationType"),
                accessorKey: "obtationName",
                cell:        ({row}: CellContext<LocationGeneration, unknown>): JSX.Element =>
                                 <div className="font-medium">{row.original.obtationName}</div>,
                filter:      true
            },
            {
                header:      t("limit"),
                accessorKey: "limit",
                cell:        ({row}: CellContext<LocationGeneration, unknown>): JSX.Element =>
                                 <div className="font-medium">{row.original.limit}</div>
            },
            {
                header:             t("moreInfo"),
                accessorKey:        "moreInfo",
                enableColumnFilter: false,
                cell:               ({row}: CellContext<LocationGeneration, unknown>): JSX.Element =>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button>
                                                    +
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                {/* Location info location */}
                                                <div
                                                    className="flex gap-2 justify-between border-b-1 border-primary pb-2 mb-2">
                                                    <Typography type={"h3"}
                                                                className="font-bold">{t('location')}:</Typography>
                                                    <div>{row.original.locationName}</div>
                                                </div>

                                                {/* Location info condition */}
                                                <div
                                                    className="flex gap-2 justify-between border-b-1 border-primary pb-2 mb-2">
                                                    <Typography type={"h3"}
                                                                className="font-bold">{t('condition')}:</Typography>
                                                    <div>{row.original.conditionName}</div>
                                                </div>

                                                {/* Location info détails */}
                                                <div
                                                    className="flex gap-2 justify-between border-b-1 border-primary pb-2 mb-2">
                                                    <Typography type={"h3"}
                                                                className="font-bold">{t('detail')}:</Typography>
                                                    <div>{row.original.detailName}</div>
                                                </div>

                                                {/* Location info météo */}
                                                <div
                                                    className="flex gap-2 justify-between border-b-1 border-primary pb-2 mb-2">
                                                    <Typography type={"h3"}
                                                                className="font-bold">{t('meteo')}:</Typography>
                                                    <div>{row.original.meteoName}</div>
                                                </div>

                                                {/* Location info isAlpha */}
                                                <div className="flex gap-2 justify-between pb-2 mb-2">
                                                    <Typography type={"h3"}
                                                                className="font-bold">{t('isAlpha')}:</Typography>
                                                    <div>{Boolean(row.original.isAlpha) ? t('yes') : t('no')}</div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
            }
        ];
    }

    useEffect((): void =>
    {
        if (pokemonGroupedInfo)
        {
            if (generationSelected)
            {
                setGenerationSelected(generationSelected);
                setPokemonInfo(pokemonGroupedInfo[generationSelected]);
            } else
            {
                const allKeys: string[] = Object.keys(pokemonGroupedInfo);
                setGenerationSelected(allKeys[allKeys.length - 1]);
            }
        }
    }, [generationSelected, pokemonGroupedInfo]);

    if (isLoading) return <></>;
    if (error) return <p>Erreur : {error.message}</p>;
    if (!pokemonInfo) return <p>Aucune donnée récupérée</p>;

    return (
        <div className="relative">
            <GenerationChoice
                className="w-3/4"
                possibleGenerations={pokemonGroupedInfo ? Object.keys(pokemonGroupedInfo) : []}
                generationSelecter={setGenerationSelected}
                generationSelected={generationSelected}
            />

            <div className='h-full py-2 px-4 border-l border-secondary w-1/4 fixed top-0 right-0' ref={rightPanelRef}>
                <div className="flex w-full flex-col gap-3">
                    <h1 className="title">
                        {pokemonInfo.internationalNumber.toString().padStart(4, '0')} - {pokemonInfo.name}
                    </h1>

                    {/* Pokemon gen appear */}
                    <div className="flex gap-2">
                        <Typography type={"h3"} className="font-bold">{t('pokemon.genAppear')}:</Typography>
                        <div>{pokemonInfo.generationAppear}</div>
                    </div>

                    {/* Pokemon category */}
                    <div className="flex gap-2">
                        <Typography type={"h3"} className="font-bold">{t('category')}:</Typography>
                        <div>{pokemonInfo.categoryName}</div>
                    </div>

                    {/* Pokemon size */}
                    <div className="flex gap-2">
                        <Typography type={"h3"} className="font-bold">{t('size')}:</Typography>
                        <div>{pokemonInfo.size} m</div>
                    </div>

                    {/* Pokemon weight */}
                    <div className="flex gap-2">
                        <Typography type={"h3"} className="font-bold">{t('weight')}:</Typography>
                        <div>{pokemonInfo.weight} kg</div>
                    </div>

                    {/* Pokemon callHelpRate */}
                    <div className="flex gap-2">
                        <Typography type={"h3"} className="font-bold">{t('pokemon.callHelpRate')}:</Typography>
                        <div>{pokemonInfo.callHelpRate}</div>
                    </div>

                    {/* Pokemon exp global */}
                    <div className="flex gap-2">
                        <Typography type={"h3"} className="font-bold" title={t('pokemon.globalXpTitle')}>
                            {t('pokemon.globalXp')}:
                        </Typography>
                        <div>{new Intl.NumberFormat('fr-FR').format(pokemonInfo.globalXp)} exp</div>
                    </div>

                    {/* Pokemon HatchingCycle */}
                    <div className="flex gap-2">
                        <Typography type={"h3"} className="font-bold">{t('pokemon.hatchingCycle')}</Typography>
                        <div>{pokemonInfo.hatchingCycle}</div>
                    </div>

                    {/* Pokemon captureRate */}
                    <div className="flex gap-2">
                        <Typography type={"h3"} className="font-bold">{t('pokemon.captureRate')}</Typography>
                        <div>{pokemonInfo.captureRate}</div>
                    </div>

                    {/* Pokemon xpGift */}
                    <div className="flex gap-2">
                        <Typography type={"h3"} className="font-bold">{t('pokemon.xpGift')}</Typography>
                        <div>{pokemonInfo.xpGift}</div>
                    </div>

                    {/* Pokemon type */}
                    <div className="flex gap-2 items-center">
                        <Typography type={'h3'} className="font-bold">{t('type.name')}</Typography>
                        <div className="flex gap-2">
                            {
                                pokemonInfo.types.map((type: Type): JSX.Element => (
                                    <Picture
                                        key={type.id}
                                        src={getTypePictureById(type.id, "fullName")}
                                        alt={type.name}
                                        width={88}
                                        height={40}
                                    />
                                ))
                            }
                        </div>
                    </div>

                    {/* Pokemon ability */}
                    <div className="flex gap-2">
                        <Typography type={"h3"} className="font-bold">{t('ability.name')}</Typography>
                        {
                            pokemonInfo.abilities.filter((ability: Ability): boolean => !ability.isHidden).length > 0
                                ? pokemonInfo.abilities.filter((ability: Ability): boolean => !ability.isHidden)
                                    .map((ability: Ability): string => ability.name).join(' - ')
                                : '-'
                        }
                    </div>

                    {/* Pokemon hidden ability */}
                    <div className="flex gap-2">
                        <Typography type={"h3"} className="font-bold">{t('ability.hiddenName')}</Typography>
                        {
                            pokemonInfo.abilities.filter((ability: Ability): boolean => ability.isHidden).length > 0
                                ? pokemonInfo.abilities.filter((ability: Ability): boolean => ability.isHidden)
                                    .map((ability: Ability): string => ability.name).join(' - ')
                                : '-'
                        }
                    </div>

                    {/* Pokemon genreRate */}
                    <div className="flex gap-2">
                        <Typography type={"h3"} className="font-bold">{t('pokemon.genderRate')}</Typography>
                        <div className="flex gap-2 items-center">
                            <GenderGauge maleRate={pokemonInfo.maleRate} femelleRate={pokemonInfo.femelleRate}
                                         className="w-[100px]"/>
                        </div>
                    </div>

                    {/* Pokemon eggGroup */}
                    <div className="flex gap-2">
                        <Typography type={"h3"} className="font-bold">{t('pokemon.eggGroup')}</Typography>
                        {
                            pokemonInfo.eggGroups.map((eggGroup: EggGroup): string => eggGroup.name).join(' - ')
                        }
                    </div>

                    {/* Pokemon nationalNumber */}
                    <div className="flex gap-2 flex-col">
                        <Typography type={"h3"} className="font-bold">{t('nationalNumber')}</Typography>
                        <div className="pl-4">
                            {
                                pokemonInfo.nationalNumbers.length > 0
                                    ? pokemonInfo.nationalNumbers.map((nn: NationalNumber): JSX.Element =>
                                    {
                                        return (
                                            <div key={`${nn.groupGameName}_${nn.number}`} className="grid grid-cols-2">
                                                <span className="font-medium">{nn.groupGameName}</span>
                                                <span className="font-medium">{nn.number}</span>
                                            </div>
                                        )
                                    })
                                    : t('notAvailable')
                            }
                        </div>
                    </div>

                    {/* Pokemon statistiques */}
                    <Statistique pokemon={pokemonInfo}/>

                    <Picture
                        className="absolute top-0 right-2"
                        src={getPokemonPictureFromId({
                            internationalNumber: pokemonInfo.internationalNumber,
                            formId:              pokemonInfo.formId
                        })}
                        alt="Pokémon animé"
                        width={150}
                        height={150}
                    />
                </div>
            </div>

            <div className="flex justify-center w-3/4 pt-16">
                <div className="flex gap-10 flex-col w-11/12">

                    {/* Pokémon dymorphisme */}
                    {
                        pokemonInfo.forms.length > 1 && (
                            <div className="flex gap-2 flex-col">
                                <div className="flex gap-2">
                                    <h2>{t('pokemon.info.form')}:</h2>
                                    <div>{pokemonInfo.forms.filter((form: FormWithName): boolean => form.id === pokemonInfo.formId)[0].name}</div>
                                </div>

                                <h2>{t("pokemon.info.dymorphisme")}:</h2>
                                <div className="flex gap-2 items-center pl-2">
                                    {
                                        pokemonInfo.forms.map((form: FormWithName): JSX.Element => (
                                            <Link key={form.id}
                                                  href={`/pokemon/${pokemonId}?form=${form.id}`}>{form.name}</Link>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }

                    {/* Pokémon formes régionales */}
                    {
                        pokemonInfo.regionalForms.length > 1 &&
                        <PokemonRegionalFormCard regionalForms={pokemonInfo.regionalForms}/>
                    }

                    {/* Pokémon évolution */}
                    {
                        pokemonInfo.evolutions.length > 0 &&
                        <div className="flex justify-center">
                            <Card className="w-4/5 p-5">
                                {t("evolution.title")}
                                <Evolution pokes={pokemonInfo.evolutions}/>
                            </Card>
                        </div>
                    }

                    {/* Pokemon capacities */}
                    {
                        pokemonInfo.capacities.length > 0
                            ? <TableWithFilter<CapacityGeneration>
                                data={pokemonInfo.capacities}
                                rawColumns={getCapacitiesColumns()}
                                placeholder={t('searchByName')}
                            />
                            : <div className="text-center">{t('notAvailable')}</div>
                    }

                    {/* Pokemon location */}
                    {
                        pokemonInfo.locations.length > 0 &&
                        <TableWithFilter<LocationGeneration>
                            data={pokemonInfo.locations}
                            rawColumns={getLocationColumns()}
                            placeholder={t('searchByName')}
                        />
                    }
                </div>
            </div>
        </div>
    );
}
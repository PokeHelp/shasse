import {SheetDescription, SheetTitle} from "@ui/sheet";
import {Link, Slider, Typography, GenderGauge} from "@components";
import {Picture} from "@components";
import {getPokemonPictureFromId, getTypePictureById} from "@utils";
import {JSX} from "react";
import {PokemonDetailSliderProps} from "@typesFront";
import {Ability, EggGroup, GroupedPokemonInfoDetailResponse, PokemonInfoDetail, Statistic, Type} from "@types";
import {axiosService} from "@lib";
import {useQuery} from "@tanstack/react-query";
import {useTranslations} from "next-intl";

async function fetchShortDetail(id: number): Promise<GroupedPokemonInfoDetailResponse>
{
    const {data} = await axiosService.get<GroupedPokemonInfoDetailResponse>(`api/pokemons/${id}/details?lastGeneration=true`);
    return data;
}

export default function PokemonDetailSlider({
                                                pokemonId,
                                                isOpen,
                                                onClose,
                                            }: PokemonDetailSliderProps): JSX.Element
{
    const t = useTranslations();
    const {data, isLoading, error} = useQuery<GroupedPokemonInfoDetailResponse, Error>({
        queryKey: ['pokemon', pokemonId],
        queryFn:  (): Promise<GroupedPokemonInfoDetailResponse> => fetchShortDetail(pokemonId),
    });

    if (isLoading) return <></>;
    if (error) return <p>Erreur : {error.message}</p>;
    if (!data || !data.success) return <p>Aucune donnée récupérée</p>;

    const pokemon: PokemonInfoDetail = data.data[Object.keys(data.data)[0]];

    const getSliderHeader: () => JSX.Element = (): JSX.Element =>
    {
        return (
            <>
                <SheetTitle className="text-3xl">
                    #{pokemon.internationalNumber} - {pokemon.name}
                </SheetTitle>
                <SheetDescription>
                    <Link href={`/pokemon/${pokemon.id}`}>{t('pokemon.slider.linkMoreDetail')}</Link>
                </SheetDescription>
            </>
        );
    }

    return (
        <Slider open={isOpen} onOpenChange={onClose} SliderHeader={getSliderHeader()} contentClassName='px-4'>
            <div className="grid gap-4 py-4">

                {/* Pokemon picture */}
                <div className="flex justify-center">
                    <Picture
                        key={pokemon.id}
                        src={getPokemonPictureFromId(pokemon.internationalNumber)}
                        alt={pokemon.name}
                        width={300}
                        height={300}
                    />
                </div>

                {/* Pokemon info */}
                <div className="flex gap-4 w-full flex-col">
                    {/* Pokemon type */}
                    <div className="flex items-center justify-between">
                        <Typography type={'h3'}>{t('type.name')}</Typography>
                        <div className="flex gap-2">
                            {
                                pokemon.types.map((type: Type): JSX.Element => (
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

                    {/* Pokemon HatchingCycle */}
                    <div className="flex items-center justify-between">
                        <Typography type={"h3"}>{t('pokemon.hatchingCycle')}</Typography>
                        <div>{pokemon.hatchingCycle}</div>
                    </div>

                    {/* Pokemon captureRate */}
                    <div className="flex items-center justify-between">
                        <Typography type={"h3"}>{t('pokemon.captureRate')}</Typography>
                        <div>{pokemon.captureRate}</div>
                    </div>

                    {/* Pokemon callHelpRate */}
                    <div className="flex items-center justify-between">
                        <Typography type={"h3"}>T{t('pokemon.callHelpRate')}</Typography>
                        <div>{pokemon.callHelpRate}</div>
                    </div>

                    {/* Pokemon genreRate */}
                    <div className="flex items-center justify-between">
                        <Typography type={"h3"}>{t('pokemon.genderRate')}</Typography>
                        <div className="flex gap-2 items-center">
                            <GenderGauge maleRate={pokemon.maleRate} femelleRate={pokemon.femelleRate} className="w-[100px]"/>
                        </div>
                    </div>

                    {/* Pokemon eggGroup */}
                    <div className="flex items-center justify-between">
                        <Typography type={"h3"}>{t('pokemon.eggGroup')}</Typography>
                        {
                            pokemon.eggGroups.map((eggGroup: EggGroup): string => eggGroup.name).join(' - ')
                        }
                    </div>

                    {/* Pokemon ability */}
                    <div className="flex items-center justify-between">
                        <Typography type={"h3"}>{t('ability.name')}</Typography>
                        {
                            pokemon.abilities.filter((ability: Ability): boolean => !ability.isHidden)
                                .map((ability: Ability): string => ability.name).join(' - ')
                        }
                    </div>

                    {/* Pokemon hidden ability */}
                    <div className="flex items-center justify-between">
                        <Typography type={"h3"}>{t('ability.hiddenName')}</Typography>
                        {
                            pokemon.abilities.filter((ability: Ability): boolean => ability.isHidden)
                                .map((ability: Ability): string => ability.name).join(' - ')
                        }
                    </div>

                    {/* Pokemon statistiques */}
                    <div className="flex flex-col gap-3">
                        <Typography type={"h3"}>{t('stats.name')}</Typography>
                        <div className="pl-4">
                            {
                                pokemon.statistics.map((statistic: Statistic): (JSX.Element | undefined)[] => (
                                    Object.entries(statistic).map(([name, value]: [string, number]): JSX.Element | undefined =>
                                    {
                                        if (!['id', 'generationId', 'special'].includes(name))
                                        {
                                            return (
                                                <div key={name} className="grid grid-cols-2">
                                                    <span className="font-medium">{t(`stats.${name}`)}</span>
                                                    <span className="font-medium">{value}</span>
                                                </div>
                                            )
                                        }
                                    })
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Slider>
    );
}
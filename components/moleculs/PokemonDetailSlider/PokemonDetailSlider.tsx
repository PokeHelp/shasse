import {SheetDescription, SheetTitle} from "@ui/sheet";
import {Slider} from "@components";
import {Picture} from "@components";
import {getPokemonPictureFromId} from "@utils";
import {JSX} from "react";
import {PokemonDetailSliderProps} from "@typesFront";
import {GroupedPokemonInfoDetailResponse, GroupedPokemonInfoDetail} from "@types";
import {axiosService} from "@lib";
import {useQuery} from "@tanstack/react-query";

async function fetchShortDetail(id: number): Promise<GroupedPokemonInfoDetailResponse>
{
    const {data} = await axiosService.get<GroupedPokemonInfoDetailResponse>(`api/pokemon/${id}/details?lastGeneration=true`);
    return data;
}

export default function PokemonDetailSlider({
                                                pokemonId,
                                                isOpen,
                                                onClose,
                                            }: PokemonDetailSliderProps): JSX.Element
{

    const {data, isLoading, error} = useQuery<GroupedPokemonInfoDetailResponse, Error>({
        queryKey: ['pokemon', pokemonId],
        queryFn:  (): Promise<GroupedPokemonInfoDetailResponse> => fetchShortDetail(pokemonId),
    });

    if (isLoading) return <></>;
    if (error) return <p>Erreur : {error.message}</p>;
    if (!data || !data.success) return <p>Aucune donnée récupérée</p>;

    const pokemon: GroupedPokemonInfoDetail = data.data;
    console.log(pokemon);

    const getSliderHeader: () => JSX.Element = (): JSX.Element =>
    {
        return (
            <>
                <SheetTitle className="text-3xl">
                    {/*#{pokemon.internationalNumber} - {pokemon.name}*/}
                </SheetTitle>
                <SheetDescription>
                    Détails complets du Pokémon
                </SheetDescription>
            </>
        );
    }

    return (
        <Slider open={isOpen} onOpenChange={onClose} SliderHeader={getSliderHeader()}>
            <div className="grid gap-4 py-4">
                <div className="flex justify-center">
                    {/*<Picture*/}
                    {/*    src={getPokemonPictureFromId(pokemonId?.international_number)}*/}
                    {/*    alt={pokemonId?.name}*/}
                    {/*    width={300}*/}
                    {/*    height={300}*/}
                    {/*/>*/}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-bold mb-2">Types</h3>
                        <div className="flex gap-2">
                            Ici les types
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2">Statistiques</h3>
                        {/*<div>HP: {pokemonId?.stats?.hp}</div>*/}
                        {/*<div>Attack: {pokemonId?.stats?.attack}</div>*/}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold mb-2">Description</h3>
                    {/*<p>{pokemonId?.description || "Aucune description disponible."}</p>*/}
                </div>
            </div>
        </Slider>
    );
}
'use client';

import {GroupedPokemonInfoDetailResponse} from "@types";
import {axiosService} from "@lib";
import {useQuery} from "@tanstack/react-query";
import {JSX} from "react";

const handlePokemon: (pokemonId: number) => Promise<GroupedPokemonInfoDetailResponse> = async (pokemonId: number): Promise<GroupedPokemonInfoDetailResponse> =>
{
    const {data} = await axiosService.get(`/api/pokemons/${pokemonId}/details?forms=true&eggGroups=true&statistics=true&abilities=true&types=true`);
    return data;
}

export default function PokemonDetail({pokemonId}: { pokemonId: number }): JSX.Element
{
    const {data, isLoading, error} = useQuery({
        queryKey: [`pokemon${pokemonId}`],
        queryFn:  (): Promise<GroupedPokemonInfoDetailResponse> => handlePokemon(pokemonId)
    });

    if (isLoading) return <></>;
    if (error) return <p>Erreur : {error.message}</p>;
    if (!data || !data.success) return <p>Aucune donnée récupérée</p>;

    console.log(data.data);

    return (
        <>
            OK
        </>
    )
}
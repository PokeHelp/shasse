'use client';

import {useQuery} from "@tanstack/react-query";
import {Pokedex as PokedexPokemonType, PokedexResponse} from "@types";
import {axiosService} from "@lib";
import {JSX} from "react";
import {PokedexCard} from "@components";

async function fetchPokedex(): Promise<PokedexResponse>
{
    const {data} = await axiosService.get<PokedexResponse>('/api/pokedex');
    return data;
}

export default function Pokedex(): JSX.Element
{
    const {data, isLoading, error} = useQuery<PokedexResponse, Error>({
        queryKey: ['pokedex'],
        queryFn:  fetchPokedex,
    });

    if (isLoading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;
    if (!data || !data.success || !data.data) return <p>Aucune donnée récupérée</p>;

    return (
        <div className="flex flex-wrap gap-4 gap-y-9 justify-center">
            {data.data.map((pokemon: PokedexPokemonType): JSX.Element => (
                <PokedexCard
                    key={pokemon.id}
                    pokemon={pokemon}
                />
            ))}
        </div>
    )
}
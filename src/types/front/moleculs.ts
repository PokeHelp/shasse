import {FieldValues, Control, Path} from "react-hook-form";
import {InputProps} from "@typesFront";
import {ComponentProps} from "react";
import {Card as UiCard} from "@ui/card";
import {Pokedex} from "@types";

export interface RedirectButtonProps
{
    redirectUrl: string;
    text: string;
}

export interface InputFormFieldProps<T extends FieldValues> extends Omit<InputProps, 'name'>
{
    formControl: Control<T>;
    name: Path<T>;
    errorText?: string;
    label: string;
}

export interface PokedexCardProps extends ComponentProps<typeof UiCard>
{
    pokemon: Pokedex;
}

export interface PokemonDetailSliderProps
{
    pokemonId: number;
    isOpen: boolean;
    onClose: () => void;
}
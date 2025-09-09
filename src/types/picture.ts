export type TypePictureStyle = 'fullName' | 'icon';

export type  PokemonPictureStyle = 'Artwork' | 'HOME' | 'Generation' | "Game";

export interface PokemonPicture
{
    internationalNumber: number;
    formId?: number | null;
    generationId?: number | null;
    style?: PokemonPictureStyle;
    isShiny?: boolean;
    gameId?: number | null;
}
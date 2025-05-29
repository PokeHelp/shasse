export type TypePictureStyle = 'fullName' | 'icon';

export type  PokemonPictureStyle = 'Artwork' | 'HOME' | 'Generation';

export interface PokemonPicture {
    internationalNumber: number;
    formId?: number | null;
    generationId?: number | null;
    style?: PokemonPictureStyle;
    isShiny?: boolean;
}
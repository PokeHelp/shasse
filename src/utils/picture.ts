import {PokemonPicture, PokemonPictureStyle, TypePictureStyle} from "@types";

/**
 * Permet de récupérer une image à partir de l'id d'un pokemon
 *
 * @param data
 * @param style
 */
export function getPokemonPictureFromId(data: PokemonPicture, style: PokemonPictureStyle = 'Artwork'): string
{
    const extension: string = 'webp';
    const baseUrl: string = `${process.env.NEXT_PUBLIC_PICTURE_URL}/Image/${extension}`;
    const pokemonId: string = data.internationalNumber.toString().padStart(4, '0');
    let form: string;

    switch (data.formId)
    {
        case 141:
            form = 'Alola';
            break;

        case 142:
            form = 'Galar';
            break;

        case 143:
            form = 'Hisui';
            break;

        case 144:
            form = 'Paldea';
            break;

        default:
            form = '';
            break;
    }

    switch (style)
    {
        default:
            const pokemonUrl: string = `${pokemonId}${form === '' ? '' : `_${form.toLowerCase()}`}`;
            return `${baseUrl}/Artwork/${pokemonUrl}.${extension}`;
    }
}

/**
 * Permet de récupérer l'image d'un type à partir de l'id et le style d'un type
 *
 * @param id
 * @param style => type de l'image à récupérer
 */
export function getTypePictureById(id: number, style: TypePictureStyle = 'icon'): string
{
    return `${process.env.NEXT_PUBLIC_PICTURE_URL}/Image/webp/types/${style}/${id}.webp`
}
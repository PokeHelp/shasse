import {TypePictureStyle} from "@types";

/**
 * Permet de récupérer une image à partir de l'id d'un pokemon
 *
 * @param id
 */
export function getPokemonPictureFromId(id: number): string
{
    return `${process.env.NEXT_PUBLIC_PICTURE_URL}/Image/webp/artwork/${id.toString().padStart(4, '0')}.webp`
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
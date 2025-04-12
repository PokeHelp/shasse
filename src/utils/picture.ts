/**
 * Permet de récupérer une image à partir de l'id d'un pokemon
 *
 * @param id
 */
export function getPokemonPictureFromId(id: number): string
{
    return `${process.env.NEXT_PUBLIC_PICTURE_URL}/Image/webp/artwork/${id.toString().padStart(4, '0')}.webp`
}

export function getTypePictureById(id: number): string
{
    return `${process.env.NEXT_PUBLIC_PICTURE_URL}/Image/webp/types/${id}.webp`
}
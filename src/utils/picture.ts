import {PokemonPicture, TypePictureStyle} from "@types";

/**
 * Permet de récupérer une image à partir de l'id d'un pokemon
 *
 * @param internationalNumber
 * @param formId
 * @param generationId
 * @param style
 * @param isShiny
 */
export function getPokemonPictureFromId({
                                            internationalNumber,
                                            formId = null,
                                            generationId = null,
                                            style = 'Artwork',
                                            isShiny = false
                                        }: PokemonPicture): string
{
    const extension: string = 'webp';
    const baseUrl: string = `${process.env.NEXT_PUBLIC_PICTURE_URL}/Image/${extension}`;
    const pokemonId: string = internationalNumber.toString().padStart(4, '0');
    let form: string;
    let generationName: string = '';

    switch (formId)
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

    if (style === 'Generation')
    {
        switch (generationId)
        {
            case 1:
                isShiny = false;
                generationName = 'RV';
                break;

            case 2:
                generationName = 'OAC';
                break;

            case 3:
                generationName = 'RSE';
                break;

            case 4:
                generationName = 'DPP';
                break;

            case 5:
                generationName = 'NB';
                break;

            case 6:
                generationName = 'XY';
                break;

            case 7:
                generationName = 'SLUSUL';
                break;

            case 8:
                generationName = 'EB';
                break;

            case 9:
                generationName = 'EV';
                break;

            default:
                style = 'HOME'
                generationName = '';
                break;
        }
    }

    const shiny: string = isShiny ? 'shiny' : 'normal';
    const formName: string = form !== '' ? `${form}/` : '';

    switch (style)
    {
        case 'HOME':
            return `${baseUrl}/${formName}HOME/${shiny}/${pokemonId}.${extension}`;

        case 'Generation':
            return `${baseUrl}/${formName}${generationName}/${shiny}/${pokemonId}.${extension}`;

        case "Artwork":
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
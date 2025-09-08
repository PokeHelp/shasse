import {PokemonPicture, TypePictureStyle} from "@types";
import {pictureUrl} from "@config";

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
                                            isShiny = false,
                                            gameId = null
                                        }: PokemonPicture): string
{
    const extension: string = 'webp';
    const baseUrl: string = `${pictureUrl}/Image/${extension}`;
    const pokemonId: string = internationalNumber.toString().padStart(4, '0');
    let form: string;
    let generationName: string = '';
    let gameSlug: string = '';

    switch (formId)
    {
        case 140:
            form = "mega";
            break;

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

    if (style === 'Game')
    {
        switch (gameId)
        {
            case 1:
            case 3:
                gameSlug = "RB";
                break;

            case 2:
                gameSlug = "RV";
                break;

            case 4:
                gameSlug = "J";
                break;

            case 5:
            case 6:
            case 7:
                gameSlug = "OAC";
                break;

            case 8:
            case 9:
            case 10:
                gameSlug = "RSE";
                break;

            case 11:
            case 12:
                gameSlug = "RFVF";
                break;

            case 13:
            case 14:
            case 15:
                gameSlug = "DPP";
                break;

            case 16:
            case 17:
                gameSlug = "HGSS";
                break;

            case 18:
            case 19:
            case 20:
            case 21:
                gameSlug = "NBN2B2";
                break;

            case 22:
            case 23:
            case 24:
            case 25:
                gameSlug = "XY";
                break;

            case 26:
            case 27:
            case 28:
            case 29:
                gameSlug = "SLUSUL";
                break;

            case 30:
            case 31:
                gameSlug = "LGPE";
                break;

            case 32:
            case 33:
            case 34:
            case 35:
            case 36:
            case 37:
                gameSlug = "EB";
                break;

            case 38:
            case 39:
                gameSlug = "DEPS";
                break;

            case 40:
                gameSlug = "LPA";
                break;

            case 41:
            case 42:
            case 43:
            case 44:
            case 45:
            case 46:
                gameSlug = "EV";
                break;

            default:
                gameSlug = 'HOME';
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

        case 'Game':
            return `${baseUrl}/${gameSlug}/${shiny}/${pokemonId}.${extension}`;

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
    return `${pictureUrl}/Image/webp/types/${style}/${id}.webp`
}
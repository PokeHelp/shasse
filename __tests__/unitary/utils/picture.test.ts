import {describe, expect, test} from '@jest/globals';
import {getPokemonPictureFromId, getTypePictureById} from "@utils";
import {pictureUrl} from "@config";

const baseUrl: string = `${pictureUrl}/Image/webp`;

test('Base url récupérée', (): void =>
{
    expect(baseUrl).not.toBe('/Image/webp');
})

describe('Récupération des images de types', (): void =>
{
    test('Récupère un icon de type', (): void =>
    {
        expect(getTypePictureById(1)).toBe(
            `${baseUrl}/types/icon/1.webp`
        );
    });

    test('Récupère le nom entier du type', (): void =>
    {
        expect(getTypePictureById(1, "fullName")).toBe(
            `${baseUrl}/types/fullName/1.webp`
        );
    });
});

describe('Récupération les artwork de pokémon de toutes formes', (): void =>
{
    test("Récupère l'artwork d'un pokémon", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 1})).toBe(
            `${baseUrl}/Artwork/0001.webp`
        );
    });

    test("Récupère l'artwork d'un pokémon avec un formId null", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1})).toBe(
            `${baseUrl}/Artwork/0001.webp`
        );
    });

    test("Récupère l'artwork d'un pokémon avec un formId d'Alola", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 141})).toBe(
            `${baseUrl}/Artwork/0001_alola.webp`
        );
    });

    test("Récupère l'artwork d'un pokémon avec un formId de Galar", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 142})).toBe(
            `${baseUrl}/Artwork/0001_galar.webp`
        );
    });

    test("Récupère l'artwork d'un pokémon avec un formId de Hisui", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 143})).toBe(
            `${baseUrl}/Artwork/0001_hisui.webp`
        );
    });

    test("Récupère l'artwork d'un pokémon avec un formId de Paldea", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 144})).toBe(
            `${baseUrl}/Artwork/0001_paldea.webp`
        );
    });
});

describe("Récupération les images HOME de pokémon de toutes les formes", (): void =>
{
    test("Récupère l'image HOME d'un pokémon", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, style: 'HOME'})).toBe(
            `${baseUrl}/HOME/normal/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon shiny", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, style: 'HOME', isShiny: true})).toBe(
            `${baseUrl}/HOME/shiny/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon d'Alola", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 141, style: 'HOME'})).toBe(
            `${baseUrl}/Alola/HOME/normal/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon shiny d'Alola", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 141, style: 'HOME', isShiny: true})).toBe(
            `${baseUrl}/Alola/HOME/shiny/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon de Galar", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 142, style: 'HOME'})).toBe(
            `${baseUrl}/Galar/HOME/normal/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon shiny de Galar", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 142, style: 'HOME', isShiny: true})).toBe(
            `${baseUrl}/Galar/HOME/shiny/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon de Hisui", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 143, style: 'HOME'})).toBe(
            `${baseUrl}/Hisui/HOME/normal/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon shiny de Hisui", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 143, style: 'HOME', isShiny: true})).toBe(
            `${baseUrl}/Hisui/HOME/shiny/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon de Paldea", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 144, style: 'HOME'})).toBe(
            `${baseUrl}/Paldea/HOME/normal/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon shiny de Paldea", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 144, style: 'HOME', isShiny: true})).toBe(
            `${baseUrl}/Paldea/HOME/shiny/0001.webp`
        );
    });
});

describe("Récupération des images de pokémon suivant une génération des formes normales", (): void =>
{
    test("Récupère l'image HOME d'un pokémon avec une génération non éxistente", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: -1, style: "Generation"})).toBe(
            `${baseUrl}/HOME/normal/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon avec une génération non éxistente shiny", (): void =>
    {
        expect(getPokemonPictureFromId({
            internationalNumber: 1,
            generationId:        -1,
            isShiny:             true,
            style:               "Generation"
        })).toBe(
            `${baseUrl}/HOME/shiny/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 1", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 1, style: 'Generation'})).toBe(
            `${baseUrl}/RV/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 1 shyni", (): void =>
    {
        expect(getPokemonPictureFromId({
            internationalNumber: 1,
            generationId:        1,
            style:               'Generation',
            isShiny:             true
        })).toBe(
            `${baseUrl}/RV/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 2", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 2, style: 'Generation'})).toBe(
            `${baseUrl}/OAC/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 2 shiny", (): void =>
    {
        expect(getPokemonPictureFromId({
            internationalNumber: 1,
            generationId:        2,
            style:               'Generation',
            isShiny:             true
        })).toBe(
            `${baseUrl}/OAC/shiny/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 3", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 3, style: 'Generation'})).toBe(
            `${baseUrl}/RSE/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 3 shiny", (): void =>
    {
        expect(getPokemonPictureFromId({
            internationalNumber: 1,
            generationId:        3,
            style:               'Generation',
            isShiny:             true
        })).toBe(
            `${baseUrl}/RSE/shiny/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 4", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 4, style: 'Generation'})).toBe(
            `${baseUrl}/DPP/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 4 shiny", (): void =>
    {
        expect(getPokemonPictureFromId({
            internationalNumber: 1,
            generationId:        4,
            style:               'Generation',
            isShiny:             true
        })).toBe(
            `${baseUrl}/DPP/shiny/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 5", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 5, style: 'Generation'})).toBe(
            `${baseUrl}/NB/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 5 shiny", (): void =>
    {
        expect(getPokemonPictureFromId({
            internationalNumber: 1,
            generationId:        5,
            style:               'Generation',
            isShiny:             true
        })).toBe(
            `${baseUrl}/NB/shiny/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 6", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 6, style: 'Generation'})).toBe(
            `${baseUrl}/XY/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 6 shiny", (): void =>
    {
        expect(getPokemonPictureFromId({
            internationalNumber: 1,
            generationId:        6,
            style:               'Generation',
            isShiny:             true
        })).toBe(
            `${baseUrl}/XY/shiny/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 7", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 7, style: 'Generation'})).toBe(
            `${baseUrl}/SLUSUL/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 7 shiny", (): void =>
    {
        expect(getPokemonPictureFromId({
            internationalNumber: 1,
            generationId:        7,
            style:               'Generation',
            isShiny:             true
        })).toBe(
            `${baseUrl}/SLUSUL/shiny/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 8", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 8, style: 'Generation'})).toBe(
            `${baseUrl}/EB/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 8 shiny", (): void =>
    {
        expect(getPokemonPictureFromId({
            internationalNumber: 1,
            generationId:        8,
            style:               'Generation',
            isShiny:             true
        })).toBe(
            `${baseUrl}/EB/shiny/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 9", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 9, style: 'Generation'})).toBe(
            `${baseUrl}/EV/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 9 shiny", (): void =>
    {
        expect(getPokemonPictureFromId({
            internationalNumber: 1,
            generationId:        9,
            style:               'Generation',
            isShiny:             true
        })).toBe(
            `${baseUrl}/EV/shiny/0001.webp`
        );
    });
});

describe("Récupération des images de pokémon d'Alola suivant une génération", (): void =>
{
    test("Récupère l'image d'un pokémon d'Alola à la génération 7", (): void =>
    {
        expect(getPokemonPictureFromId({
            internationalNumber: 1,
            generationId:        7,
            formId:              141,
            style:               "Generation"
        })).toBe(
            `${baseUrl}/Alola/SLUSUL/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon d'Alola à la génération 8", (): void =>
    {
        expect(getPokemonPictureFromId({
            internationalNumber: 1,
            generationId:        8,
            formId:              141,
            style:               "Generation"
        })).toBe(
            `${baseUrl}/Alola/EB/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon d'Alola à la génération 9", (): void =>
    {
        expect(getPokemonPictureFromId({
            internationalNumber: 1,
            generationId:        9,
            formId:              141,
            style:               "Generation"
        })).toBe(
            `${baseUrl}/Alola/EV/normal/0001.webp`
        );
    });
});

describe("Récupération des images de pokémon de Galar suivant une génération", (): void =>
{
    test("Récupère l'image d'un pokémon de Galar à la génération 8", (): void =>
    {
        expect(getPokemonPictureFromId({
            internationalNumber: 1,
            generationId:        8,
            formId:              142,
            style:               "Generation"
        })).toBe(
            `${baseUrl}/Galar/EB/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de Galar à la génération 9", (): void =>
    {
        expect(getPokemonPictureFromId({
            internationalNumber: 1,
            generationId:        9,
            formId:              142,
            style:               "Generation"
        })).toBe(
            `${baseUrl}/Galar/EV/normal/0001.webp`
        );
    });
});

describe("Récupération des images de pokémon de Hisui suivant une génération", (): void =>
{
    test("Récupère l'image d'un pokémon de Hisui à la génération 9", (): void =>
    {
        expect(getPokemonPictureFromId({
            internationalNumber: 1,
            generationId:        9,
            formId:              143,
            style:               "Generation"
        })).toBe(
            `${baseUrl}/Hisui/EV/normal/0001.webp`
        );
    });
});

describe("Récupération des images de pokémon de Paldea suivant une génération", (): void =>
{
    test("Récupère l'image d'un pokémon de Paldea à la génération 9", (): void =>
    {
        expect(getPokemonPictureFromId({
            internationalNumber: 1,
            generationId:        9,
            formId:              144,
            style:               "Generation"
        })).toBe(
            `${baseUrl}/Paldea/EV/normal/0001.webp`
        );
    });
});

describe("Récupération des images d'un Pokémon mega", (): void =>
{
    test("Récupère l'image d'un mega florizarre", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 3, formId: 140, style: "Artwork"})).toBe(
            `${baseUrl}/Artwork/0003_mega.webp`
        );
    });
});

describe("Récupération des images d'un Pokémon suivant le jeu", (): void =>
{
    test("Récupère l'image d'un Pokémon de jeu par défaut", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, style: "Game"})).toBe(
            `${baseUrl}/HOME/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu ou l'id est incorrect", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: -1, style: "Game"})).toBe(
            `${baseUrl}/HOME/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 1", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 1, style: "Game"})).toBe(
            `${baseUrl}/RB/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 2", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 2, style: "Game"})).toBe(
            `${baseUrl}/RV/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 3", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 3, style: "Game"})).toBe(
            `${baseUrl}/RB/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 4", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 4, style: "Game"})).toBe(
            `${baseUrl}/J/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 5", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 5, style: "Game"})).toBe(
            `${baseUrl}/OAC/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 6", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 6, style: "Game"})).toBe(
            `${baseUrl}/OAC/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 7", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 7, style: "Game"})).toBe(
            `${baseUrl}/OAC/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 8", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 8, style: "Game"})).toBe(
            `${baseUrl}/RSE/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 9", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 9, style: "Game"})).toBe(
            `${baseUrl}/RSE/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 10", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 10, style: "Game"})).toBe(
            `${baseUrl}/RSE/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 11", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 11, style: "Game"})).toBe(
            `${baseUrl}/RFVF/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 12", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 12, style: "Game"})).toBe(
            `${baseUrl}/RFVF/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 13", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 13, style: "Game"})).toBe(
            `${baseUrl}/DPP/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 14", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 14, style: "Game"})).toBe(
            `${baseUrl}/DPP/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 15", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 15, style: "Game"})).toBe(
            `${baseUrl}/DPP/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 16", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 16, style: "Game"})).toBe(
            `${baseUrl}/HGSS/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 17", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 17, style: "Game"})).toBe(
            `${baseUrl}/HGSS/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 18", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 18, style: "Game"})).toBe(
            `${baseUrl}/NBN2B2/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 19", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 19, style: "Game"})).toBe(
            `${baseUrl}/NBN2B2/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 20", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 20, style: "Game"})).toBe(
            `${baseUrl}/NBN2B2/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 21", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 21, style: "Game"})).toBe(
            `${baseUrl}/NBN2B2/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 22", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 22, style: "Game"})).toBe(
            `${baseUrl}/XY/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 23", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 23, style: "Game"})).toBe(
            `${baseUrl}/XY/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 24", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 24, style: "Game"})).toBe(
            `${baseUrl}/XY/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 25", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 25, style: "Game"})).toBe(
            `${baseUrl}/XY/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 26", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 26, style: "Game"})).toBe(
            `${baseUrl}/SLUSUL/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 27", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 27, style: "Game"})).toBe(
            `${baseUrl}/SLUSUL/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 28", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 28, style: "Game"})).toBe(
            `${baseUrl}/SLUSUL/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 29", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 29, style: "Game"})).toBe(
            `${baseUrl}/SLUSUL/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 30", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 30, style: "Game"})).toBe(
            `${baseUrl}/LGPE/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 31", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 31, style: "Game"})).toBe(
            `${baseUrl}/LGPE/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 32", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 32, style: "Game"})).toBe(
            `${baseUrl}/EB/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 33", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 33, style: "Game"})).toBe(
            `${baseUrl}/EB/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 34", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 34, style: "Game"})).toBe(
            `${baseUrl}/EB/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 35", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 35, style: "Game"})).toBe(
            `${baseUrl}/EB/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 36", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 36, style: "Game"})).toBe(
            `${baseUrl}/EB/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 37", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 37, style: "Game"})).toBe(
            `${baseUrl}/EB/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 38", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 38, style: "Game"})).toBe(
            `${baseUrl}/DEPS/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 39", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 39, style: "Game"})).toBe(
            `${baseUrl}/DEPS/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 40", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 40, style: "Game"})).toBe(
            `${baseUrl}/LPA/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 41", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 41, style: "Game"})).toBe(
            `${baseUrl}/EV/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 42", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 42, style: "Game"})).toBe(
            `${baseUrl}/EV/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 43", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 43, style: "Game"})).toBe(
            `${baseUrl}/EV/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 44", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 44, style: "Game"})).toBe(
            `${baseUrl}/EV/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 45", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 45, style: "Game"})).toBe(
            `${baseUrl}/EV/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un Pokémon de jeu 46", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, gameId: 46, style: "Game"})).toBe(
            `${baseUrl}/EV/normal/0001.webp`
        );
    });
});

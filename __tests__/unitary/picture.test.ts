import {describe, expect, test} from '@jest/globals';
import {getPokemonPictureFromId, getTypePictureById} from "@utils";

const baseUrl: string = `${process.env.NEXT_PUBLIC_PICTURE_URL ?? ''}/Image/webp`;

test('Base url récupérée', (): void => {
    expect(baseUrl).not.toBe('/Image/webp');
})

describe('Récupération des images de types', (): void => {
    test('Récupère un icon de type', (): void => {
        expect(getTypePictureById(1)).toBe(
            `${baseUrl}/types/icon/1.webp`
        );
    });

    test('Récupère le nom entier du type', (): void => {
        expect(getTypePictureById(1, "fullName")).toBe(
            `${baseUrl}/types/fullName/1.webp`
        );
    });
});

describe('Récupération les artwork de pokémon de toutes formes', (): void => {
    test("Récupère l'artwork d'un pokémon", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 1})).toBe(
            `${baseUrl}/Artwork/0001.webp`
        );
    });

    test("Récupère l'artwork d'un pokémon avec un formId null", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1})).toBe(
            `${baseUrl}/Artwork/0001.webp`
        );
    });

    test("Récupère l'artwork d'un pokémon avec un formId d'Alola", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 141})).toBe(
            `${baseUrl}/Artwork/0001_alola.webp`
        );
    });

    test("Récupère l'artwork d'un pokémon avec un formId de Galar", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 142})).toBe(
            `${baseUrl}/Artwork/0001_galar.webp`
        );
    });

    test("Récupère l'artwork d'un pokémon avec un formId de Hisui", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 143})).toBe(
            `${baseUrl}/Artwork/0001_hisui.webp`
        );
    });

    test("Récupère l'artwork d'un pokémon avec un formId de Paldea", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 144})).toBe(
            `${baseUrl}/Artwork/0001_paldea.webp`
        );
    });
});

describe("Récupération les images HOME de pokémon de toutes les formes", (): void => {
    test("Récupère l'image HOME d'un pokémon", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, style: 'HOME'})).toBe(
            `${baseUrl}/HOME/normal/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon shiny", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, style: 'HOME', isShiny: true})).toBe(
            `${baseUrl}/HOME/shiny/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon d'Alola", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 141, style: 'HOME'})).toBe(
            `${baseUrl}/Alola/HOME/normal/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon shiny d'Alola", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 141, style: 'HOME', isShiny: true})).toBe(
            `${baseUrl}/Alola/HOME/shiny/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon de Galar", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 142, style: 'HOME'})).toBe(
            `${baseUrl}/Galar/HOME/normal/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon shiny de Galar", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 142, style: 'HOME', isShiny: true})).toBe(
            `${baseUrl}/Galar/HOME/shiny/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon de Hisui", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 143, style: 'HOME'})).toBe(
            `${baseUrl}/Hisui/HOME/normal/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon shiny de Hisui", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 143, style: 'HOME', isShiny: true})).toBe(
            `${baseUrl}/Hisui/HOME/shiny/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon de Paldea", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 144, style: 'HOME'})).toBe(
            `${baseUrl}/Paldea/HOME/normal/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon shiny de Paldea", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 144, style: 'HOME', isShiny: true})).toBe(
            `${baseUrl}/Paldea/HOME/shiny/0001.webp`
        );
    });
});

describe("Récupération des images de pokémon suivant une génération des formes normales", (): void => {
    test("Récupère l'image HOME d'un pokémon avec une génération non éxistente", (): void =>
    {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: -1, style: "Generation"})).toBe(
            `${baseUrl}/HOME/normal/0001.webp`
        );
    });

    test("Récupère l'image HOME d'un pokémon avec une génération non éxistente shiny", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: -1, isShiny: true, style: "Generation"})).toBe(
            `${baseUrl}/HOME/shiny/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 1", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 1, style: 'Generation'})).toBe(
            `${baseUrl}/RV/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 1 shyni", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 1, style: 'Generation', isShiny: true})).toBe(
            `${baseUrl}/RV/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 2", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 2, style: 'Generation'})).toBe(
            `${baseUrl}/OAC/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 2 shiny", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 2, style: 'Generation', isShiny: true})).toBe(
            `${baseUrl}/OAC/shiny/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 3", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 3, style: 'Generation'})).toBe(
            `${baseUrl}/RSE/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 3 shiny", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 3, style: 'Generation', isShiny: true})).toBe(
            `${baseUrl}/RSE/shiny/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 4", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 4, style: 'Generation'})).toBe(
            `${baseUrl}/DPP/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 4 shiny", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 4, style: 'Generation', isShiny: true})).toBe(
            `${baseUrl}/DPP/shiny/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 5", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 5, style: 'Generation'})).toBe(
            `${baseUrl}/NB/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 5 shiny", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 5, style: 'Generation', isShiny: true})).toBe(
            `${baseUrl}/NB/shiny/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 6", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 6, style: 'Generation'})).toBe(
            `${baseUrl}/XY/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 6 shiny", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 6, style: 'Generation', isShiny: true})).toBe(
            `${baseUrl}/XY/shiny/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 7", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 7, style: 'Generation'})).toBe(
            `${baseUrl}/SLUSUL/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 7 shiny", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 7, style: 'Generation', isShiny: true})).toBe(
            `${baseUrl}/SLUSUL/shiny/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 8", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 8, style: 'Generation'})).toBe(
            `${baseUrl}/EB/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 8 shiny", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 8, style: 'Generation', isShiny: true})).toBe(
            `${baseUrl}/EB/shiny/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 9", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 9, style: 'Generation'})).toBe(
            `${baseUrl}/EV/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de génération 9 shiny", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 9, style: 'Generation', isShiny: true})).toBe(
            `${baseUrl}/EV/shiny/0001.webp`
        );
    });
});

describe("Récupération des images de pokémon d'Alola suivant une génération", (): void => {
    test("Récupère l'image d'un pokémon d'Alola à la génération 7", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 7, formId: 141, style: "Generation"})).toBe(
            `${baseUrl}/Alola/SLUSUL/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon d'Alola à la génération 8", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 8, formId: 141, style: "Generation"})).toBe(
            `${baseUrl}/Alola/EB/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon d'Alola à la génération 9", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 9, formId: 141, style: "Generation"})).toBe(
            `${baseUrl}/Alola/EV/normal/0001.webp`
        );
    });
});

describe("Récupération des images de pokémon de Galar suivant une génération", (): void => {
    test("Récupère l'image d'un pokémon de Galar à la génération 8", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 8, formId: 142, style: "Generation"})).toBe(
            `${baseUrl}/Galar/EB/normal/0001.webp`
        );
    });

    test("Récupère l'image d'un pokémon de Galar à la génération 9", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 9, formId: 142, style: "Generation"})).toBe(
            `${baseUrl}/Galar/EV/normal/0001.webp`
        );
    });
});

describe("Récupération des images de pokémon de Hisui suivant une génération", (): void => {
    test("Récupère l'image d'un pokémon de Hisui à la génération 9", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 9, formId: 143, style: "Generation"})).toBe(
            `${baseUrl}/Hisui/EV/normal/0001.webp`
        );
    });
});

describe("Récupération des images de pokémon de Paldea suivant une génération", (): void => {
    test("Récupère l'image d'un pokémon de Paldea à la génération 9", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, generationId: 9, formId: 144, style: "Generation"})).toBe(
            `${baseUrl}/Paldea/EV/normal/0001.webp`
        );
    });
});
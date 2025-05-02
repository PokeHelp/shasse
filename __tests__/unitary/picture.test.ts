import {describe, expect, test} from '@jest/globals';
import {getPokemonPictureFromId, getTypePictureById} from "@utils";

const baseUrl: string | undefined = process.env.NEXT_PUBLIC_PICTURE_URL;

test('Base url récupérée', (): void => {
    expect(baseUrl).not.toBeUndefined();
})

describe('Récupération des images de types', (): void => {
    test('Récupère un icon de type', (): void => {
        expect(getTypePictureById(1)).toBe(
            `${baseUrl}/Image/webp/types/icon/1.webp`
        );
    });

    test('Récupère le nom entier du type', (): void => {
        expect(getTypePictureById(1, "fullName")).toBe(
            `${baseUrl}/Image/webp/types/fullName/1.webp`
        );
    });
});

describe('Récupération des images de pokémon de toutes formes', (): void => {
    test("Récupère l'artwork d'un pokémon", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 1})).toBe(
            `${baseUrl}/Image/webp/Artwork/0001.webp`
        );
    });

    test("Récupère l'artwork d'un pokémon avec un formId null", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: null})).toBe(
            `${baseUrl}/Image/webp/Artwork/0001.webp`
        );
    });

    test("Récupère l'artwork d'un pokémon avec un formId d'Alola", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 141})).toBe(
            `${baseUrl}/Image/webp/Artwork/0001_alola.webp`
        );
    });

    test("Récupère l'artwork d'un pokémon avec un formId de Galar", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 142})).toBe(
            `${baseUrl}/Image/webp/Artwork/0001_galar.webp`
        );
    });

    test("Récupère l'artwork d'un pokémon avec un formId de Hisui", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 143})).toBe(
            `${baseUrl}/Image/webp/Artwork/0001_hisui.webp`
        );
    });

    test("Récupère l'artwork d'un pokémon avec un formId de Paldea", (): void => {
        expect(getPokemonPictureFromId({internationalNumber: 1, formId: 144})).toBe(
            `${baseUrl}/Image/webp/Artwork/0001_paldea.webp`
        );
    });
});
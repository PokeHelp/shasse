// TODO: voir pour les test, ici ça ne devrait pas être que des mock car on veut tester aussi les données

describe('Test', () => {
    test('test ok', () => {
        expect(null).toBeNull();
    })
})

// import {getAllEvolutions, getFirstEvolutionId} from "@query";
// import {EvolutionTree} from "@types";
// import {prisma} from "@lib";
//
// jest.mock('@lib', () => ({
//     __esModule: true,
//     prisma: {
//         evolution: {
//             findMany: jest.fn()
//         }
//     }
// }));
//
// describe("Vérifie que le pokémon de base récupéré est correct", (): void =>
// {
//     test("Vérification pour Mewtwo", async (): Promise<void> =>
//     {
//         (prisma.evolution.findMany as jest.Mock).mockResolvedValue([]);
//
//         expect(await getFirstEvolutionId(194)).toBeNull();
//     });
//
//     test("Vérification pour Bulbizarre", async (): Promise<void> =>
//     {
//         expect(await getFirstEvolutionId(1)).toEqual([1]);
//     });
//
//     test("Vérification pour Herbizarre", async (): Promise<void> =>
//     {
//         expect(await getFirstEvolutionId(2)).toEqual([1]);
//     });
//
//     test("Vérification pour Florizarre", async (): Promise<void> =>
//     {
//         expect(await getFirstEvolutionId(3)).toEqual([1]);
//     });
//
//     test("Vérification pour Pyroli", async (): Promise<void> =>
//     {
//         expect(await getFirstEvolutionId(180)).toEqual([177]);
//     });
//
//     test("Vérification pour Phyllali", async (): Promise<void> =>
//     {
//         expect(await getFirstEvolutionId(703)).toEqual([177]);
//     });
//
//     test("Vérification pour Gromago", async (): Promise<void> =>
//     {
//         expect(await getFirstEvolutionId(1455)).toEqual([1450, 1453]);
//     });
//
//     test("Vérification pour Dratatin", async (): Promise<void> =>
//     {
//         expect(await getFirstEvolutionId(1242)).toEqual([1240]);
//     });
//
//     test("Vérification pour Pomdramour", async (): Promise<void> =>
//     {
//         expect(await getFirstEvolutionId(1466)).toEqual([1240]);
//     });
//
//     test("Vérification pour Pomdorochi", async (): Promise<void> =>
//     {
//         expect(await getFirstEvolutionId(1489)).toEqual([1240]);
//     });
// });
//
// describe("Vérification de l'évolution d'un pokemon form", (): void =>
// {
//     test("Vérification de Mewtwo", async (): Promise<void> =>
//     {
//         expect(await getAllEvolutions(194, 1)).toEqual([]);
//     });
//
//     test("Vérification des évolutions: Bulbizarre, Herbizarre et Florizarre", async (): Promise<void> =>
//     {
//         const evolutionResult: EvolutionTree[] = [{
//             pokemonName:         "Bulbizarre",
//             formId:              1,
//             internationalNumber: 1,
//             evos:                [
//                 {
//                     evolutionName:       "Herbizarre",
//                     level:               16,
//                     internationalNumber: 2,
//                     formId:              1,
//                     infoId:              1,
//                     methodName:          "Level",
//                     infoName:            "Aucune information complémentaire d'évolution.",
//                     evos:                [
//                         {
//                             evolutionName:       "Florizarre",
//                             level:               32,
//                             infoId:              1,
//                             formId:              1,
//                             internationalNumber: 3,
//                             methodName:          "Level",
//                             infoName:            "Aucune information complémentaire d'évolution.",
//                             evos:                []
//                         }
//                     ]
//                 }
//             ]
//         }];
//
//         expect(await getAllEvolutions(1, 1)).toEqual(evolutionResult);
//         expect(await getAllEvolutions(2, 1)).toEqual(evolutionResult);
//         expect(await getAllEvolutions(3, 1)).toEqual(evolutionResult);
//     });
//
//     test("Vérification des évolutions: Pyroli et Phyllali", async (): Promise<void> =>
//     {
//         const evolutionResult: EvolutionTree[] = [{
//             pokemonName:         "Évoli",
//             internationalNumber: 133,
//             formId:              1,
//             evos:                [
//                 {
//                     evolutionName:       "Aquali",
//                     level:               -1,
//                     formId:              1,
//                     infoId:              1,
//                     internationalNumber: 134,
//                     methodName:          "Pierre Eau",
//                     infoName:            "Aucune information complémentaire d'évolution.",
//                     evos:                []
//                 },
//                 {
//                     evolutionName:       "Pyroli",
//                     level:               -1,
//                     formId:              1,
//                     infoId:              1,
//                     internationalNumber: 136,
//                     methodName:          "Pierre Feu",
//                     infoName:            "Aucune information complémentaire d'évolution.",
//                     evos:                []
//                 },
//                 {
//                     evolutionName:       "Voltali",
//                     level:               -1,
//                     formId:              1,
//                     infoId:              1,
//                     internationalNumber: 135,
//                     methodName:          "Pierre Feu",
//                     infoName:            "Aucune information complémentaire d'évolution.",
//                     evos:                []
//                 },
//                 {
//                     evolutionName:       "Mentali",
//                     level:               -1,
//                     formId:              1,
//                     infoId:              19,
//                     internationalNumber: 196,
//                     methodName:          "Bonheur",
//                     infoName:            "Uniquement de jour en ne connaissant aucune attaque de type Fée.",
//                     evos:                []
//                 },
//                 {
//                     evolutionName:       "Noctali",
//                     level:               -1,
//                     formId:              1,
//                     infoId:              20,
//                     internationalNumber: 197,
//                     methodName:          "Bonheur",
//                     infoName:            "Uniquement de nuit en ne connaissant aucune attaque de type Fée.",
//                     evos:                []
//                 },
//                 {
//                     evolutionName:       "Phyllali",
//                     level:               -1,
//                     formId:              1,
//                     infoId:              21,
//                     internationalNumber: 470,
//                     methodName:          "Special",
//                     infoName:            "Gagner un niveau près d'une Pierre Mousse avant EB et dans DEPS, Pierre Plante Pierre Plante depuis EB, être près du Rocher Moussu dans LPA",
//                     evos:                []
//                 },
//                 {
//                     evolutionName:       "Givrali",
//                     level:               -1,
//                     formId:              1,
//                     infoId:              22,
//                     internationalNumber: 471,
//                     methodName:          "Special",
//                     infoName:            "Gagner un niveau près d'une Pierre Glacée avant EB et dans DEPS, Pierre Glace Pierre Glace depuis EB, être près de la Pierre Gelée dans LPA",
//                     evos:                []
//                 },
//                 {
//                     evolutionName:       "Nymphali",
//                     level:               -1,
//                     formId:              1,
//                     infoId:              23,
//                     internationalNumber: 700,
//                     methodName:          "Bonheur",
//                     infoName:            "Connaitre une attaque de type Fée.",
//                     evos:                []
//                 }
//             ]
//         }];
//
//         expect(await getAllEvolutions(180, 1)).toEqual(evolutionResult);
//         expect(await getAllEvolutions(703, 1)).toEqual(evolutionResult);
//     });
//
//     test("Vérification des évolutions: Mordudor et Gromago", async (): Promise<void> =>
//     {
//         const evolutionResult: EvolutionTree[] = [{
//             pokemonName:         "Mordudor Coffre",
//             internationalNumber: 999,
//             formId:              1,
//             evos:                [
//                 {
//                     evolutionName:       "Gromago",
//                     level:               -1,
//                     infoId:              85,
//                     internationalNumber: 1000,
//                     formId:              1,
//                     methodName:          "Special",
//                     infoName:            "Avoir 999 Pièces de Mordudor, puis gagner un niveau.",
//                     evos:                []
//                 }
//             ]
//         }, {
//             pokemonName:         "Mordudor Marche",
//             internationalNumber: 999,
//             formId:              131,
//             evos:                [{
//                 evolutionName:       "Gromago",
//                 level:               -1,
//                 infoId:              85,
//                 internationalNumber: 1000,
//                 formId:              1,
//                 methodName:          "Special",
//                 infoName:            "Avoir 999 Pièces de Mordudor, puis gagner un niveau.",
//                 evos:                []
//             }]
//         }];
//
//         expect(await getAllEvolutions(1455, 1)).toEqual(evolutionResult);
//     });
//
//     test("Vérification des évolutions: Dratatin, Pomdramour et Pomdorochi", async (): Promise<void> =>
//     {
//         const evolutionResult: EvolutionTree[] = [{
//             pokemonName:         "Verpom",
//             formId:              1,
//             internationalNumber: 840,
//             evos:                [
//                 {
//                     evolutionName:       "Pomdrapi",
//                     level:               -1,
//                     formId:              1,
//                     infoId:              70,
//                     internationalNumber: 841,
//                     methodName:          "Special",
//                     infoName:            "Contact avec Pomme acidulée",
//                     evos:                []
//                 },
//                 {
//                     evolutionName:       "Dratatin",
//                     level:               -1,
//                     formId:              1,
//                     infoId:              71,
//                     internationalNumber: 842,
//                     methodName:          "Special",
//                     infoName:            "Contact avec Pomme sucrée",
//                     evos:                []
//                 },
//                 {
//                     evolutionName: "Pomdramour",
//                     level:         -1,
//                     formId:        1,
//                     infoId:        72,
//                     internationalNumber: 1011,
//                     methodName:    "Special",
//                     infoName:      "Contact avec Pomme nectar",
//                     evos:          [
//                         {
//                             evolutionName: "Pomdorochi",
//                             level:         -1,
//                             formId:        1,
//                             infoId:        86,
//                             internationalNumber: 1019,
//                             methodName:    "Connaitre une attaque",
//                             infoName:      "Connaitre l'attaque Cri Draconique.",
//                             evos:          []
//                         }
//                     ]
//                 }
//             ]
//         }];
//
//         expect(await getAllEvolutions(1242, 1)).toEqual(evolutionResult);
//         expect(await getAllEvolutions(1466, 1)).toEqual(evolutionResult);
//         expect(await getAllEvolutions(1489, 1)).toEqual(evolutionResult);
//     });
// });
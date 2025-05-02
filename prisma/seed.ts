import {PrismaClient, reference_table} from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

type capacityJson = {
    "nameFr": string,
    "nameEn": string,
    "nameJp": string,
    "category": string,
    "PP": string | number | null,
    "power": string | number | null,
    "dynamaxPower": string | number | null,
    "precision": string | number | null,
    "ciblageType": string,
    "ciblage": string,
    "particularite": string | null,
    "influence": string | null,
    "effectWithoutFight": string | null,
    "contrecoup": boolean | null,
    "subEffectZ": string | null,
    "genApparition": string,
    "type": string,
    "groupeGame": { [keys: string]: string }[]
};
type pokemonGrouped = {
    "infosLangue": { "nom": string, "langue": string, "description": string }[],
    "gender": string[],
    "form": string[],
    "statistiqueGroupeJeu": {
        "listeNomJeu": string[], "statistique": {
            "pv": number,
            "attaque": number,
            "defense": number,
            "attaqueSpe": number,
            "defenseSpe": number,
            "vitesse": number,
            "special": number
        }
    }[],
    "numeroInternational": number,
    "xpGlobalLvl100": number,
    "cycleEclosion": number,
    "tauxCapture": number,
    "tauxAppelleAide": number,
    "taille": number,
    "poids": number,
    "chanceMale": number,
    "chanceFemelle": number,
    "categorie": string,
    "genApparition": number,
    "nationnalNumber": { "game": string, "land": string, "number": number }[],
    "infos": {
        "type": { "type1": string, "type2": string },
        "groupeOeuf": { "groupeOeuf1": string, "groupeOeuf2": string },
        "evolution": {
            "nomPokemon": string,
            "niveau": string,
            "nomMethode": string,
            "informationComplementaire": string
        }[],
        "talent": { "nom": string, "cache": boolean, "order": number }[],
        "numGen": number,
        "xpDonnerMort": number
    }[]
};
type Capacities = { [key: string]: CapacityInfo[] };
type CapacityInfo = {
    "name": string,
    "detail": string,
    "type": string,
    "game": string[]
};
type location = {
    "listInfo": {
        "list": {
            "pokemon": string,
            "method": string,
            "rates": [
                {
                    "rateName": string,
                    "rate": number,
                    "minLevel": number,
                    "maxLevel": number,
                    "detail": string | null,
                    "condition": string | null,
                    "limit": string | null,
                    "shasse"?: string[],
                    "alpha"?: boolean
                }
            ],
            "versions": string[]
        }[],
        "lieu": string;
        "location": string;
    }[]
};
type evolutionJson = {
    [key: string]:
        {
            "nomPokemon": string,
            "niveau": number,
            "nomMethode": string,
            "informationComplementaire": string
        }[]
}

async function seedType(): Promise<void>
{
    await resetBDD('type');

    const aType: { color: string, iconName: string, nameFr: string, nameEn: string, nameJp: string }[] = [
        {color: '#C1C2C1', iconName: 'normal', nameFr: 'Normal', nameEn: 'Normal', nameJp: 'ノーマルタイプ'},
        {color: '#FFAC59', iconName: 'fight', nameFr: 'Combat', nameEn: 'Fighting', nameJp: 'かくとうタイプ'},
        {color: '#ADD2F5', iconName: 'fly', nameFr: 'Vol', nameEn: 'Flying', nameJp: 'ひこうタイプ'},
        {color: '#B884DD', iconName: 'poison', nameFr: 'Poison', nameEn: 'Poison', nameJp: 'どくタイプ'},
        {color: '#B88E6F', iconName: 'ground', nameFr: 'Sol', nameEn: 'Ground', nameJp: 'じめんタイプ'},
        {color: '#CBC7AD', iconName: 'rock', nameFr: 'Roche', nameEn: 'Rock', nameJp: 'いわタイプ'},
        {color: '#B8C26A', iconName: 'bug', nameFr: 'Insecte', nameEn: 'Bug', nameJp: 'むしタイプ'},
        {color: '#A284A2', iconName: 'ghost', nameFr: 'Spectre', nameEn: 'Ghost', nameJp: 'ゴーストタイプ'},
        {color: '#98C2D1', iconName: 'steel', nameFr: 'Acier', nameEn: 'Steel', nameJp: 'はがねタイプ'},
        {color: '#EF7374', iconName: 'fire', nameFr: 'Feu', nameEn: 'Fire', nameJp: 'ほのおタイプ'},
        {color: '#74ACF5', iconName: 'water', nameFr: 'Eau', nameEn: 'Water', nameJp: 'みずタイプ'},
        {color: '#82C274', iconName: 'grass', nameFr: 'Plante', nameEn: 'Grass', nameJp: 'くさタイプ'},
        {color: '#FCD659', iconName: 'electric', nameFr: 'Électrik', nameEn: 'Electric', nameJp: 'でんきタイプ'},
        {color: '#F584A8', iconName: 'psychic', nameFr: 'Psy', nameEn: 'Psychic', nameJp: 'エスパータイプ'},
        {color: '#81DFF7', iconName: 'ice', nameFr: 'Glace', nameEn: 'Ice', nameJp: 'こおりタイプ'},
        {color: '#8D98EC', iconName: 'dragon', nameFr: 'Dragon', nameEn: 'Dragon', nameJp: 'ドラゴンタイプ'},
        {color: '#998B8C', iconName: 'dark', nameFr: 'Ténèbres', nameEn: 'Dark', nameJp: 'あくタイプ'},
        {color: '#F5A2F5', iconName: 'fairy', nameFr: 'Fée', nameEn: 'Fairy', nameJp: 'フェアリータイプ'},
        {color: '#83CFC5', iconName: 'stellar', nameFr: 'Stellaire', nameEn: 'Stellar', nameJp: 'ステラタイプ'},
        {color: '#68A090', iconName: 'unknow', nameFr: '???', nameEn: '???', nameJp: '？？？タイプ'}
    ];
    const langueFrId: number = await getLangueId('french');
    const langueEnId: number = await getLangueId('english');
    const langueJpId: number = await getLangueId('japanese');

    console.log('----- Insertion type -----');
    for (const typeData of aType)
    {
        console.log(`-- Insertion du type: _${typeData.nameFr}_ --`)
        const type: { id: number } = await prisma.type.create({
            data:   {color: typeData.color, iconName: typeData.iconName},
            select: {id: true}
        });

        console.log('-- insertion de la traduction --');
        await insertTranslate({
            langueId:       langueFrId,
            referenceTable: reference_table.TYPE,
            referenceId:    type.id,
            name:           typeData.nameFr
        });

        await insertTranslate({
            langueId:       langueEnId,
            referenceTable: reference_table.TYPE,
            referenceId:    type.id,
            name:           typeData.nameEn
        });

        await insertTranslate({
            langueId:       langueJpId,
            referenceTable: reference_table.TYPE,
            referenceId:    type.id,
            name:           typeData.nameJp
        });
    }
}

async function seedLangue(): Promise<void>
{
    await resetBDD('langue');

    const aData: { name: string, isoCode: string }[] = [
        {name: 'french', isoCode: 'fr'},
        {name: 'english', isoCode: 'gb'},
        {name: 'japanese', isoCode: 'jp'}
    ]

    console.log('----- Insertion Langue -----')
    for (const data of aData)
    {
        console.log(`Insertion langue: ${data.name}`);
        await prisma.langue.create({data: data})
    }
}

async function seedGeneration(): Promise<void>
{
    await resetBDD('generation');

    console.log('----- Insertion Générations -----')

    for (let i: number = 1; i < 10; i++)
    {
        console.log(`Insertion de la génération: ${i}`)
        await prisma.generation.create({data: {id: i}})
    }
}

async function seedGame(): Promise<void>
{
    await resetBDD('game');
    const aGame: { generation: number, nameFr: string, nameEn: string, nameJp: string }[] = [
        {generation: 1, nameFr: 'Pokémon Rouge', nameEn: 'Pokémon Red Version', nameJp: 'ポケットモンスター　赤'},
        {generation: 1, nameFr: 'Pokémon Vert', nameEn: 'Pokémon Green Version', nameJp: 'ポケットモンスター　緑'},
        {generation: 1, nameFr: 'Pokémon Bleu', nameEn: 'Pokémon Blue Version', nameJp: 'ポケットモンスター　青'},
        {
            generation: 1,
            nameFr:     'Pokémon Jaune',
            nameEn:     'Pokémon Yellow Version',
            nameJp:     'ポケットモンスター　ピカチュウ'
        },
        {generation: 2, nameFr: 'Pokémon Or', nameEn: 'Pokémon Gold Version', nameJp: 'ポケットモンスター　金'},
        {generation: 2, nameFr: 'Pokémon Argent', nameEn: 'Pokémon Silver Version', nameJp: 'ポケットモンスター　銀'},
        {
            generation: 2,
            nameFr:     'Pokémon Cristal',
            nameEn:     'Pokémon Crystal Version',
            nameJp:     'ポケットモンスター　クリスタルバージョン'
        },
        {generation: 3, nameFr: 'Pokémon Rubis', nameEn: 'Pokémon Ruby Version', nameJp: 'ポケットモンスタールビー'},
        {
            generation: 3,
            nameFr:     'Pokémon Saphir',
            nameEn:     'Pokémon Sapphire Version',
            nameJp:     'ポケットモンスターサファイア'
        },
        {
            generation: 3,
            nameFr:     'Pokémon Émeraude',
            nameEn:     'Pokémon Emerald Version',
            nameJp:     'ポケットモンスターエメラルド'
        },
        {
            generation: 3,
            nameFr:     'Pokémon Rouge Feu',
            nameEn:     'Pokémon FireRed Version',
            nameJp:     'ポケットモンスターファイアレッド'
        },
        {
            generation: 3,
            nameFr:     'Pokémon Vert Feuille',
            nameEn:     'Pokémon LeafGreen Version',
            nameJp:     'ポケットモンスターリーフグリーン'
        },
        {
            generation: 4,
            nameFr:     'Pokémon Diamant',
            nameEn:     'Pokémon Diamond Version',
            nameJp:     'ポケットモンスター ダイヤモンド'
        },
        {generation: 4, nameFr: 'Pokémon Perle', nameEn: 'Pokémon Pearl Version', nameJp: 'ポケットモンスター パール'},
        {
            generation: 4,
            nameFr:     'Pokémon Platine',
            nameEn:     'Pokémon Platinum Version',
            nameJp:     'ポケットモンスター プラチナ'
        },
        {
            generation: 4,
            nameFr:     'Pokémon Or HeartGold',
            nameEn:     'Pokémon HeartGold Version',
            nameJp:     'ポケットモンスター ハートゴールド'
        },
        {
            generation: 4,
            nameFr:     'Pokémon Argent SoulSilver',
            nameEn:     'Pokémon SoulSilver Version',
            nameJp:     'ポケットモンスター ソウルシルバー'
        },
        {generation: 5, nameFr: 'Pokémon Noir', nameEn: 'Pokémon Black Version', nameJp: 'ポケットモンスター ブラック'},
        {
            generation: 5,
            nameFr:     'Pokémon Blanc',
            nameEn:     'Pokémon White Version',
            nameJp:     'ポケットモンスター ホワイト'
        },
        {
            generation: 5,
            nameFr:     'Pokémon Noir 2',
            nameEn:     'Pokémon Black Version 2',
            nameJp:     'ポケットモンスター ブラック ２'
        },
        {
            generation: 5,
            nameFr:     'Pokémon Blanc 2',
            nameEn:     'Pokémon White Version 2',
            nameJp:     'ポケットモンスター ホワイト ２'
        },
        {generation: 6, nameFr: 'Pokémon X', nameEn: 'Pokémon X', nameJp: 'ポケットモンスターＸ'},
        {generation: 6, nameFr: 'Pokémon Y', nameEn: 'Pokémon Y', nameJp: 'ポケットモンスターＹ'},
        {
            generation: 6,
            nameFr:     'Pokémon Rubis Oméga',
            nameEn:     'Pokémon Omega Ruby',
            nameJp:     'ポケットモンスター オメガルビー'
        },
        {
            generation: 6,
            nameFr:     'Pokémon Saphir Alpha',
            nameEn:     'Pokémon Alpha Sapphire',
            nameJp:     'ポケットモンスター アルファサファイア'
        },
        {generation: 7, nameFr: 'Pokémon Soleil', nameEn: 'Pokémon Sun', nameJp: 'ポケットモンスターサン'},
        {generation: 7, nameFr: 'Pokémon Lune', nameEn: 'Pokémon Moon', nameJp: 'ポケットモンスタームーン'},
        {
            generation: 7,
            nameFr:     'Pokémon Ultra-Soleil',
            nameEn:     'Pokémon Ultra Sun',
            nameJp:     'ポケットモンスター ウルトラサン'
        },
        {
            generation: 7,
            nameFr:     'Pokémon Ultra-Lune',
            nameEn:     'Pokémon Ultra Moon',
            nameJp:     'ポケットモンスター ウルトラムーン'
        },
        {
            generation: 7,
            nameFr:     "Pokémon Let's Go Pikachu",
            nameEn:     "Pokémon: Let's Go, Pikachu!",
            nameJp:     "ポケットモンスター Let's Go! ピカチュウ"
        },
        {
            generation: 7,
            nameFr:     "Pokémon Let's Go Évoli",
            nameEn:     "Pokémon: Let's Go, Eevee!",
            nameJp:     "ポケットモンスター Let's Go! イーブイ"
        },
        {generation: 8, nameFr: 'Pokémon Épée', nameEn: 'Pokémon Sword', nameJp: 'ポケットモンスター ソード'},
        {generation: 8, nameFr: 'Pokémon Bouclier', nameEn: 'Pokémon Shield', nameJp: 'ポケットモンスター シールド'},
        {
            generation: 8,
            nameFr:     'Pokémon Épée Isolarmure',
            nameEn:     'Pokémon Sword The Isle of Armor ',
            nameJp:     'ポケットモンスター ソード よろいのことう'
        },
        {
            generation: 8,
            nameFr:     'Pokémon Bouclier Isolarmure',
            nameEn:     'Pokémon Shield The Isle of Armor ',
            nameJp:     'ポケットモンスター シールド よろいのことう'
        },
        {
            generation: 8,
            nameFr:     'Pokémon Épée Couronneige',
            nameEn:     'Pokémon Sword The Crown Tundra',
            nameJp:     'ポケットモンスター ソード かんむりのせつげん'
        },
        {
            generation: 8,
            nameFr:     'Pokémon Bouclier Couronneige',
            nameEn:     'Pokémon Shield The Crown Tundra',
            nameJp:     'ポケットモンスター シールド かんむりのせつげん'
        },
        {
            generation: 8,
            nameFr:     'Pokémon Diamant Étincelant',
            nameEn:     'Pokémon Brilliant Diamond',
            nameJp:     'ポケットモンスター ブリリアントダイヤモンド'
        },
        {
            generation: 8,
            nameFr:     'Pokémon Perle Scintillante',
            nameEn:     'Pokémon Shining Pearl',
            nameJp:     'ポケットモンスター シャイニングパール'
        },
        {
            generation: 8,
            nameFr:     'Légendes Pokémon : Arceus',
            nameEn:     'Pokémon Legends: Arceus',
            nameJp:     'Pokémon LEGENDS アルセウス'
        },
        {
            generation: 9,
            nameFr:     'Pokémon Écarlate',
            nameEn:     'Pokémon Scarlet',
            nameJp:     'ポケットモンスター スカーレット'
        },
        {generation: 9, nameFr: 'Pokémon Violet', nameEn: 'Pokémon Violet', nameJp: 'ポケットモンスター バイオレット'},
        {
            generation: 9,
            nameFr:     'Pokémon Écarlate le trésor enfoui de la Zone Zéro',
            nameEn:     'Pokémon Scarlet The Hidden Treasure of Area Zero Part 1: The Teal Mask',
            nameJp:     'ポケットモンスター スカーレット 前編・碧みどりの仮面かめん Part 1: The Turquoise Mask'
        },
        {
            generation: 9,
            nameFr:     'Pokémon Violet le trésor enfoui de la Zone Zéro',
            nameEn:     'Pokémon Violet The Hidden Treasure of Area Zero Part 1: The Teal Mask',
            nameJp:     'ポケットモンスター バイオレット 前編・碧みどりの仮面かめん Part 1: The Turquoise Mask'
        },
        {
            generation: 9,
            nameFr:     'Pokémon Écarlate le Disque Indigo',
            nameEn:     'Pokémon Scarlet The Hidden Treasure of Area Zero Part 2: The Indigo Disk',
            nameJp:     'ポケットモンスター スカーレット 後編・藍あおの円盤えんばん Part 2: The Indigo Disk'
        },
        {
            generation: 9,
            nameFr:     'Pokémon Violet le Disque Indigo',
            nameEn:     'Pokémon Violet The Hidden Treasure of Area Zero Part 2: The Indigo Disk',
            nameJp:     'ポケットモンスター バイオレット 後編・藍あおの円盤えんばん Part 2: The Indigo Disk'
        },
        {
            generation: 9,
            nameFr:     'Légendes Pokémon : Z-A',
            nameEn:     'Pokémon Legends: Z-A',
            nameJp:     'Pokémon LEGENDS Z-A'
        },
    ];
    const langueFrId: number = await getLangueId('french');
    const langueEnId: number = await getLangueId('english');
    const langueJpId: number = await getLangueId('japanese');

    console.log('----- Insertion Jeux -----');
    for (const game of aGame)
    {
        console.log(`-- Insertion du jeu: _${game.nameFr}_ --`)
        const gameId: { id: number } = await prisma.game.create({
            data:   {generationId: game.generation},
            select: {id: true}
        });

        console.log('-- Insertion des traductions du jeu --');
        await insertTranslate({
            langueId:       langueFrId,
            referenceTable: reference_table.GAME,
            referenceId:    gameId.id,
            name:           game.nameFr
        });

        await insertTranslate({
            langueId:       langueEnId,
            referenceTable: reference_table.GAME,
            referenceId:    gameId.id,
            name:           game.nameEn
        });

        await insertTranslate({
            langueId:       langueJpId,
            referenceTable: reference_table.GAME,
            referenceId:    gameId.id,
            name:           game.nameJp
        });
    }
}

async function seedCapacity(): Promise<void>
{
    const data: capacityJson[] = JSON.parse(fs.readFileSync('prisma/data/Capacity.json', 'utf-8'));
    const langueFrId: number = await getLangueId('french');
    const langueEnId: number = await getLangueId('english');
    const langueJpId: number = await getLangueId('japanese');

    console.log('----- Insertion Capacités -----')
    for (const capacityData of data)
    {
        console.log(`-- Insertion capacitée: _${capacityData.nameFr}_ --`);

        const capacityIdRetrieve: { referenceId: bigint } | null = await prisma.translation.findFirst({
            where:     {
                referenceTable: reference_table.CAPACITY,
                langueId:       langueFrId,
                name:           capacityData.nameFr
            }, select: {referenceId: true}
        })

        if (!capacityIdRetrieve)
        {
            const capacityId: { id: number } | null = await prisma.capacity.create({data: {}, select: {id: true}});

            if (!capacityId)
            {
                console.log("Problème de l'insertion");
                process.exit(1);
            }

            console.log('-- Insertion traduction nom de la capacité --')
            await insertTranslate({
                langueId:       langueFrId,
                referenceTable: reference_table.CAPACITY,
                referenceId:    capacityId.id,
                name:           capacityData.nameFr
            });
            await insertTranslate({
                langueId:       langueEnId,
                referenceTable: reference_table.CAPACITY,
                referenceId:    capacityId.id,
                name:           capacityData.nameEn
            });
            await insertTranslate({
                langueId:       langueJpId,
                referenceTable: reference_table.CAPACITY,
                referenceId:    capacityId.id,
                name:           capacityData.nameJp
            });
        }
    }
}

async function seedCapacityInfo(): Promise<void>
{
    await resetBDD('capacity_info');
    await resetBDD('capacity_effect');
    await resetBDD('capsule_game_capacity_info');
    await resetBDD('capacity_info_influence');

    const data: capacityJson[] = JSON.parse(fs.readFileSync('prisma/data/Capacity.json', 'utf-8'));

    const langueFrId: number = await getLangueId('french');
    const capacityEffectNullId: { id: number } = await prisma.capacity_effect.create({
        data:   {zEffect: false},
        select: {id: true}
    });
    await insertTranslate({
        langueId:       langueFrId,
        referenceTable: reference_table.CAPACITY_EFFECT,
        referenceId:    capacityEffectNullId.id,
        name:           "Cette attaque ne possède pas d'effet supplémentaire."
    });
    const capacityEffectZNullId: { id: number } = await prisma.capacity_effect.create({
        data:   {zEffect: true},
        select: {id: true}
    });
    await insertTranslate({
        langueId:       langueFrId,
        referenceTable: reference_table.CAPACITY_EFFECT,
        referenceId:    capacityEffectZNullId.id,
        name:           "Cette attaque ne possède pas d'effet supplémentaire en attaque Z."
    });
    const effectWithoutFightNullId: bigint = await findIdByName("Aucun effet en dehors des combats.", reference_table.EFFECT_OUTSIDE_FIGHT, langueFrId)
    const influenceNullId: bigint = await findIdByName("Il n'y a aucune influence.", reference_table.INFLUENCE, langueFrId)

    console.log('----- Insertion Capacités -----')
    for (const capacityData of data)
    {
        console.log(`-- Insertion capacitée: _${capacityData.nameFr}_ --`);
        let effectWithoutFightId: number;
        const capacityId: bigint = await findIdByName(capacityData.nameFr, reference_table.CAPACITY, langueFrId)

        console.log('-- Insertion du jeu des infos de la capacité --');
        const categoryCapacityId: bigint = await findIdByName(capacityData.category, reference_table.CATEGORY_CAPACITY, langueFrId)

        let capacityEffectId: number, capacityeffectZId: number;
        if (!capacityData.subEffectZ)
        {
            capacityeffectZId = capacityEffectZNullId.id;
        } else
        {
            capacityeffectZId = (await prisma.capacity_effect.create({
                data:   {zEffect: true},
                select: {id: true}
            })).id;
            await insertTranslate({
                langueId:       langueFrId,
                referenceTable: reference_table.CAPACITY_EFFECT,
                referenceId:    capacityeffectZId,
                name:           capacityData.subEffectZ
            });
        }
        if (!capacityData.particularite)
        {
            capacityEffectId = capacityEffectNullId.id;
        } else
        {
            capacityEffectId = (await prisma.capacity_effect.create({
                data:   {zEffect: false},
                select: {id: true}
            })).id;
            await insertTranslate({
                langueId:       langueFrId,
                referenceTable: reference_table.CAPACITY_EFFECT,
                referenceId:    capacityEffectId,
                name:           capacityData.particularite
            });
        }

        const targetId: bigint = await findIdByName(capacityData.ciblage, reference_table.TARGET, langueFrId);
        const typeId: number = await getTypeIdByName(capacityData.type)

        if (capacityData.effectWithoutFight)
        {
            effectWithoutFightId = Number(await findIdByName(capacityData.effectWithoutFight, reference_table.EFFECT_OUTSIDE_FIGHT, langueFrId))
        } else
        {
            effectWithoutFightId = Number(effectWithoutFightNullId)
        }


        let precision: number;
        if (capacityData.precision == 'variable')
        {
            precision = -1
        } else if (!capacityData.precision)
        {
            precision = 0
        } else if (Number.isInteger(Number(capacityData.precision)))
        {
            precision = Number(capacityData.precision)
        } else
        {
            console.log(`La précision est de _${capacityData.precision}_`)
            process.exit(1);
        }


        let power: number;
        if (capacityData.power == 'variable')
        {
            power = -1
        } else if (!capacityData.power)
        {
            power = 0
        } else if (Number.isInteger(Number(capacityData.power)))
        {
            power = Number(capacityData.power)
        } else
        {
            console.log(`La précision est de _${capacityData.power}_`)
            process.exit(1);
        }


        let dynamaxPower: number;
        if (capacityData.dynamaxPower == 'variable')
        {
            dynamaxPower = -1
        } else if (!capacityData.dynamaxPower)
        {
            dynamaxPower = 0
        } else if (Number.isInteger(Number(capacityData.dynamaxPower)))
        {
            dynamaxPower = Number(capacityData.dynamaxPower)
        } else
        {
            console.log(`La précision est de _${capacityData.dynamaxPower}_`)
            process.exit(1);
        }

        const capacityInfoId = await prisma.capacity_info.create({
            data:   {
                power:                power,
                dynamaxPower:         dynamaxPower,
                precision:            precision,
                pp:                   Number(capacityData.PP),
                hasBacklash:          capacityData.contrecoup !== null,
                targetId:             Number(targetId),
                capacityEffectId:     capacityEffectId,
                capacityId:           Number(capacityId),
                capacityEffectZId:    capacityeffectZId,
                typeId:               typeId,
                effectOutsideFightId: effectWithoutFightId,
                capacityCategoryId:   Number(categoryCapacityId),
            },
            select: {id: true}
        });

        const gameIdToValueMap = capacityData.groupeGame.map(obj =>
        {
            const gameId = Number(Object.keys(obj)[0]); // Convertir la clé en nombre
            const value = Object.values(obj)[0];
            return {gameId, value};
        });
        const groupGameIds = await Promise.all(
            gameIdToValueMap.map(async ({gameId, value}) =>
            {
                const game = await prisma.game.findUnique({
                    where:   {id: gameId},
                    include: {gameGroupGames: true},
                });

                return game?.gameGroupGames
                    .map(ggg => ({
                        groupGameId: ggg.groupGameId,
                        value,
                    })) || [];
            })
        );
        const groupGameToValueMap = new Map<number, string>();
        groupGameIds.flat().forEach(({groupGameId, value}) =>
        {
            groupGameToValueMap.set(groupGameId, value);
        });
        const resultGroupGame = [...groupGameToValueMap.entries()].map(([groupGameId, value]) => ({
            [groupGameId]: value,
        }));

        const idSet = new Set(resultGroupGame.flatMap(Object.keys));

        if (idSet.has('9') && idSet.has('10') && idSet.has('11') && idSet.has('12'))
        {
            for (let i = resultGroupGame.length - 1; i >= 0; i--)
            {
                const key = Object.keys(resultGroupGame[i])[0];
                if (['10', '11', '12'].includes(key))
                {
                    resultGroupGame.splice(i, 1);
                }
            }
        }

        if (idSet.has('17') && idSet.has('18') && idSet.has('19') && idSet.has('20'))
        {
            for (let i = resultGroupGame.length - 1; i >= 0; i--)
            {
                const key = Object.keys(resultGroupGame[i])[0];
                if (['18', '19', '20'].includes(key))
                {
                    resultGroupGame.splice(i, 1);
                }
            }
        }

        if (idSet.has('23') && idSet.has('24') && idSet.has('25') && idSet.has('26'))
        {
            for (let i = resultGroupGame.length - 1; i >= 0; i--)
            {
                const key = Object.keys(resultGroupGame[i])[0];
                if (['24', '25', '26'].includes(key))
                {
                    resultGroupGame.splice(i, 1);
                }
            }
        }

        for (const groupGame of resultGroupGame)
        {
            const capsuleId: bigint = await findIdByName(
                !Object.values(groupGame)[0] ? "Il n'y a pas de capsule" : Object.values(groupGame)[0],
                reference_table.CAPSULE,
                langueFrId
            )

            await prisma.capsule_game_capacity_info.create({
                data: {
                    capsuleId:      Number(capsuleId),
                    capacityInfoId: capacityInfoId.id,
                    groupeGameId:   Number(Object.keys(groupGame)[0])
                }
            })
        }

        if (capacityData.influence)
        {
            for (const influence of capacityData.influence.split('\n'))
            {
                const influenceId: bigint = await findIdByName(influence, reference_table.INFLUENCE, langueFrId)

                await prisma.capacity_info_influence.create({
                    data: {
                        capacityInfoId: capacityInfoId.id,
                        influenceId:    Number(influenceId)
                    }
                });
            }
        } else
        {
            await prisma.capacity_info_influence.create({
                data: {
                    capacityInfoId: capacityInfoId.id,
                    influenceId:    Number(influenceNullId)
                }
            });
        }
    }
}

async function seedCapsule(): Promise<void>
{
    await resetBDD('capsule');

    console.log('----- Insertion Capsules -----')
    const aCapacity: capacityJson[] = JSON.parse(fs.readFileSync('prisma/data/Capacity.json', 'utf-8'));
    const langueFrId: number = await getLangueId('french');
    const aCapsuleName = new Set<string>(
        aCapacity.flatMap(item =>
            item.groupeGame
                .map((entry: Record<string, string>) => Object.values(entry)[0])
                .filter(value => value !== null)
        )
    );

    const capsuleId: { id: number } = await prisma.capsule.create({select: {id: true}});

    await insertTranslate({
        langueId: langueFrId, referenceId: capsuleId.id, referenceTable: reference_table.CAPSULE,
        name:     "Il n'y a pas de capsule"
    });

    for (const capsuleName of aCapsuleName)
    {
        console.log(`-- Insertion de la capsule: _${capsuleName}_ --`)
        const capsuleId: { id: number } = await prisma.capsule.create({select: {id: true}});

        await insertTranslate({
            langueId: langueFrId, referenceId: capsuleId.id, referenceTable: reference_table.CAPSULE,
            name:     capsuleName
        });
    }
}

async function seedCapacityCategory(): Promise<void>
{
    await resetBDD('capacity_category');

    const aName: string[] = ['Capacité physique', 'Capacité de statut', 'Capacité spéciale', 'Variable'];
    const langueFrId: number = await getLangueId('french');

    console.log('----- Insertion Categories des capacités -----');

    for (const name of aName)
    {
        console.log(`-- Insertion Categories de capacité: _${name}_`);

        const capacityCategoryId: { id: number } = await prisma.capacity_category.create({select: {id: true}});
        await insertTranslate({
            name:           name,
            referenceId:    capacityCategoryId.id,
            langueId:       langueFrId,
            referenceTable: reference_table.CATEGORY_CAPACITY,
        });
    }
}

async function seedAbility(): Promise<void>
{
    await seedGeneration();
    await seedLangue();

    await resetBDD('ability');
    await resetBDD('ability_info');

    console.log('----- Insertion Talents -----')

    const data = JSON.parse(fs.readFileSync('prisma/data/Ability.json', 'utf-8'));
    const langueFrId: number = await getLangueId('french');
    const langueEnId: number = await getLangueId('english');
    const langueJpId: number = await getLangueId('japanese');

    const effectWithoutFightNullId: bigint = await findIdByName("Aucun effet en dehors des combats.", reference_table.EFFECT_OUTSIDE_FIGHT, langueFrId)

    console.log('----- Insertion Talents -----');
    for (const abilityData of data)
    {
        console.log(`-- Insertion du talent: _${abilityData.nameFr}_ --`);

        const genAppear = getGenIdByName(abilityData.genApparition);

        // Créer l'ability
        console.log('-- Insertion du talent --')
        const ability: { id: number } = await prisma.ability.create({
            data:   {appearanceGenerationId: genAppear},
            select: {id: true}
        });

        // Ajout de la trad suivant l'abilityInfo
        let effectWithoutFightId: number;
        if (abilityData.effectWithoutFight === null)
        {
            effectWithoutFightId = Number(effectWithoutFightNullId);
        } else
        {
            effectWithoutFightId = Number(await findIdByName(abilityData.effectWithoutFight, reference_table.EFFECT_OUTSIDE_FIGHT, langueFrId));
        }

        // Création de l'abilityInfo
        console.log("-- Insertion de l'info du talent --");
        const abilityInfoId: { id: number } = await prisma.ability_info.create({
            data:   {
                abilityId:            ability.id,
                generationId:         genAppear,
                effectOutsideFightId: effectWithoutFightId
            },
            select: {id: true}
        });

        // Ajout des traductions du ability_info
        console.log('-- Insertion des traductions des infos du talent --');
        await insertTranslate({
            langueId:       langueFrId,
            referenceTable: reference_table.ABILITY,
            referenceId:    abilityInfoId.id,
            name:           abilityData.nameFr
        });

        await insertTranslate({
            langueId:       langueEnId,
            referenceTable: reference_table.ABILITY,
            referenceId:    abilityInfoId.id,
            name:           abilityData.nameEn
        });

        await insertTranslate({
            langueId:       langueJpId,
            referenceTable: reference_table.ABILITY,
            referenceId:    abilityInfoId.id,
            name:           abilityData.nameJp
        });
    }
}

async function seedTarget(): Promise<void>
{
    await resetBDD('target')

    const data: capacityJson[] = JSON.parse(fs.readFileSync('prisma/data/Capacity.json', 'utf-8'));
    const langueFrId: number = await getLangueId('french');
    const arrayUnique: string[] = [];
    const isMultiple: string[] = ['Tous sauf le lanceur', 'Tous les alliés', 'Tous', 'Tous les adversaires'];

    for (const capacityData of data)
    {
        arrayUnique.push(capacityData.ciblage)
    }

    console.log('----- Insertion Target -----')
    for (const target of Array.from(new Set(arrayUnique)))
    {
        console.log(`-- Insertion du target _${target}_ --`);
        const targetId: number = (await prisma.target.create({
            data:   {isMultiple: isMultiple.includes(target)},
            select: {id: true}
        })).id;

        await insertTranslate({
            langueId:       langueFrId,
            referenceTable: reference_table.TARGET,
            referenceId:    targetId,
            name:           target
        })
    }
}

async function seedEffectWithoutFight(): Promise<void>
{
    await resetBDD('effect_outside_fight');

    console.log('----- Insertion de effect_outside_fight -----')
    const abilityData = JSON.parse(fs.readFileSync('prisma/data/Ability.json', 'utf-8'));
    const capacityData: capacityJson[] = JSON.parse(fs.readFileSync('prisma/data/Capacity.json', 'utf-8'));
    const langueFrId: number = await getLangueId('french');

    // Création de l'élément et de sa traduction pour aucun effet en dehors du combat
    const effectWithoutFightNullId: { id: number } = await prisma.effect_outside_fight.create({
        data:   {},
        select: {id: true}
    });
    await insertTranslate({
        langueId:       langueFrId,
        referenceTable: reference_table.EFFECT_OUTSIDE_FIGHT,
        referenceId:    effectWithoutFightNullId.id,
        name:           "Aucun effet en dehors des combats."
    });

    for (const data of abilityData)
    {
        if (data.effectWithoutFight)
        {
            console.log(`-- Insertion du talent _${data.effectWithoutFight}_ --`);
            const effectWithoutFight: { id: number } = await prisma.effect_outside_fight.create({
                data:   {},
                select: {id: true}
            });
            await insertTranslate({
                langueId:       langueFrId,
                referenceTable: reference_table.EFFECT_OUTSIDE_FIGHT,
                referenceId:    effectWithoutFight.id,
                name:           data.effectWithoutFight
            });
        }
    }

    for (const data of capacityData)
    {
        if (data.effectWithoutFight)
        {
            console.log(`-- Insertion de l'attaque _${data.effectWithoutFight}_ --`);
            const effectWithoutFight: { id: number } = await prisma.effect_outside_fight.create({
                data:   {},
                select: {id: true}
            });
            await insertTranslate({
                langueId:       langueFrId,
                referenceTable: reference_table.EFFECT_OUTSIDE_FIGHT,
                referenceId:    effectWithoutFight.id,
                name:           data.effectWithoutFight
            });
        }
    }
}

async function seedInfluence(): Promise<void>
{
    const data: capacityJson[] = JSON.parse(fs.readFileSync('prisma/data/Capacity.json', 'utf-8'));
    const langueFrId: number = await getLangueId('french');

    const arrayUnique = [];

    console.log('----- Insertion des Influences -----')
    for (const capacityData of data)
    {
        console.log(`-- Insertion de l'influence de la capacitée: _${capacityData.nameFr}_ --`);
        if (capacityData.influence)
        {
            arrayUnique.push(...capacityData.influence.split('\n'));
        }
    }

    const influenceId: number = (await prisma.influence.create({data: {}, select: {id: true}})).id;
    await insertTranslate({
        name:           "Il n'y a aucune influence.",
        referenceId:    influenceId,
        referenceTable: reference_table.INFLUENCE,
        langueId:       langueFrId
    });

    for (const influence of Array.from(new Set(arrayUnique)))
    {
        const influenceId: number = (await prisma.influence.create({data: {}, select: {id: true}})).id;
        await insertTranslate({
            name:           influence,
            referenceId:    influenceId,
            referenceTable: reference_table.INFLUENCE,
            langueId:       langueFrId
        });
    }
}

async function seedGroupGame(): Promise<void>
{
    await resetBDD('group_game');
    await resetBDD('game_group_game');

    const data = JSON.parse(fs.readFileSync('prisma/data/groupeGame.json', 'utf-8'));
    const langueFrId: number = await getLangueId('french');
    const landAllId: number = Number(await findIdByName("Tous", reference_table.LAND, langueFrId))

    console.log('----- Insertion des groupes de jeux-----')
    for (const key of Object.keys(data))
    {
        console.log(`-- Insertion du groupe de jeu _${key}_ --`)
        const groupeGameId: number = (await prisma.group_game.create({data: {}, select: {id: true}})).id

        await insertTranslate({
            langueId:       langueFrId,
            referenceTable: reference_table.GROUP_GAME,
            referenceId:    groupeGameId,
            name:           key
        });

        let landId: number = landAllId;
        let land: string | null;

        switch (key)
        {
            case "XY - MONT":
                land = "Monts";
                break;

            case "XY - COTS":
                land = "Côtes";
                break;

            case "XY - CENT":
                land = "Centre";
                break;

            case "EB - GALAR":
                land = "Galar";
                break;

            case "EB - ISO":
                land = "Isolarmure";
                break;

            case "EB - COURO":
                land = "Couronneige";
                break;

            case "EV - PALDEA":
                land = "Paldea";
                break;

            case "EV - SEPT":
                land = "Septentria";
                break;

            case "EV - MYRT":
                land = "Myrtille";
                break;

            default:
                land = null;
                break;
        }

        if (land)
        {
            landId = Number(await findIdByName(land, reference_table.LAND, langueFrId));
        }

        for (const gameId of data[key])
        {
            await prisma.game_group_game.create({
                data: {gameId: gameId, groupGameId: groupeGameId, landId: landId},
            });
        }
    }
}

async function seedLand(): Promise<void>
{
    await resetBDD('land');

    const langueFrId: number = await getLangueId('french');

    const data: string[] = [
        'Tous', 'Monts', 'Isolarmure', 'Septentria', 'Myrtille', 'Centre', 'Couronneige', 'Côtes', "Galar", 'Paldea'
    ];

    console.log('----- Insertion des lieux -----')
    for (const land of data)
    {
        console.log(`-- Insertion du lieu _${land}_ --`)
        const landId: number = (await prisma.land.create({data: {}, select: {id: true}})).id

        await insertTranslate({
            langueId:       langueFrId,
            referenceTable: reference_table.LAND,
            referenceId:    landId,
            name:           land
        });
    }
}

async function seedGender(): Promise<void>
{
    await resetBDD('gender');

    const langueFrId: number = await getLangueId('french');
    const aData: pokemonGrouped[] = JSON.parse(fs.readFileSync('prisma/data/pokemonGrouped.json', 'utf-8'));
    const aDataForm: pokemonGrouped[] = JSON.parse(fs.readFileSync('prisma/data/pokemonFormeGrouped.json', 'utf-8'));
    const uniqueArray: string[] = [];

    console.log('----- Insertion des Genres -----')
    for (const pokemon of [...aData, ...aDataForm])
    {
        if (Array.isArray(pokemon.gender))
        {
            uniqueArray.push(...pokemon.gender);
        } else
        {
            console.log(`Le pokémon ${pokemon.infosLangue[0].nom} n'est pas avec un array gender`);
            process.exit(1)
        }
    }

    for (const gender of [...new Set(uniqueArray)])
    {
        console.log(`-- Insertion du genre _${gender}_ --`)

        const genderId: number = (await prisma.gender.create({data: {}, select: {id: true}})).id
        await insertTranslate({
            langueId:       langueFrId,
            referenceTable: reference_table.GENDER,
            referenceId:    genderId,
            name:           gender
        });
    }
}

async function seedForm(): Promise<void>
{
    await resetBDD('form');

    const langueFrId: number = await getLangueId('french');

    const aData: pokemonGrouped[] = JSON.parse(fs.readFileSync('prisma/data/pokemonGrouped.json', 'utf-8'));
    const aDataForm: pokemonGrouped[] = JSON.parse(fs.readFileSync('prisma/data/pokemonFormeGrouped.json', 'utf-8'));
    const uniqueArray: string[] = [];

    for (const pokemon of [...aData, ...aDataForm])
    {
        if (Array.isArray(pokemon.form))
        {
            uniqueArray.push(...pokemon.form);
        } else
        {
            console.log(`Le pokémon ${pokemon.infosLangue[0].nom} n'est pas avec un array form`);
            process.exit(1)
        }
    }

    console.log('----- Insertion des Formes -----')
    for (const form of [...new Set(uniqueArray)])
    {
        console.log(`-- Insertion de la forme _${form}_ --`)
        const formId: number = (await prisma.form.create({data: {}, select: {id: true}})).id

        await insertTranslate({
            langueId:       langueFrId,
            referenceTable: reference_table.FORM,
            referenceId:    formId,
            name:           form
        });
    }
}

async function seedEggGroup(): Promise<void>
{
    await resetBDD('egg_group');

    const langueFrId: number = await getLangueId('french');

    const aData: pokemonGrouped[] = JSON.parse(fs.readFileSync('prisma/data/pokemonGrouped.json', 'utf-8'));
    const aDataForm: pokemonGrouped[] = JSON.parse(fs.readFileSync('prisma/data/pokemonFormeGrouped.json', 'utf-8'));
    const uniqueArray: string[] = [];

    for (const pokemon of [...aData, ...aDataForm])
    {
        for (const pokemonInfo of pokemon.infos)
        {
            uniqueArray.push(pokemonInfo.groupeOeuf.groupeOeuf1);
            uniqueArray.push(pokemonInfo.groupeOeuf.groupeOeuf2);
        }
    }

    console.log("----- Insertion des groupes d'oeufs -----")
    for (const eggGroup of [...new Set(uniqueArray)])
    {
        if (eggGroup !== "")
        {
            console.log(`-- Insertion de la forme _${eggGroup}_ --`)
            const eggGroupId: number = (await prisma.egg_group.create({data: {}, select: {id: true}})).id

            await insertTranslate({
                langueId:       langueFrId,
                referenceTable: reference_table.EGG_GROUP,
                referenceId:    eggGroupId,
                name:           eggGroup
            });
        }
    }
}

async function seedSkillObtationType(): Promise<void>
{
    await resetBDD('skill_obtation_type');

    const langueFrId: number = await getLangueId('french');

    const aData: Capacities = JSON.parse(fs.readFileSync('prisma/data/Capacities.json', 'utf-8'));
    const uniqueArray: string[] = [];

    for (const pokemon of Object.keys(aData))
    {
        for (const capacityObtation of aData[pokemon])
        {
            uniqueArray.push(capacityObtation.type);
        }
    }

    console.log("----- Insertion des types d'obtention de capacitées -----")
    for (const skillObtationType of [...new Set(uniqueArray)])
    {
        console.log(`-- Insertion du type d'obtention _${skillObtationType}_ --`)
        const skillObtationTypeId: number = (await prisma.skill_obtation_type.create({data: {}, select: {id: true}})).id

        await insertTranslate({
            langueId:       langueFrId,
            referenceTable: reference_table.SKILL_OBTENTION_TYPE,
            referenceId:    skillObtationTypeId,
            name:           skillObtationType
        });
    }
}

async function seedPokemonCategory(): Promise<void>
{
    await resetBDD('pokemon_category');

    const langueFrId: number = await getLangueId('french');

    const aData: pokemonGrouped[] = JSON.parse(fs.readFileSync('prisma/data/pokemonGrouped.json', 'utf-8'));
    const aDataForm: pokemonGrouped[] = JSON.parse(fs.readFileSync('prisma/data/pokemonFormeGrouped.json', 'utf-8'));
    const uniqueArray: string[] = [];

    for (const pokemon of [...aData, ...aDataForm])
    {
        uniqueArray.push(pokemon.categorie);
    }

    console.log('----- Insertion des Catégories de pokémon -----')
    for (const category of [...new Set(uniqueArray)])
    {
        console.log(`-- Insertion de la catégorie de pokémon _${category}_ --`)
        const categoryId: number = (await prisma.pokemon_category.create({data: {}, select: {id: true}})).id

        await insertTranslate({
            langueId:       langueFrId,
            referenceTable: reference_table.POKEMON_CATEGORY,
            referenceId:    categoryId,
            name:           category
        });
    }
}

async function seedStatistique(): Promise<void>
{
    await resetBDD('statistic');

    const aData: pokemonGrouped[] = JSON.parse(fs.readFileSync('prisma/data/pokemonGrouped.json', 'utf-8'));
    const aDataForm: pokemonGrouped[] = JSON.parse(fs.readFileSync('prisma/data/pokemonFormeGrouped.json', 'utf-8'));
    const uniqueArray = [];

    for (const pokemon of [...aData, ...aDataForm])
    {
        for (const pokemonStats of pokemon.statistiqueGroupeJeu)
        {
            uniqueArray.push(pokemonStats.statistique);
        }
    }

    const uniquestatistic = uniqueArray.filter((obj, index, self) =>
        index === self.findIndex((o) => JSON.stringify(o) === JSON.stringify(obj))
    );

    console.log('----- Insertion des statistiques -----')
    for (const statistic of uniquestatistic)
    {
        console.log(`-- Insertion de la statistique ${statistic} --`)

        await prisma.statistic.create({
            data: {
                pv:             statistic.pv,
                attack:         statistic.attaque,
                defense:        statistic.defense,
                specialAttack:  statistic.attaqueSpe,
                specialDefense: statistic.defenseSpe,
                speed:          statistic.vitesse,
                special:        statistic.special,
            }
        })
    }
}

async function seedPokemon(): Promise<void>
{
    await resetBDD('pokemon');
    await resetBDD('pokemon_form');
    await resetBDD('national_number');
    await resetBDD('statistic_group_game');
    await resetBDD('pokemon_info');
    await resetBDD('type_order');
    await resetBDD('ability_order');
    await resetBDD('egg_group_order');
    await resetBDD('pokemon_form_gender');

    const aData: pokemonGrouped[] = JSON.parse(fs.readFileSync('prisma/data/pokemonGrouped.json', 'utf-8'));
    const aDataForm: pokemonGrouped[] = JSON.parse(fs.readFileSync('prisma/data/pokemonFormeGrouped.json', 'utf-8'));
    const langFrId: number = await getLangueId('french');

    console.log('----- Insertion des Pokémons -----')
    for (const pokemon of [...aData, ...aDataForm])
    {
        console.log(`-- Insertion du Pokémon _${pokemon.infosLangue[0].nom}_ --`)

        // Récupération du pokémon catégory id
        const pokemonCategoryId: bigint = await findIdByName(pokemon.categorie, reference_table.POKEMON_CATEGORY, langFrId)

        // Récupération de la génération d'apparition du pokémon
        const generationId: { id: number } | null = await prisma.generation.findUnique({
            where:  {id: pokemon.genApparition},
            select: {id: true}
        })

        if (!generationId)
        {
            console.log(`La génération _${pokemon.genApparition}_ n'a pas été trouvée.`)
            process.exit(1)
        }

        // Ajout de tous les pokemon de base
        const pokemonId: number = (await prisma.pokemon.create({
            data:   {
                internationalNumber: pokemon.numeroInternational,
                hatchingCycle:       pokemon.cycleEclosion,
                globalXp:            pokemon.xpGlobalLvl100,
                captureRate:         pokemon.tauxCapture,
                callHelpRate:        pokemon.tauxAppelleAide,
                size:                pokemon.taille,
                weight:              pokemon.poids,
                maleRate:            pokemon.chanceMale,
                femelleRate:         pokemon.chanceFemelle,
                pokemonCategoryId:   Number(pokemonCategoryId),
                generationId:        generationId.id
            },
            select: {id: true}
        })).id;

        // Insertion de toutes les traductions d'un pokémon
        for (const pokemonName of pokemon.infosLangue)
        {
            let langId: number = langFrId
            if (pokemonName.langue !== "french")
            {
                langId = await getLangueId(pokemonName.langue)
            }

            await insertTranslate({
                langueId:       langId,
                referenceTable: reference_table.POKEMON,
                referenceId:    pokemonId,
                name:           pokemonName.nom
            });
        }

        // Ajout de chaques pokemon_form

        for (const pokemonForm of pokemon.form)
        {
            const pokemonFormId: bigint = await findIdByName(pokemonForm, reference_table.FORM, langFrId)
            await prisma.pokemon_form.create({
                data:   {
                    pokemonId: pokemonId,
                    formId:    Number(pokemonFormId),
                },
                select: {id: true}
            });

            // pokeFormId: number = (await prisma.pokemon_form.create({
            //     data:   {
            //         pokemonId: pokemonId,
            //         formId:    Number(pokemonFormId),
            //     },
            //     select: {id: true}
            // })).id;
            //
            // for (const pokemonGender of pokemon.gender)
            // {
            //     const pokemonGenderId: bigint = await findIdByName(pokemonGender, reference_table.GENDER, langFrId)
            //
            //     await prisma.pokemon_form_gender.create({
            //         data: {
            //             pokemonFormId: pokeFormId,
            //             genderId:      Number(pokemonGenderId)
            //         }
            //     })
            // }
        }

        // Ajout des numéros nationnaux
        for (const nationnalNumber of pokemon.nationnalNumber)
        {
            const groupGameId: bigint = await findIdByName(
                nationnalNumber.land === '' ? nationnalNumber.game : nationnalNumber.game + ' - ' + nationnalNumber.land,
                reference_table.GROUP_GAME,
                langFrId
            )

            await prisma.national_number.upsert({
                where:  {
                    pokemonId_groupGameId: {
                        pokemonId:   pokemonId,
                        groupGameId: Number(groupGameId)
                    }
                },
                update: {
                    number: nationnalNumber.number
                },
                create: {
                    pokemonId:   pokemonId,
                    groupGameId: Number(groupGameId),
                    number:      nationnalNumber.number
                }
            })
        }

        // Liaison des statistiques aux groupes de jeux
        for (const statistiqueGroup of pokemon.statistiqueGroupeJeu)
        {
            const statisticId: { id: number } | null = await prisma.statistic.findFirst({
                where:  {
                    pv:             statistiqueGroup.statistique.pv,
                    attack:         statistiqueGroup.statistique.attaque,
                    defense:        statistiqueGroup.statistique.defense,
                    specialAttack:  statistiqueGroup.statistique.attaqueSpe,
                    specialDefense: statistiqueGroup.statistique.defenseSpe,
                    speed:          statistiqueGroup.statistique.vitesse,
                    special:        statistiqueGroup.statistique.special
                },
                select: {id: true}
            })

            if (!statisticId)
            {
                console.log(`L'id de la statistique n'a pas été trouvé`)
                process.exit(1)
            }

            for (const groupGame of statistiqueGroup.listeNomJeu)
            {
                const groupGameId: number = Number(await findIdByName(groupGame, reference_table.GROUP_GAME, langFrId));

                const minGeneration: number = (await prisma.game_group_game.findMany({
                    where:   {groupGameId: groupGameId},
                    select:  {
                        game: {
                            select: {
                                generation: {
                                    select: {id: true}
                                }
                            }
                        }
                    },
                    orderBy: {
                        game: {
                            generation: {
                                id: 'asc'
                            }
                        }
                    },
                    take:    1
                }))[0].game.generation.id;

                if (minGeneration >= pokemon.genApparition)
                {
                    await prisma.statistic_group_game.create({
                        data: {
                            pokemonId:   pokemonId,
                            statisticId: statisticId.id,
                            groupGameId: groupGameId
                        }
                    })
                }
            }
        }

        // Création des infos du pokémon
        for (const pokemonInfo of pokemon.infos)
        {
            const generationId: { id: number } | null = await prisma.generation.findUnique({
                where:  {
                    id: pokemonInfo.numGen
                },
                select: {id: true}
            })

            if (!generationId)
            {
                console.log(`La génération _${pokemonInfo.numGen}_ n'a pas été trouvée`)
                process.exit(1)
            }

            // Création du pokemon info
            const pokemonInfoId: number = (await prisma.pokemon_info.create({
                data:   {
                    xpGift:       pokemonInfo.xpDonnerMort,
                    generationId: generationId.id,
                    pokemonId:    pokemonId
                },
                select: {id: true}
            })).id

            // Insertion du premier type
            const type1Id: number = Number(await findIdByName(pokemonInfo.type.type1, reference_table.TYPE, langFrId));
            await prisma.type_order.create({
                data: {
                    pokemonInfoId: pokemonInfoId,
                    typeId:        type1Id,
                    order:         1
                }
            })

            // Insertion du second type, s'il existe
            if (pokemonInfo.type.type2 !== "" && pokemonInfo.type.type2 !== undefined)
            {
                const type2Id: number = Number(await findIdByName(pokemonInfo.type.type2, reference_table.TYPE, langFrId));

                await prisma.type_order.create({
                    data: {
                        pokemonInfoId: pokemonInfoId,
                        typeId:        type2Id,
                        order:         2
                    }
                })
            }

            // Ajout des talents
            for (const ability of pokemonInfo.talent)
            {
                if (ability.nom !== "")
                {
                    await prisma.ability_order.create({
                        data: {
                            pokemonInfoId: pokemonInfoId,
                            abilityId:     Number(await findIdByName(ability.nom, reference_table.ABILITY, langFrId)),
                            order:         ability.order,
                            isHidden:      ability.cache
                        }
                    })
                }
            }

            // Ajout du groupe d'oeuf
            const groupEgg1Id: number = Number(await findIdByName(pokemonInfo.groupeOeuf.groupeOeuf1, reference_table.EGG_GROUP, langFrId));
            await prisma.egg_group_order.create({
                data: {
                    pokemonInfoId: pokemonInfoId,
                    eggGroupId:    groupEgg1Id,
                    order:         1
                }
            })

            if (pokemonInfo.groupeOeuf.groupeOeuf2 !== '')
            {
                const groupEgg2Id: number = Number(await findIdByName(pokemonInfo.groupeOeuf.groupeOeuf2, reference_table.EGG_GROUP, langFrId));
                await prisma.egg_group_order.create({
                    data: {
                        pokemonInfoId: pokemonInfoId,
                        eggGroupId:    groupEgg2Id,
                        order:         2
                    }
                })
            }
        }
    }
}

async function seedCapacities(): Promise<void>
{
    await resetBDD('skill_obtation')

    const aData: Capacities = JSON.parse(fs.readFileSync('prisma/data/Capacities.json', 'utf-8'));
    const aDataGroupGame: {
        [key: string]: number[]
    } = JSON.parse(fs.readFileSync('prisma/data/groupeGame.json', 'utf-8'));
    const langFrId: number = await getLangueId('french');

    console.log("----- Insertion de l'obtention de chaque capacitées pour un pokémon -----")

    for (const pokemon of Object.keys(aData))
    {
        console.log(`-- Liaison des attaques du pokemon ${pokemon} --`)
        const mergedMap = new Map<string, CapacityInfo>();

        aData[pokemon].forEach((cap: CapacityInfo) =>
        {
            const uniqueKey = `${cap.name}-${cap.detail}-${cap.type}`;

            if (mergedMap.has(uniqueKey))
            {
                mergedMap.get(uniqueKey)!.game.push(...cap.game);
            } else
            {
                mergedMap.set(uniqueKey, {...cap, game: [...cap.game]});
            }
        });

        const result: CapacityInfo[] = [...mergedMap.values()]

        for (const capacity of result)
        {
            if (capacity.name !== "Grâce à sa capacité Gribouille, Queulorior est capable d'apprendre toutes ces capacités, qu'il peut également transmettre par reproduction.")
            {
                console.log(`- Liaison du pokémon ${pokemon} avec l'attaque ${capacity.name} -`)

                const aGameId: number[] = []
                for (const game of capacity.game)
                {

                    let gameName: string = game
                    if (game === 'LGP')
                    {
                        gameName = "Let's Go Pikachu"
                    } else if (game === 'LGE')
                    {
                        gameName = "Let's Go Évoli"
                    } else if (game === 'LPA')
                    {
                        gameName = "Légendes Pokémon : Arceus"
                    }

                    const gameId: { referenceId: bigint } | null = await prisma.translation.findFirst({
                        where:  {
                            name:           {contains: gameName},
                            referenceTable: reference_table.GAME,
                            langueId:       langFrId
                        },
                        select: {referenceId: true}
                    })

                    if (!gameId)
                    {
                        console.log(`Le jeu _${game}_ n'a pas été trouvé`)
                        process.exit()
                    }

                    aGameId.push(Number(gameId.referenceId))
                }

                let matchingKeys = Object.keys(aDataGroupGame).filter(key =>
                    aDataGroupGame[key].every(num => aGameId.includes(num))
                );

                if (capacity.game.includes('Jaune') || capacity.game.includes('Rouge') || capacity.game.includes('Bleu') || capacity.game.includes('Vert'))
                {
                    matchingKeys = matchingKeys.filter((gameName) => gameName !== 'Jaune' && gameName !== 'Rouge' && gameName !== 'Bleu' && gameName !== 'Vert')
                    matchingKeys.push('RBVJ')
                }
                if (matchingKeys.includes('DPP') && matchingKeys.includes('PLATINE'))
                {
                    matchingKeys = matchingKeys.filter((gameName) => gameName !== 'PLATINE')
                }
                if (matchingKeys.includes('XY') && matchingKeys.includes('XY - MONT') && matchingKeys.includes('XY - COTS') && matchingKeys.includes('XY - CENT'))
                {
                    matchingKeys = matchingKeys.filter((gameName) => gameName !== 'XY - MONT' && gameName !== 'XY - COTS' && gameName !== 'XY - CENT')
                }
                if (matchingKeys.includes('EB') || matchingKeys.includes('EB - GALAR') || matchingKeys.includes('EB - COURO') || matchingKeys.includes('EB - ISO'))
                {
                    matchingKeys = matchingKeys.filter((gameName) => gameName !== 'EB' && gameName !== 'EB - GALAR' && gameName !== 'EB - COURO' && gameName !== 'EB - ISO')
                    matchingKeys.push('EB')
                }
                if (matchingKeys.includes('EV') || matchingKeys.includes('EV - PALDEA') || matchingKeys.includes('EV - SEPT') || matchingKeys.includes('EV - MYRT'))
                {
                    matchingKeys = matchingKeys.filter((gameName) => gameName !== 'EV' && gameName !== 'EV - PALDEA' && gameName !== 'EV - SEPT' && gameName !== 'EV - MYRT')
                    matchingKeys.push('EV')
                }

                const aGroupGameId: number[] = await Promise.all(
                    matchingKeys.map(async (gameName) =>
                    {
                        return Number(await findIdByName(gameName, reference_table.GROUP_GAME, langFrId));
                    })
                );

                const pokemonId: number = Number(await findIdByName(pokemon, reference_table.POKEMON, langFrId))
                const capacityId: number = Number(await findIdByName(capacity.name, reference_table.CAPACITY, langFrId))
                const skillObtationId: number = Number(await findIdByName(capacity.type, reference_table.SKILL_OBTENTION_TYPE, langFrId))

                for (const groupGameId of aGroupGameId)
                {
                    await prisma.skill_obtation.create({
                        data: {
                            capacityId:          capacityId,
                            skillObtationTypeId: skillObtationId,
                            detail:              Number.isInteger(capacity.detail) ? String(capacity.detail) : capacity.detail,
                            pokemonId:           pokemonId,
                            groupGameId:         groupGameId
                        }
                    })
                }
            }
        }
    }
}

async function seedMeteo(): Promise<void>
{
    await resetBDD("meteo")

    const uniqueArray: string[] = [];
    const langFrId: number = await getLangueId('english');

    for (const location of getAllLocation())
    {
        for (const locationListInfo of location.listInfo)
        {
            for (const locationList of locationListInfo.list)
            {
                for (const locationRate of locationList.rates)
                {
                    if (locationRate.rateName)
                    {
                        uniqueArray.push(locationRate.rateName)
                    }
                }
            }
        }
    }

    console.log('----- Insertion des météos -----')
    for (const meteo of [...new Set(uniqueArray)])
    {
        console.log(`-- Insertion de la météo ${meteo} --`)
        const meteoId: number = (await prisma.meteo.create({data: {}, select: {id: true}})).id

        await insertTranslate({
            langueId:       langFrId,
            name:           meteo,
            referenceId:    meteoId,
            referenceTable: reference_table.METEO
        })
    }
}

async function seedPokemonObtation(): Promise<void>
{
    await resetBDD("pokemon_obtation")

    const uniqueArray: string[] = ["Not available in shiny"];
    const langEnId: number = await getLangueId('english');

    for (const location of getAllLocation())
    {
        for (const locationListInfo of location.listInfo)
        {
            for (const locationList of locationListInfo.list)
            {
                for (const locationRate of locationList.rates)
                {
                    if (locationRate.shasse)
                    {
                        uniqueArray.push(...locationRate.shasse)
                    }
                }
            }
        }
    }

    console.log("----- Insertion des méthodes d'obtation -----")
    for (const shasseMethod of [...new Set(uniqueArray)])
    {
        console.log(`-- Insertion de la méthode de shasse ${shasseMethod} --`)
        const shasseMethodId: number = (await prisma.pokemon_obtation.create({data: {}, select: {id: true}})).id

        await insertTranslate({
            langueId:       langEnId,
            name:           shasseMethod,
            referenceId:    shasseMethodId,
            referenceTable: reference_table.POKEMON_OBTENTION
        })
    }
}

async function seedEvolution(): Promise<void>
{
    await resetBDD("evolution")

    const aData: evolutionJson = JSON.parse(fs.readFileSync(`prisma/data/evolution.json`, 'utf-8'));
    const langFrId: number = await getLangueId('french');

    console.log('Insertion des évolutions')
    for (const pokemonName in aData)
    {
        console.log(`Insertion de l'évolution de ${pokemonName}`)
        for (const evolution of aData[pokemonName])
        {
            const evolutionInfoId: number = Number(await findIdByName(
                evolution.informationComplementaire === '' ? "Aucune information complémentaire d'évolution." : evolution.informationComplementaire,
                reference_table.EVOLUTION_INFO,
                langFrId));
            const evolutionMethodId: number = Number(await findIdByName(evolution.nomMethode, reference_table.EVOLUTION_METHOD, langFrId));
            const pokemonStartId: number = await getPokemonFormIdByName(pokemonName, langFrId);
            const pokemonEndId: number = await getPokemonFormIdByName(evolution.nomPokemon, langFrId);

            await prisma.evolution.create({
                data: {
                    evolutionInfoId:    evolutionInfoId,
                    evolutionMethodId:  evolutionMethodId,
                    level:              evolution.niveau,
                    pokemonFormStartId: pokemonStartId,
                    pokemonFormEndId:   pokemonEndId
                }
            })
        }
    }
}

async function seedDetail(): Promise<void>
{
    await resetBDD("detail")

    const uniqueArray: string[] = ["Aucun détail", "Aucune condition"];
    const langFrId: number = await getLangueId('french');

    for (const location of getAllLocation())
    {
        for (const locationListInfo of location.listInfo)
        {
            for (const locationList of locationListInfo.list)
            {
                for (const locationRate of locationList.rates)
                {
                    if (locationRate.condition)
                    {
                        uniqueArray.push(locationRate.condition)
                    }
                    if (locationRate.detail)
                    {
                        uniqueArray.push(locationRate.detail)
                    }
                }
            }
        }
    }

    console.log("----- Insertion des détails -----")
    for (const detail of [...new Set(uniqueArray)])
    {
        console.log(`-- Insertion du détail ${detail} --`)
        const detailId: number = (await prisma.detail.create({data: {}, select: {id: true}})).id

        await insertTranslate({
            langueId:       langFrId,
            name:           String(detail),
            referenceId:    detailId,
            referenceTable: reference_table.DETAIL
        })
    }
}

async function seedZone(): Promise<void>
{
    await resetBDD("zone")

    const uniqueArray: string[] = [];
    const langFrId: number = await getLangueId('french');

    for (const location of getAllLocation())
    {
        for (const locationListInfo of location.listInfo)
        {
            if (locationListInfo.lieu)
            {
                uniqueArray.push(locationListInfo.lieu)
            }
        }
    }

    console.log("----- Insertion des zones -----")
    for (const zone of [...new Set(uniqueArray)])
    {
        console.log(`-- Insertion de la zone ${zone} --`)
        const zoneId: number = (await prisma.zone.create({data: {}, select: {id: true}})).id

        await insertTranslate({
            langueId:       langFrId,
            name:           zone,
            referenceId:    zoneId,
            referenceTable: reference_table.ZONE
        })
    }
}

async function seedLocation(): Promise<void>
{
    await resetBDD("location")

    const uniqueArray: string[] = ["Aucune localisation"];
    const langFrId: number = await getLangueId('french');

    for (const location of getAllLocation())
    {
        for (const locationListInfo of location.listInfo)
        {
            if (locationListInfo.location)
            {
                uniqueArray.push(locationListInfo.location)
            }
        }
    }

    console.log("----- Insertion des localisations -----")
    for (const location of [...new Set(uniqueArray)])
    {
        console.log(`-- Insertion de la localisation ${location} --`)
        const locationId: number = (await prisma.location.create({data: {}, select: {id: true}})).id

        await insertTranslate({
            langueId:       langFrId,
            name:           location,
            referenceId:    locationId,
            referenceTable: reference_table.LOCATION
        })
    }
}

async function seedLocationZone(): Promise<void>
{
    await resetBDD("location_zone")
    const langFrId: number = await getLangueId('french');

    console.log('----- Insertion des localisations et zones -----')
    for (const location of getAllLocation())
    {
        for (const locationListInfo of location.listInfo)
        {
            console.log(`-- Insertion de la localisation ${locationListInfo.location ? locationListInfo.location : "Aucune localisation"} pour la zone ${locationListInfo.lieu} --`)
            const locationId: number = Number(
                await findIdByName(locationListInfo.location ? locationListInfo.location : "Aucune localisation", reference_table.LOCATION, langFrId)
            )
            const zoneId: number = Number(
                await findIdByName(locationListInfo.lieu, reference_table.ZONE, langFrId)
            )

            await prisma.location_zone.upsert({
                where:  {
                    locationId_zoneId: {
                        locationId: locationId,
                        zoneId:     zoneId
                    }
                },
                update: {
                    updatedAt: new Date(),
                },
                create: {
                    locationId: locationId,
                    zoneId:     zoneId
                }
            });
        }
    }
}

async function seedPokemonRating(): Promise<void>
{
    await resetBDD("rate")
    await resetBDD("pokemon_game_location")

    const langFrId: number = await getLangueId('french');
    const langEnId: number = await getLangueId('english');

    console.log('----- Insertion du raiting de tous les pokémons -----')
    for (const location of getAllLocation())
    {
        for (const locationInfo of location.listInfo)
        {
            const locationId: number = Number(
                await findIdByName(locationInfo.location ? locationInfo.location : "Aucune localisation", reference_table.LOCATION, langFrId)
            )
            const zoneId: number = Number(
                await findIdByName(locationInfo.lieu, reference_table.ZONE, langFrId)
            )
            const locationZoneId: { id: number } | null = await prisma.location_zone.findUnique({
                where:  {
                    locationId_zoneId: {
                        locationId: locationId,
                        zoneId:     zoneId
                    }
                },
                select: {id: true}
            })

            if (!locationZoneId)
            {
                console.log(`La location zone n'a pas été trouvée pour la localisation _${locationInfo.location}_ et zone _${locationInfo.lieu}_`)
                process.exit(1)
            }

            for (const locationList of locationInfo.list)
            {
                console.log(`-- Insertion de _${locationList.pokemon}_ dans la zone _${locationInfo.lieu}_ --`)

                const pokemonFormId: number = await getPokemonFormIdByName(locationList.pokemon, langFrId);

                for (const gameName of locationList.versions)
                {
                    for (const rate of locationList.rates)
                    {
                        const meteoId: number = Number(await findIdByName(rate.rateName, reference_table.METEO, langEnId))
                        const detailId: number = Number(await findIdByName(rate.detail ? rate.detail : "Aucun détail", reference_table.DETAIL, langFrId))
                        const conditionId: number = Number(await findIdByName(rate.condition ? String(rate.condition) : "Aucune condition", reference_table.DETAIL, langFrId))

                        const rateId: number = (await prisma.rate.create({
                            data:   {
                                rate:            rate.rate,
                                minLevel:        rate.minLevel,
                                maxLevel:        rate.maxLevel,
                                limit:           rate.limit ? Number(rate.limit) : 0,
                                meteoId:         meteoId,
                                conditionRateId: conditionId,
                                detailRateId:    detailId,
                                isAlpha:         rate.alpha ?? false,
                            },
                            select: {id: true}
                        })).id

                        const gameId: { referenceId: bigint } | null = await prisma.translation.findFirst({
                            where:  {
                                name:           {contains: gameName},
                                referenceTable: reference_table.GAME,
                                langueId:       langFrId
                            },
                            select: {referenceId: true}
                        })

                        if (!gameId)
                        {
                            console.log(`Le jeu _${gameName}_ n'a pas été trouvé`)
                        }

                        const aShasse: string[] = rate.shasse ? rate.shasse : ["Not available in shiny"];

                        for (const shasse of aShasse)
                        {
                            const pokemonObtationId: number = Number(await findIdByName(shasse, reference_table.POKEMON_OBTENTION, langEnId))

                            await prisma.pokemon_game_location.create({
                                data: {
                                    gameId:            Number(gameId?.referenceId),
                                    rateId:            rateId,
                                    locationZoneId:    locationZoneId.id,
                                    pokemonObtationId: pokemonObtationId,
                                    pokemonFormId:     pokemonFormId
                                }
                            })
                        }
                    }
                }
            }
        }
    }
}

async function seedEvolutionMethod(): Promise<void>
{
    await resetBDD('evolution_method')

    const aData: evolutionJson = JSON.parse(fs.readFileSync(`prisma/data/evolution.json`, 'utf-8'));
    const uniqueArray: string[] = [];
    const langFrId: number = await getLangueId('french');

    for (const pokemonName in aData)
    {
        for (const evolution of aData[pokemonName])
        {
            uniqueArray.push(evolution.nomMethode)
        }
    }

    console.log("Insertion des méthodes d'évolution")
    for (const evolutionMethod of [...new Set(uniqueArray)])
    {
        console.log(`Insertion de la méthode d'évolution _${evolutionMethod}_`)

        const evolutionMethodId: number = (await prisma.evolution_method.create({data: {}, select: {id: true}})).id

        await insertTranslate({
            langueId:       langFrId,
            name:           evolutionMethod,
            referenceTable: reference_table.EVOLUTION_METHOD,
            referenceId:    evolutionMethodId
        })
    }
}

async function seedEvolutionInfo(): Promise<void>
{
    await resetBDD('evolution_info')

    const aData: evolutionJson = JSON.parse(fs.readFileSync(`prisma/data/evolution.json`, 'utf-8'));
    const uniqueArray: string[] = ["Aucune information complémentaire d'évolution."];
    const langFrId: number = await getLangueId('french');

    for (const pokemonName in aData)
    {
        for (const evolution of aData[pokemonName])
        {
            if (evolution.informationComplementaire !== '')
            {
                uniqueArray.push(evolution.informationComplementaire)
            }
        }
    }

    console.log("Insertion des informations d'évolution")
    for (const evolutionInfo of [...new Set(uniqueArray)])
    {
        console.log(`Insertion de l'info d'évolution _${evolutionInfo}_`)

        const evolutionInfoId: number = (await prisma.evolution_info.create({data: {}, select: {id: true}})).id

        await insertTranslate({
            langueId:       langFrId,
            name:           evolutionInfo,
            referenceTable: reference_table.EVOLUTION_INFO,
            referenceId:    evolutionInfoId
        })
    }
}

async function getLangueId(name: string): Promise<number>
{
    const langId: { id: number } | null = await prisma.langue.findFirst({
        where: {name: name}, select: {id: true}
    });

    if (!langId)
    {
        console.log("Problème avec la récupération de l'id de la langue")
        process.exit(1);
    }

    return langId.id;
}

function getGenIdByName(genName: string): number
{
    const genDictionnary: { [key: string]: number } = {
        'RS':   3,
        'DP':   4,
        'NB':   5,
        'XY':   6,
        'ROSA': 6,
        'SL':   7,
        'USUL': 7,
        'EB':   8,
        'ISA':  8,
        'TEC':  8,
        'EV':   9,
        'MT':   9,
        'DI':   9,
    };

    if (!(genName in genDictionnary))
    {
        console.error(`Nom _${genName}_ pas défini.`);
        process.exit(1);
    }

    return genDictionnary[genName];
}

async function resetBDD(tableName: string): Promise<void>
{
    console.log(`----- Nettoyage de la table ${tableName} -----`);

    try
    {
        await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 0;`);

        await prisma.$transaction([(prisma as any)[tableName].deleteMany()]);

        await prisma.$executeRawUnsafe(`ALTER TABLE \`${tableName}\` AUTO_INCREMENT = 1;`);
        await prisma.$executeRawUnsafe(`SET FOREIGN_KEY_CHECKS = 1;`);
    } catch (error)
    {
        console.error(`Erreur lors de la réinitialisation de ${tableName}:`, error);
    }
}

async function insertTranslate(data: {
    langueId: number,
    referenceTable: reference_table,
    referenceId: number,
    name: string
}): Promise<void>
{
    await prisma.translation.upsert({
        where:  {
            referenceTable_referenceId_langueId: {
                referenceTable: data.referenceTable,
                referenceId:    data.referenceId,
                langueId:       data.langueId
            }
        },
        update: {
            name: data.name,
        },
        create: data
    });
}

async function getTypeIdByName(name: string): Promise<number>
{
    return Number(await findIdByName(name, reference_table.TYPE, await getLangueId('french')));
}

async function findIdByName(name: string, referenceTable: reference_table, langId: number): Promise<bigint>
{
    const translateId: { referenceId: bigint } | null = await prisma.translation.findFirst({
        where:  {
            referenceTable: referenceTable,
            name:           name,
            langueId:       langId
        },
        select: {referenceId: true}
    })

    if (!translateId)
    {
        console.log(`Le nom de la traduction _${name}_ n'a pas été trouvée pour la référence _${referenceTable}_.`)
        process.exit(1)
    }

    return translateId.referenceId;
}

function getAllLocation(): location[]
{
    const files: string[] = [
        'Couronneige',
        'DPP',
        'DEPS',
        'ROSA',
        'RSE',
        'LGPE',
        'EB',
        'HGSS',
        'Isolarmure',
        'N2B2',
        'NB',
        'OAC',
        'RFVF',
        'SL',
        'USUL',
        'XY',
        "RBJ",
        'Paldea',
        'Septentria',
        'Teradome',
        'Hisui'
    ];

    const allLocations: location[] = [];

    for (const file of files)
    {
        const data: location = JSON.parse(fs.readFileSync(`prisma/data/location/Final_last/${file}.json`, 'utf-8'));
        allLocations.push(data);
    }

    return allLocations;
}

async function getPokemonFormIdByName(pokemonName: string, langFrId: number): Promise<number>
{
    let form: string = 'Normal';

    if (pokemonName.includes(' -forme- '))
    {
        form = pokemonName.split(' -forme- ')[1];
        pokemonName = pokemonName.split(' -forme- ')[0];
    }
    if (pokemonName.includes(' de Galar'))
    {
        form = 'Galar';
    }
    if (pokemonName.includes(" d'Alola"))
    {
        form = 'Alola';
    }
    if (pokemonName.includes(" de Paldea"))
    {
        form = 'Paldea';
    }
    if (pokemonName.includes(" de Hisui"))
    {
        form = 'Hisui';
    }

    const pokemonId: number = Number(await findIdByName(pokemonName, reference_table.POKEMON, langFrId))
    const formId: number = Number(await findIdByName(form, reference_table.FORM, langFrId))

    const pokemonFormId: { id: number } | null = await prisma.pokemon_form.findUnique({
        where:  {
            pokemonId_formId: {
                pokemonId: pokemonId,
                formId:    formId
            }
        },
        select: {id: true}
    })

    if (!pokemonFormId)
    {
        console.log(`Le pokemon _${pokemonName}_ avec la forme _${form}_ n'existe pas`)
        process.exit(1)
    }

    return pokemonFormId.id;
}

async function main(): Promise<void>
{
    const arg: string = process.argv[2];

    switch (arg)
    {
        case 'ability':
            await seedAbility();
            break

        case 'generation':
            await seedGeneration();
            break

        case 'langue':
            await seedLangue();
            break

        case 'capacity':
            await seedCapacity();
            break

        case 'game':
            await seedGame();
            break

        case 'type':
            await seedType();
            break

        case 'capacityCategory':
            await seedCapacityCategory();
            break

        case 'capsule':
            await seedCapsule();
            break;

        case 'target':
            await seedTarget();
            break;

        case 'effectWithoutFight':
            await seedEffectWithoutFight();
            break;

        case 'capacityInfo':
            await seedCapacityInfo();
            break;

        case 'influence':
            await seedInfluence();
            break;

        case 'pokemon':
            await seedPokemon();
            break;

        case 'land':
            await seedLand();
            break;

        case 'groupGame':
            await seedGroupGame();
            break;

        case 'gender':
            await seedGender();
            break;

        case 'form':
            await seedForm();
            break;

        case 'pokemonCategory':
            await seedPokemonCategory();
            break;

        case 'statistique':
            await seedStatistique();
            break;

        case 'eggGroup':
            await seedEggGroup();
            break;

        case 'capacities':
            await seedCapacities();
            break;

        case 'skillObtationType':
            await seedSkillObtationType();
            break;

        case 'meteo':
            await seedMeteo();
            break;

        case 'pokemonObtation':
            await seedPokemonObtation();
            break;

        case 'detail':
            await seedDetail();
            break;

        case 'zone':
            await seedZone();
            break;

        case 'location':
            await seedLocation();
            break;

        case 'locationZone':
            await seedLocationZone();
            break;

        case 'pokemonRating':
            await seedPokemonRating();
            break;

        case 'evolutionMethod':
            await seedEvolutionMethod();
            break;

        case 'evolutionInfo':
            await seedEvolutionInfo();
            break;

        case 'evolution':
            await seedEvolution();
            break;

        case 'all':
            try
            {
                await seedGeneration();
                await seedLangue();
                await seedInfluence();
                await seedEffectWithoutFight();
                await seedAbility();
                await seedGame();
                await seedLand();
                await seedGroupGame();
                await seedType();
                await seedCapacityCategory();
                await seedCapsule();
                await seedTarget();
                await seedCapacity();
                await seedCapacityInfo();
                await seedGender();
                await seedForm();
                await seedPokemonCategory();
                await seedStatistique();
                await seedEggGroup();
                await seedPokemon();
                await seedSkillObtationType();
                await seedMeteo();
                await seedPokemonObtation();
                await seedDetail();
                await seedCapacities();
                await seedZone();
                await seedLocation();
                await seedLocationZone();
                await seedPokemonRating();
                await seedEvolutionMethod();
                await seedEvolutionInfo();
                await seedEvolution();
            } catch (e)
            {
                console.log(e)
            }

            break

        default:
            console.error(`Seeder -${arg}- inconnu.`);
            process.exit(1);
    }
}

main()
    .catch((e) =>
    {
        console.error(e);
        process.exit(1);
    })
    .finally(async (): Promise<void> =>
    {
        await prisma.$disconnect();
    });

export interface OwnedSumarry
{
    id: number;
    internationalNumber: number;
    pokemonName: string;
    formId: number;
    formName: string;
}

export interface OwnedPokemon
{
    id: number;
    internationalNumber: number;
    pokemonName: string;
    formId: number;
    formName: string;
    spriteInShiny: boolean;
    gameId: number;
    methodName: string;
    meetingNumber: number;
    time: number;
    useCC: boolean;
}
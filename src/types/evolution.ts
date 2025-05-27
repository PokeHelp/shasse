export interface EvolutionTree {
    pokemonName: string;
    internationalNumber: number;
    formId: number;
    evos: EvolutionNode[];
}

export interface EvolutionNode {
    evolutionName: string;
    internationalNumber: number;
    formId: number;
    level: number;
    methodName: string;
    infoName: string;
    infoId: number;
    evos: EvolutionNode[];
}
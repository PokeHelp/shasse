export interface EvolutionTree {
    pokemonName: string;
    evos: EvolutionNode[];
}

export interface EvolutionNode {
    evolutionName: string;
    level: number;
    methodName: string;
    infoName: string;
    evos: EvolutionNode[];
}
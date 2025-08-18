export interface TranslationName
{
    referenceId: bigint;
    name: string;
}

export type Translation = (key: string, values?: Record<string, string>) => string;
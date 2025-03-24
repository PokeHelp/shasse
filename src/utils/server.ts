/**
 * Permet de loger de bonne façon tout type d'erreurs sur le server
 *
 * @param error
 */
export function logError(error: unknown): void
{
    if (error instanceof Error)
    {
        console.error("Erreur: ", error.message, error.stack);
    } else if (typeof error === 'object' && error !== null)
    {
        console.error("Erreur: ", JSON.stringify(error, null, 2));
    } else
    {
        console.error("Une erreur inconnue s'est produite, mais aucune information n'est disponible.");
    }
}


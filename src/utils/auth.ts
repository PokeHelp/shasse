/**
 * Permet de récupérer la valeur d'un cookie suivant son nom
 *
 * @param cookieName
 */
export function getCookie(cookieName: string): string | null
{
    if (!isBrowser()) return null;

    return document.cookie
        .split('; ')
        .find(row => row.startsWith(`${cookieName}=`))
        ?.split('=')[1] || null;
}

/**
 * Permet de définir un cookie
 *
 * @param key
 * @param value
 * @param maxAge (en secondes)
 */
export function setCookie(key: string, value: string, maxAge: number): void
{
    document.cookie = `${key}=${value}; SameSite=Strict; Path=/; Max-Age=${maxAge}`;
}

export function isBrowser(): boolean {
    return typeof window !== "undefined";
}
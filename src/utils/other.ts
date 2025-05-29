/**
 * Permet de retirer une clé d'un objet
 *
 * @param obj
 * @param keys
 */
export function excludeFields<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const result = { ...obj };
    keys.forEach(key => delete result[key]);
    return result;
}
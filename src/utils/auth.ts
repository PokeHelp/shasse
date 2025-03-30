import jwt, {JwtPayload, SignOptions} from "jsonwebtoken";
import {StringValue} from "ms";

/**
 * Permet de créer un JWT Token
 *
 * @param data
 * @param isRefresh
 * @param expireIn
 */
export function createJWT(data: object, isRefresh: boolean = false, expireIn: StringValue | number = "1h"): string
{
    if (!process.env.JWT_SECRET || !process.env.REFRESH_SECRET) throw new Error("Les clés secrètes JWT ne sont pas configurées.");

    const options: SignOptions = {
        expiresIn: expireIn
    };

    try
    {
        return jwt.sign(
            data,
            isRefresh ? process.env.REFRESH_SECRET : process.env.JWT_SECRET,
            options
        );
    } catch (error)
    {
        console.log(error);
        throw new Error("Erreur lors de la création du JWT");
    }
}

/**
 * Permet de vérifier et décoder un JWT Token
 *
 * @param token
 * @param isRefresh
 */
export function verifyJWT(token: string, isRefresh: boolean = false): JwtPayload
{
    if (!process.env.JWT_SECRET || !process.env.REFRESH_SECRET) throw new Error("Les clés secrètes JWT ne sont pas configurées.");

    return jwt.verify(token, isRefresh ? process.env.REFRESH_SECRET : process.env.JWT_SECRET) as JwtPayload;
}

/**
 * Permet de récupérer la valeur d'un cookie suivant son nom
 *
 * @param cookieName
 */
export function getCookie(cookieName: string): string | null
{
    if (typeof window === 'undefined') return null;

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
// TODO: sécuriser les cookie quand on passera en https
    document.cookie = `${key}=${value}; SameSite=Strict; Path=/; Max-Age=${maxAge}`;
}
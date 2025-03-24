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
    for (const cookie of document.cookie.split('; '))
    {
        const [name, value] = cookie.split('=');
        if (name === cookieName)
        {
            return value;
        }
    }

    return null;
}
// Laisser l'import car il permet d'avoir les attributs de base
import { NextApiRequest } from 'next';

declare module 'next' {
    interface NextApiRequest {
        user?: {
            userId: number;
            roles: { name: string; levelAccess: number }[];
        };
    }
}
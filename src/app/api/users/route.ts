import {NextResponse} from 'next/server';
import {prisma} from '@lib';
import {sendResponse} from "@utils";
import {HttpStatusCode} from "axios";

/**
 * Route de test de récupération de data
 *
 * @constructor
 */
export async function GET() {
    try {
        const users = await prisma.user.findMany();

        const formattedUsers = users.map((user) => ({
            ...user,
            id: user.id.toString(), // Convertir BigInt en string
        }));

        return NextResponse.json(formattedUsers);
    } catch (error) {
        console.error('Erreur Prisma :', error);
        return sendResponse({ error: 'Erreur serveur lors de la récupération des utilisateurs.' }, HttpStatusCode.InternalServerError);
    }
}
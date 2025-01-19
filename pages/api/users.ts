import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'GET') {
        try {
            const users = await prisma.user.findMany();

            // Convertir BigInt en string
            const formattedUsers = users.map((user) => ({
                ...user,
                id: user.id.toString(), // Convertir BigInt en string
            }));

            res.status(200).json(formattedUsers);
        } catch (error) {
            console.error('Erreur Prisma :', error);
            res.status(500).json({ error: 'Erreur serveur lors de la récupération des utilisateurs.' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Méthode ${req.method} non autorisée.`);
    }
}

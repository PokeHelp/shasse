import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import prisma from '@/src/lib/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { refreshToken } = req.body;

    try {
        // Vérifier le refresh token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET!) as { userId: number };

        // Récupérer l'utilisateur avec ses rôles
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            include: {
                roleUsers: {
                    include: {
                        role: true,
                    },
                },
            },
        });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Extraire les rôles de l'utilisateur
        const roles = user.roleUsers.map((roleUser) => ({
            name: roleUser.role.name,
            levelAccess: roleUser.role.levelAccess,
        }));

        // Générer un nouvel access token avec les rôles
        const accessToken = jwt.sign(
            { userId: user.id, roles },
            process.env.JWT_SECRET!,
            { expiresIn: '2s' } // Nouvelle durée de validité
        );

        res.status(200).json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
}
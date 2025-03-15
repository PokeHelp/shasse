import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

interface JwtPayload {
    userId: number;
    roles: string[];
}

export function authenticate(requiredLevelAccess: number) {
    return async (
        req: NextApiRequest,
        res: NextApiResponse,
        next: () => void
    ): Promise<void> => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

            req.user = {
                userId: decoded.userId,
                roles: decoded.roles,
            };

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

            const hasAccess = user.roleUsers.some(
                (roleUser) => roleUser.role.levelAccess >= requiredLevelAccess
            );

            if (!hasAccess) {
                return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
            }

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Invalid token' });
        }
    };
}
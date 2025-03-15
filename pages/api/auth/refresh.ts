import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';

interface RefreshRequest {
    refreshToken: string;
}

interface RefreshResponse {
    accessToken: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RefreshResponse | { message: string }>
): Promise<void> {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { refreshToken } = req.body as RefreshRequest;

    try {
        const storedToken = await prisma.refresh_token.findUnique({
            where: { token: refreshToken },
            include: {
                users: {
                    include: {
                        roleUsers: {
                            include: {
                                role: true,
                            },
                        },
                    },
                },
            },
        });

        if (!storedToken || new Date(storedToken.expiresAt) < new Date()) {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }

        const roles: string[] = storedToken.users.roleUsers.map((roleUser) => roleUser.role.name);
        const accessToken: string = jwt.sign(
            { userId: storedToken.users.id, roles },
            process.env.JWT_SECRET!,
            { expiresIn: '15m' }
        );

        res.status(200).json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
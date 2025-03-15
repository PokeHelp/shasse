import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';
import { user, langue } from '@prisma/client';

interface RegisterRequest {
    email: string;
    username: string;
    password: string;
}

interface RegisterResponse {
    message: string;
    user?: user;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RegisterResponse>
): Promise<void> {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, username, password } = req.body as RegisterRequest;

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username },
                ],
            },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Email or username already exists' });
        }

        const hashedPassword: string = await bcrypt.hash(password, 10);
        const defaultRole = await prisma.role.findUnique({
            where: { name: 'User' },
        });

        if (!defaultRole) {
            return res.status(500).json({ message: 'Default role not found' });
        }

        const langue: langue | null = await prisma.langue.findUnique({where: {name: "french"}})

        if (!langue) {
            return res.status(500).json({ message: 'Langue not found' });
        }
        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword,
                discordId: null,
                langueId: langue.id,
                lastConnexion: new Date(),
                roleUsers: {
                    create: {
                        roleId: defaultRole.id,
                    },
                },
            },
            include: {
                roleUsers: {
                    include: {
                        role: true,
                    },
                },
            },
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
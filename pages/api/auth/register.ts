import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma';
import { user, langue } from '@prisma/client';

interface RegisterRequest {
    email: string;
    username: string;
    password: string;
    langue: string;
}

interface RegisterResponse {
    message: string;
    accessToken?: string;
    refreshToken?: string;
    user?: user;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<RegisterResponse>
): Promise<void> {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email, username, password, langue: browserLang } = req.body as RegisterRequest;

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

        let langue: langue | null = await prisma.langue.findFirst({
            where: { isoCode: browserLang },
        });

        if (!langue) {
            langue = await prisma.langue.findUnique({
                where: { name: 'french' },
            });

            if (!langue) {
                return res.status(500).json({ message: 'Default language not found' });
            }
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

        // Générer les tokens JWT
        const roles = user.roleUsers.map(roleUser => ({
            name: roleUser.role.name,
            levelAccess: roleUser.role.levelAccess,
        }));

        const accessToken = jwt.sign(
            { userId: user.id, roles },
            process.env.JWT_SECRET!,
            { expiresIn: '2h' }
        );

        const refreshToken = jwt.sign(
            { userId: user.id },
            process.env.REFRESH_SECRET!,
            { expiresIn: '7d' }
        );

        // Enregistrer le refresh token dans la base de données
        await prisma.refresh_token.create({
            data: {
                token: refreshToken,
                userId: user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
        });

        // Renvoyer les tokens dans la réponse
        res.status(201).json({
            message: 'User registered successfully',
            accessToken,
            refreshToken,
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
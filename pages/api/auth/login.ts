import {NextApiRequest, NextApiResponse} from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from '@/lib/prisma';

interface LoginRequest
{
    emailOrUsername: string;
    password: string;
}

interface LoginResponse
{
    accessToken: string;
    refreshToken: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<LoginResponse | { message: string }>
): Promise<void>
{
    if (req.method !== 'POST')
    {
        return res.status(405).json({message: 'Method not allowed'});
    }

    const {emailOrUsername, password} = req.body as LoginRequest;

    try
    {
        const user = await prisma.user.findFirst({
            where:   {
                OR: [
                    {email: emailOrUsername},
                    {username: emailOrUsername},
                ],
            },
            include: {
                roleUsers: {
                    include: {
                        role: true,
                    },
                },
            },
        });

        if (!user)
        {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const isValid: boolean = await bcrypt.compare(password, user.password);
        if (!isValid)
        {
            return res.status(401).json({message: 'Invalid credentials'});
        }
        const roles: { name: string, levelAccess: number }[] = user.roleUsers.map((roleUser): {
            name: string,
            levelAccess: number
        } => ({
            name:        roleUser.role.name,
            levelAccess: roleUser.role.levelAccess,
        }));

        const accessToken: string = jwt.sign(
            {userId: user.id, roles},
            process.env.JWT_SECRET!,
            {expiresIn: '2s'}
        );

        const refreshToken: string = jwt.sign(
            {userId: user.id},
            process.env.REFRESH_SECRET!,
            {expiresIn: '7d'}
        );

        await prisma.refresh_token.create({
            data: {
                token:     refreshToken,
                userId:    user.id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours
            },
        });

        res.status(200).json({accessToken, refreshToken});
    } catch (error)
    {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
}
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    userId: number;
    roles: { name: string; levelAccess: number }[];
}

export function authenticate(requiredLevelAccess: number) {
    return async (
        req: NextApiRequest,
        res: NextApiResponse,
        next: () => void
    ) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
            req.user = decoded;

            // Vérifier si l'utilisateur a le levelAccess requis
            const hasAccess = decoded.roles.some(
                (role) => role.levelAccess >= requiredLevelAccess
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
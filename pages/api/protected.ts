import { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '@/src/middleware/auth';

interface ProtectedResponse {
    message: string;
    userId?: number;
    roles?: string[];
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProtectedResponse>
): Promise<void> {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    await authenticate(1)(req, res, () => {
        // Accéder à req.user sans erreur TypeScript
        const userId = req.user?.userId;
        const roles = req.user?.roles;

        res.status(200).json({
            message: 'You have access to this protected route!',
            userId,
            roles,
        });
    });
}
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';

interface User {
    userId: number;
    roles: { name: string; levelAccess: number }[];
}

interface ProtectedPageProps {
    requiredLevelAccess: number;
    children: React.ReactNode;
}

export default function ProtectedPage({ requiredLevelAccess, children }: ProtectedPageProps) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            router.push('/login'); // Rediriger vers la page de connexion
            return;
        }

        // Vérifier si le token est valide
        const decoded = jwt.decode(accessToken) as User;
        if (!decoded) {
            router.push('/login'); // Rediriger si le token est invalide
            return;
        }

        // Vérifier le levelAccess
        const hasAccess = decoded.roles.some(
            (role) => role.levelAccess >= requiredLevelAccess
        );

        if (!hasAccess) {
            router.push('/unauthorized'); // Rediriger vers une page d'erreur
            return;
        }

        setIsAuthorized(true);
    }, [router, requiredLevelAccess]);

    if (!isAuthorized) {
        return null; // Ou un spinner de chargement
    }

    return <>{children}</>;
}
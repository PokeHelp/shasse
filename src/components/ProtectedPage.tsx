import {ReactNode, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import { refreshAccessToken } from '@/src/utils/auth';

interface Role {
    name: string;
    levelAccess: number;
}

interface User {
    userId: number;
    roles: Role[];
    exp: number;
}

interface ProtectedPageProps {
    requiredLevelAccess: number;
    children: ReactNode;
}

export default function ProtectedPage({ requiredLevelAccess, children }: ProtectedPageProps) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const accessToken = localStorage.getItem('accessToken');

            // Si aucun access token n'est trouvé, rediriger vers la page de connexion
            // Si aucun access token n'est trouvé, essayer de le rafraîchir
            if (!accessToken) {
                const newToken = await refreshAccessToken();
                if (!newToken) {
                    router.push('/login'); // Rediriger si le rafraîchissement échoue
                    return;
                }
                // Stocker le nouvel access token
                localStorage.setItem('accessToken', newToken);
                // Recharger la page pour utiliser le nouveau token
                window.location.reload();
                return;
            }

            // Décoder le token pour vérifier son expiration
            const decoded = jwt.decode(accessToken) as User | null;
            if (!decoded || !decoded.roles) {
                router.push('/login');
                return;
            }

            const now = Date.now() / 1000; // Temps actuel en secondes

            // Si le token est expiré, essayer de le rafraîchir
            if (decoded.exp < now) {
                const newToken = await refreshAccessToken();
                if (!newToken) {
                    router.push('/login'); // Rediriger si le rafraîchissement échoue
                    return;
                }
                // Stocker le nouvel access token
                localStorage.setItem('accessToken', newToken);
                // Recharger la page pour utiliser le nouveau token
                window.location.reload();
                return;
            }

            // Vérifier les permissions de l'utilisateur
            const hasAccess = decoded.roles.some(
                (role) => role.levelAccess >= requiredLevelAccess
            );

            if (!hasAccess) {
                router.push('/unauthorized');
                return;
            }

            setIsAuthorized(true);
        };

        checkAuth();
    }, [router, requiredLevelAccess]);

    if (!isAuthorized) {
        return null; // Ou un spinner de chargement
    }

    return <>{children}</>;
}
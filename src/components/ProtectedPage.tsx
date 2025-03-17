import { useRouter } from 'next/router';
import {ReactNode, useEffect} from 'react';
import {useAuth} from "@/src/context/AuthContext";

interface ProtectedPageProps {
    requiredLevelAccess: number;
    children: ReactNode;
}

export default function ProtectedPage({ requiredLevelAccess, children }: ProtectedPageProps) {
    const { isAuthenticated, user, isLoading } = useAuth(); // Ajout de isLoading
    const router = useRouter();

    console.log(user)

    useEffect(() => {
        // Ne rien faire si le chargement est en cours
        if (isLoading) return;

        // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
        if (!isAuthenticated || !user) {
            router.push('/login');
            return;
        }

        // Vérifiez si l'utilisateur a le niveau d'accès requis
        const hasAccess = user.roles.some((role) => role.levelAccess >= requiredLevelAccess);
        if (!hasAccess) {
            router.push('/unauthorized'); // Redirigez vers une page non autorisée
        }
    }, [isAuthenticated, user, requiredLevelAccess, router, isLoading]);

    // Afficher un spinner pendant le chargement
    if (isLoading) {
        return <div>Chargement...</div>; // Ou un composant de spinner
    }

    // Si l'utilisateur n'est pas authentifié ou n'a pas accès, ne rien afficher
    if (!isAuthenticated || !user) {
        return null;
    }

    // Si l'utilisateur est authentifié et a accès, affichez le contenu
    return <>{children}</>;
}
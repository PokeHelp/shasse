import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Logout() {
    const router = useRouter();

    useEffect(() => {
        // Supprimer l'access token du localStorage
        localStorage.removeItem('accessToken');

        // Supprimer le refresh token des cookies
        document.cookie = 'refreshToken=; Max-Age=0; Path=/;';

        // Rediriger vers la page de connexion
        router.push('/login');
    }, [router]);

    return <p>Logging out...</p>;
}
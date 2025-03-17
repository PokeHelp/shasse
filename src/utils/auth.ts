export async function refreshAccessToken(): Promise<string | null> {
    try {
        // Récupérer le refresh token depuis les cookies
        const refreshToken = document.cookie
            .split('; ')
            .find((row) => row.startsWith('refreshToken='))
            ?.split('=')[1];

        if (!refreshToken) {
            throw new Error('No refresh token found');
        }

        // Envoyer une requête pour rafraîchir l'access token
        const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            throw new Error('Failed to refresh token');
        }

        const { accessToken } = await response.json();

        // Stocker le nouvel access token dans le localStorage
        localStorage.setItem('accessToken', accessToken);

        return accessToken;
    } catch (error) {
        console.error(error);
        return null;
    }
}
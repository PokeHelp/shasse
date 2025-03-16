import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter();
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ emailOrUsername, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const { accessToken, refreshToken } = await response.json();

            // Stocker l'access token dans le localStorage
            localStorage.setItem('accessToken', accessToken);

            // Stocker le refresh token dans un cookie sécurisé
            // TODO: rajouter "HttpOnly" quand on aura les tests pour voir que tt fonctionne
            // TODO: rajouter "Secure" sur le site quand on aura le https
            document.cookie = `refreshToken=${refreshToken}; SameSite=Strict; Path=/; Max-Age=${7 * 24 * 60 * 60}`;

            // Rediriger vers une page sécurisée
            router.push('/protectedPage');
        } catch (error) {
            setError('Invalid email/username or password');
            console.log(error)
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email or Username:</label>
                    <input
                        type="text"
                        value={emailOrUsername}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
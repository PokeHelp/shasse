import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [langue, setLangue] = useState('french');

    useEffect(() => {
        const browserLang = navigator.language.split('-')[0];
        setLangue(browserLang);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password, langue }),
            });

            if (!response.ok) {
                const data = await response.json();
                new Error(data.message || 'Registration failed');
            }

            const { accessToken, refreshToken } = await response.json();

            // Stocker les tokens dans le localStorage ou les cookies
            localStorage.setItem('accessToken', accessToken);
            document.cookie = `refreshToken=${refreshToken}; SameSite=Strict; Path=/; Max-Age=${7 * 24 * 60 * 60}`;

            // Rediriger vers la page d'accueil ou une autre page sécurisée
            router.push('/protectedPage');
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Registration failed');
        }
    };

    return (
        <div>
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
import { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/api/users')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erreur réseau : ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then((data: User[]) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des utilisateurs :', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <div>
            <h1>Liste des Utilisateurs</h1>
            <h2>Test - affichage</h2>
            {users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <p><strong>Nom :</strong> {user.name}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun utilisateur trouvé.</p>
            )}
        </div>
    );
}

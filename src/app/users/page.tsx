'use client';

import {useQuery} from '@tanstack/react-query';
import {JSX} from "react";
import {axiosService} from "@lib";

interface User
{
    id: string; // Converti en string
    name: string;
    email: string;
}

async function fetchUsers(): Promise<User[]>
{
    const {data} = await axiosService.get<User[]>('/api/users');
    return data;
}

/**
 * Page: /users
 * page de test de récupération / affichage des données
 *
 * @constructor
 */
export default function Users(): JSX.Element
{
    const {
              data: users,
              isLoading,
              error,
          } = useQuery<User[], Error>({
        queryKey: ['users'],
        queryFn:  fetchUsers,
    });

    if (isLoading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;

    return (
        <>
            <h1>Liste des Utilisateurs</h1>
            <h2>Test - affichage</h2>
            {users && users.length > 0 ? (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <p>
                                <strong>Nom :</strong> {user.name}
                            </p>
                            <p>
                                <strong>Email :</strong> {user.email}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun utilisateur trouvé.</p>
            )}
        </>
    );
}
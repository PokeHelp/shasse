import { createContext, useContext, useEffect, useState } from 'react';
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

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean; // Ajout d'un état de chargement
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true); // État de chargement initial
    const router = useRouter();

    const checkAuth = async () => {
        setIsLoading(true); // Début du chargement

        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            const newToken = await refreshAccessToken();
            if (!newToken) {
                setIsLoading(false); // Fin du chargement
                router.push('/login');
                return;
            }
            localStorage.setItem('accessToken', newToken);
            window.location.reload();
            return;
        }

        const decoded = jwt.decode(accessToken) as User | null;
        if (!decoded || !decoded.roles) {
            setIsLoading(false); // Fin du chargement
            router.push('/login');
            return;
        }

        const now = Date.now() / 1000;
        if (decoded.exp < now) {
            const newToken = await refreshAccessToken();
            if (!newToken) {
                setIsLoading(false); // Fin du chargement
                router.push('/login');
                return;
            }
            localStorage.setItem('accessToken', newToken);
            window.location.reload();
            return;
        }

        setIsAuthenticated(true);
        setUser(decoded);
        setIsLoading(false); // Fin du chargement
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, isLoading, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
import ProtectedPage from '@/src/components/ProtectedPage';

export default function Dashboard() {
    return (
        <ProtectedPage requiredLevelAccess={1}>
            <h1>Route protégée</h1>
        </ProtectedPage>
    );
}
import type { AppProps } from 'next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import {queryClient} from "@/src/lib/reactQuery";
import {AuthProvider} from "@/src/context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default MyApp;
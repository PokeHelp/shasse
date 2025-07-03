import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
    images: {
        // Liste des domaines autorisés pour les images
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pokehelp.github.io',
                port: '',
                pathname: '/Image/**',
            },
        ],

        // Formats d'image générés par Next.js (WebP est recommandé)
        formats: ['image/webp'],

        // Tailles d'écran pour le responsive
        deviceSizes: [
            640,    // Petit mobile
            750,    // Mobile
            828,    // Grand mobile
            1080,   // Petit laptop
            1200,   // Laptop
            1920,   // Desktop
            2048,   // Grand écran
            3840    // 4K
        ],
    },

    // Mode strict de React (développement seulement)
    reactStrictMode: true,

    experimental: {
        authInterrupts: true
    }
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
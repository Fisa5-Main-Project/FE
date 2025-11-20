import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'main project',
        short_name: 'knowwhohow',
        description: 'main project with Next.js',
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#0067AC',
        icons: [
            {
                src: '/assets/logo/logo-192x192.png', // public 폴더 기준 경로
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/assets/logo/logo-512x512.png', // public 폴더 기준 경로
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    };
}

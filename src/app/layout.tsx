import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
    title: 'Woori',
    description: 'Main Project Client with Next.js',
    manifest: '/manifest.webmanifest', // Next.js 14부터는 ts파일을 webmanifest로 자동 변환
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko" className="font-sans">
            <body>{children}</body>
        </html>
    );
}

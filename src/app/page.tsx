import Image from 'next/image';

export default function LandingPage() {
    return (
        <main className="flex h-screen w-full flex-col bg-white">
            <div className="flex flex-1 flex-col items-center justify-center">
                <Image src="/assets/logo/logo.png" alt="WON 로고" width={120} height={120} priority />
                <h1 className="mt-4 text-2xl font-bold text-primary" style={{ fontFamily: 'Wooridaum' }}>
                    우리은행
                </h1>
            </div>
        </main>
    );
}

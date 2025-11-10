'use client';

import { usePathname } from 'next/navigation';
import AssetProgressBar from '@/components/common/AssetProgressBar';
import { useState, useEffect } from 'react';

// 7개 스텝 경로 정의
const FUNNEL_STEPS = [
    '/asset/info',
    '/asset/living-expenses',
    '/asset/fixed-costs',
    '/asset/status',
    '/asset/income',
    '/asset/period',
    '/asset/target-amount',
];

export default function AssetLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const [isFunnelStep, setIsFunnelStep] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const currentStepIndex = FUNNEL_STEPS.indexOf(pathname);
        const isStep = currentStepIndex !== -1;

        setIsFunnelStep(isStep);

        if (isStep) {
            const calculatedProgress = ((currentStepIndex + 1) / FUNNEL_STEPS.length) * 100;
            setProgress(calculatedProgress);
        } else {
            setProgress(0);
        }
    }, [pathname]);

    return (
        // [수정] h-full -> min-h-screen
        // 이렇게 하면 콘텐츠가 짧아도 배경이 화면 전체를 덮고,
        // 콘텐츠가 길어져도 배경이 함께 늘어납니다.
        <div className="flex flex-col min-h-screen bg-[linear-gradient(to_bottom,#FFFFFF_0%,#CCE1FF_17%,#E0EDFF_50%,#FFFFFF_79%,#FFFFFF_100%)]">
            <main className="page-container flex flex-col flex-grow">
                {isFunnelStep && (
                    <div className="mb-10">
                        <AssetProgressBar progress={progress} />
                    </div>
                )}

                {children}
            </main>
        </div>
    );
}

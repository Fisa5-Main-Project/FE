// app/(asset-management)/asset/layout.tsx

'use client';

import { usePathname } from 'next/navigation';
import AssetProgressBar from '@/components/asset/AssetProgressBar';
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

    // 2. pathname에 의존하는 값들을 state로 관리합니다.
    //    초기값(서버/클라이언트 첫 렌더)은 false/0으로 고정합니다.
    const [isFunnelStep, setIsFunnelStep] = useState(false);
    const [progress, setProgress] = useState(0);

    // 3. 마운트 이후, 그리고 pathname이 변경될 때만 클라이언트 사이드에서 실행됩니다.
    useEffect(() => {
        const currentStepIndex = FUNNEL_STEPS.indexOf(pathname);
        const isStep = currentStepIndex !== -1;

        setIsFunnelStep(isStep); // state 업데이트

        if (isStep) {
            const calculatedProgress = ((currentStepIndex + 1) / FUNNEL_STEPS.length) * 100;
            setProgress(calculatedProgress); // state 업데이트
        } else {
            setProgress(0); // 스텝이 아니면 0으로 리셋
        }
    }, [pathname]); // pathname이 바뀔 때마다 이 로직을 다시 실행합니다.

    return (
        <div className="flex flex-col h-full bg-[linear-gradient(to_bottom,#FFFFFF_0%,#CCE1FF_17%,#E0EDFF_50%,#FFFFFF_79%,#FFFFFF_100%)]">
            <main className="page-container flex flex-col flex-grow">
                {/* 4. 이 부분은 이제 state에 의존합니다.
          - 서버 렌더: isFunnelStep = false (바 렌더링 X)
          - 클라이언트 첫 렌더: isFunnelStep = false (바 렌더링 X) -> 서버와 일치!
          - 클라이언트 마운트 후: useEffect 실행, state 변경, 바 렌더링 O (필요시)
        */}
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

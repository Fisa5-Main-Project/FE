// app/(asset-management)/asset/building/page.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Page, PageContent } from '@/components/common/Page';
import LoadingStep from '@/components/asset/building/LoadingStep'; // 제공된 컴포넌트 임포트

/**
 * 포트폴리오 구성 중 로딩 페이지
 */
export default function BuildingPage() {
    const router = useRouter();

    // LoadingStep 컴포넌트가 100% 완료되면 호출될 콜백 함수
    const handleLoadingComplete = () => {
        router.push('/asset/complete'); // '완료' 페이지로 이동
    };

    return (
        <Page>
            {/* 이 페이지는 하단 버튼이 없으므로 PageContent만 사용 */}
            <PageContent>
                <LoadingStep onComplete={handleLoadingComplete} />
            </PageContent>
        </Page>
    );
}

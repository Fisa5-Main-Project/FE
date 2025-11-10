// app/(asset-management)/asset/building/page.tsx

'use client';

import React from 'react';
// import { useRouter } from 'next/navigation'; // 1. 제거
import { Page, PageContent } from '@/components/common/Page';
import LoadingStep from '@/components/asset/building/LoadingStep';
import { useAssetRouter } from '@/hooks/asset/useAssetRouter'; // 2. useAssetRouter 임포트

/**
 * 포트폴리오 구성 중 로딩 페이지
 */
export default function BuildingPage() {
    const { goTo } = useAssetRouter(); // 3. useAssetRouter 사용

    // LoadingStep 컴포넌트가 100% 완료되면 호출될 콜백 함수
    const handleLoadingComplete = () => {
        goTo('complete'); // 4. router.push -> goTo로 변경
    };

    return (
        <Page>
            <PageContent>
                <LoadingStep onComplete={handleLoadingComplete} />
            </PageContent>
        </Page>
    );
}

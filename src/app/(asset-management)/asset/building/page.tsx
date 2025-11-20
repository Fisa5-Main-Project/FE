'use client';

import React from 'react';
import { Page, PageContent } from '@/components/common/Page';
import LoadingStep from '@/components/asset/building/LoadingStep';
import { usePortfolioBuilding } from '@/hooks/asset/usePortfolioBuilding';

/**
 * 포트폴리오 구성 중 로딩 페이지
 */
export default function BuildingPage() {
    const { isLoading, handleLoadingComplete } = usePortfolioBuilding();

    return (
        <Page>
            <PageContent>
                <LoadingStep onComplete={handleLoadingComplete} isLoading={isLoading} />
            </PageContent>
        </Page>
    );
}

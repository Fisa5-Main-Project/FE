// app/(asset-management)/asset/status/page.tsx

'use client';

import React from 'react';
import { Page, PageHeader, PageContent, PageActions } from '@/components/common/Page';
import Button from '@/components/common/Button';
import AssetStatusCards from '@/components/asset/status/AssetStatusCard';
import { useAssetRouter } from '@/hooks/asset/useAssetRouter';
import { useAssetStore } from '@/stores/asset/useAssetStore';

/**
 * 자산 관리 - 은퇴 여부 페이지
 */
export default function AssetStatusPage() {
    const { goTo } = useAssetRouter();

    const status = useAssetStore((state) => state.status);
    const setStatus = useAssetStore((state) => state.setStatus);

    const handleNext = () => {
        if (!status) return;
        goTo('income');
    };

    return (
        <Page>
            <div className="flex flex-col flex-grow h-full">
                <PageContent>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <PageHeader>은퇴 여부</PageHeader>
                            <p className="text-neutral-500 text-xl font-medium">현재 재직 중인지 체크해주세요.</p>
                        </div>
                        <AssetStatusCards selection={status} onSelect={setStatus} />
                    </div>
                </PageContent>
                <PageActions>
                    <Button variant="primary" onClick={handleNext} disabled={!status}>
                        다음
                    </Button>
                </PageActions>
            </div>
        </Page>
    );
}

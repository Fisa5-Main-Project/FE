// app/(asset-management)/asset/status/page.tsx

'use client';

import React, { useState } from 'react';
import { Page, PageHeader, PageContent, PageActions } from '@/components/common/Page';
import Button from '@/components/common/Button';
import AssetStatusCards from '@/components/asset/status/AssetStatusCard';
import { useAssetRouter } from '@/hooks/asset/useAssetRouter'; // 2. useAssetRouter 임포트

export type AssetStatusType = 'retired' | 'working';

/**
 * 자산 관리 - 은퇴 여부 페이지
 */
export default function AssetStatusPage() {
    const { goTo } = useAssetRouter(); // 3. useAssetRouter 사용
    const [selection, setSelection] = useState<AssetStatusType | null>(null);

    const handleNext = () => {
        if (!selection) return;
        goTo('income'); // 4. router.push -> goTo로 변경
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
                        <AssetStatusCards selection={selection} onSelect={setSelection} />
                    </div>
                </PageContent>
                <PageActions>
                    <Button variant="primary" onClick={handleNext} disabled={!selection}>
                        다음
                    </Button>
                </PageActions>
            </div>
        </Page>
    );
}

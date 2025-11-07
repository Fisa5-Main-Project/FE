// src/app/(asset-management)/asset/info/page.tsx

'use client';

import React from 'react';
import { Page, PageActions, PageContent, PageHeader } from '@/components/common/Page';
import Button from '@/components/common/Button';
import { useAssetInfo } from '@/hooks/asset/useAssetInfo';

/**
 * 자산 설계 정보 입력 페이지 라우트입니다.
 */
export default function AssetInfoPage() {
    const { handleNext } = useAssetInfo();

    return (
        <Page>
            <PageContent>
                <PageHeader>
                    <strong className="font-bold">{'자산 설계를 위한\n정보를 입력해주세요'}</strong>
                </PageHeader>
            </PageContent>

            <PageActions>
                <Button variant="primary" onClick={handleNext}>
                    다음
                </Button>
            </PageActions>
        </Page>
    );
}

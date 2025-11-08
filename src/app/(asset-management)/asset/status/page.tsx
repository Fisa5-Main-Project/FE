// app/(asset-management)/asset/status/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Page,
    PageHeader,
    PageContent,
    PageActions,
} from '@/components/common/Page';
import Button from '@/components/common/Button';
import AssetStatusCards from '@/components/asset/status/AssetStatusCard';

export type AssetStatusType = 'retired' | 'working';

/**
 * 자산 관리 - 은퇴 여부 페이지
 * LivingExpensesPage와 동일한 레이아웃 구조를 따릅니다.
 */
export default function AssetStatusPage() {
    const router = useRouter();
    const [selection, setSelection] = useState<AssetStatusType | null>(null);

    const handleNext = () => {
        if (!selection) return;
        router.push('/asset/income');
    };

    return (
        <Page>
            {/* 1. LivingExpensesPage의 <form> 태그와 동일한 레이아웃 역할을 하는 div */}
            <div className='flex flex-col flex-grow h-full'>
                {/* 2. 컨텐츠 (flex-grow) */}
                <PageContent>
                    {/* LivingExpensesPage의 'gap-7' div에 해당 */}
                    <div className='flex flex-col gap-7'>
                        {/* LivingExpensesPage의 'gap-2' div (헤더+설명) */}
                        <div className='flex flex-col gap-2'>
                            <PageHeader>은퇴 여부</PageHeader>
                            <p className='text-neutral-500 text-xl font-medium'>
                                현재 재직 중인지 체크해주세요.
                            </p>
                        </div>

                        {/* 메인 컨텐츠 (카드) */}
                        <AssetStatusCards
                            selection={selection}
                            onSelect={setSelection}
                        />
                    </div>
                </PageContent>

                {/* 3. 액션 (flex-shrink-0) */}
                <PageActions>
                    <Button
                        variant='primary'
                        onClick={handleNext}
                        disabled={!selection}
                    >
                        다음
                    </Button>
                </PageActions>
            </div>
        </Page>
    );
}

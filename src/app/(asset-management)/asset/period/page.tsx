// app/(asset-management)/asset/period/page.tsx

'use client';

import React from 'react';
// import { useRouter } from 'next/navigation'; // 1. 제거
import { Page, PageContent, PageActions, PageHeader } from '@/components/common/Page';
import Button from '@/components/common/Button';
import PeriodSelect from '@/components/asset/period/PeriodSelect';
import { usePeriodForm } from '@/hooks/asset/usePeriodForm';
import { useAssetRouter } from '@/hooks/asset/useAssetRouter'; // 2. useAssetRouter 임포트

export default function PeriodPage() {
    const { goTo } = useAssetRouter(); // 3. useAssetRouter 사용
    const { period, handlePeriodChange, isNextDisabled } = usePeriodForm('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isNextDisabled) return;

        console.log('Target Period:', period);
        goTo('target-amount'); // 4. router.push -> goTo로 변경
    };

    return (
        <Page>
            <form onSubmit={handleSubmit} className="flex flex-col flex-grow h-full">
                <PageContent>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <PageHeader>목표 기간</PageHeader>
                            <p className="text-neutral-500 text-xl font-medium">
                                자산을 모으고자 하는 목표 기간을 입력해주세요.
                            </p>
                        </div>
                        <PeriodSelect
                            id="target-period"
                            value={period}
                            onValueChange={handlePeriodChange}
                            aria-label="목표 기간"
                            placeholder="선택"
                        />
                    </div>
                </PageContent>
                <PageActions>
                    <Button type="submit" variant="primary" disabled={isNextDisabled}>
                        다음
                    </Button>
                </PageActions>
            </form>
        </Page>
    );
}

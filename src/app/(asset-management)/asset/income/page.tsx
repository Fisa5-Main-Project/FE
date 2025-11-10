// app/(asset-management)/asset/income/page.tsx

'use client';

import React from 'react';
import { Page, PageContent, PageActions, PageHeader } from '@/components/common/Page';
import Button from '@/components/common/Button';
import AmountInput from '@/components/common/AmountInput';
import { useIncomeForm } from '@/hooks/asset/useIncomeForm';
import { useAssetRouter } from '@/hooks/asset/useAssetRouter'; // 2. useAssetRouter 임포트

export default function IncomePage() {
    const { goTo } = useAssetRouter(); // 3. useAssetRouter 사용
    const { amount, handleAmountChange, isNextDisabled } = useIncomeForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isNextDisabled) return;

        console.log('Fixed Income:', amount);
        goTo('period'); // 4. router.push -> goTo로 변경
    };

    return (
        <Page>
            <form onSubmit={handleSubmit} className="flex flex-col flex-grow h-full">
                <PageContent>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <PageHeader>고정 소득 (월)</PageHeader>
                            <p className="text-neutral-500 text-xl font-medium">매달 고정 소득을 입력해주세요.</p>
                        </div>
                        <AmountInput
                            id="fixed-income"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="0"
                            aria-label="월 평균 고정 소득"
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

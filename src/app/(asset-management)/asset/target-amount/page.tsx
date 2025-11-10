'use client';

import React from 'react';
import { Page, PageContent, PageActions, PageHeader } from '@/components/common/Page';
import Button from '@/components/common/Button';
import AmountInput from '@/components/common/AmountInput';
import { useTargetAmountForm } from '@/hooks/asset/useTargetAmountForm';
import { useAssetRouter } from '@/hooks/asset/useAssetRouter';

export default function TargetAmountPage() {
    const { goTo } = useAssetRouter();
    const { amount, handleAmountChange, isNextDisabled } = useTargetAmountForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isNextDisabled) return;
        goTo('building');
    };

    return (
        <Page>
            <form onSubmit={handleSubmit} className="flex flex-col flex-grow h-full">
                <PageContent>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <PageHeader>목표 금액</PageHeader>
                            <p className="text-neutral-500 text-xl font-medium">
                                달성하고 싶은 목표 금액을 입력해주세요.
                            </p>
                        </div>
                        <AmountInput
                            id="target-amount"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="0"
                            aria-label="달성 목표 금액"
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

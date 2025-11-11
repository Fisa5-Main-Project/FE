'use client';

import { Page, PageContent, PageActions, PageHeader } from '@/components/common/Page';
import Button from '@/components/common/Button';
import AmountInput from '@/components/common/AmountInput';
import { useAssetRouter } from '@/hooks/asset/useAssetRouter';
import { useFixedCostsForm } from '@/hooks/asset/useFixedCostsForm';

export default function FixedCostsPage() {
    const { goTo } = useAssetRouter();
    const { amount, handleAmountChange, isNextDisabled } = useFixedCostsForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isNextDisabled) return;
        goTo('status');
    };

    return (
        <Page>
            <form onSubmit={handleSubmit} className="flex flex-col flex-grow h-full">
                <PageContent>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <PageHeader>고정 지출비 (월)</PageHeader>
                            <p className="text-neutral-500 text-xl font-medium">매달 고정적으로 지출하는 비용입니다.</p>
                        </div>
                        <AmountInput
                            id="fixed-costs"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="0"
                            aria-label="월 평균 고정 지출비"
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

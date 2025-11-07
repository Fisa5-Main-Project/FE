'use client';

import { Page, PageContent, PageActions, PageHeader } from '@/components/common/Page';
import Button from '@/components/common/Button';
import AmountInput from '@/components/common/AmountInput';
import { useAssetRouter } from '@/hooks/asset/useAssetRouter';
import { useLivingExpensesForm } from '@/hooks/asset/useLivingExpensesForm';

export default function LivingExpensesPage() {
    const { goTo } = useAssetRouter();
    const { amount, handleAmountChange, isNextDisabled } = useLivingExpensesForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isNextDisabled) return;
        // TODO: Save the amount to a state management solution
        console.log('Estimated Living Expenses:', amount);
        goTo('fixed-costs'); // Navigate to the next step
    };

    return (
        <Page>
            <form onSubmit={handleSubmit} className="flex flex-col flex-grow h-full">
                <PageContent>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-col gap-2">
                            <PageHeader>예상 생활비 (월)</PageHeader>
                            <p className="text-neutral-500 text-xl font-medium">매달 발생하는 기본 생활 비용입니다.</p>
                        </div>
                        <AmountInput
                            id="living-expenses"
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder="0"
                            aria-label="월 평균 예상 생활비"
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

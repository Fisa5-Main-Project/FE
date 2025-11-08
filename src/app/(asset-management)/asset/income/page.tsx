// app/(asset-management)/asset/income/page.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    Page,
    PageContent,
    PageActions,
    PageHeader,
} from '@/components/common/Page';
import Button from '@/components/common/Button';
import AmountInput from '@/components/common/AmountInput';
import { useIncomeForm } from '@/hooks/asset/useIncomeForm'; // 1. 새 훅 임포트

export default function IncomePage() {
    const router = useRouter();
    // 2. IncomeForm 훅 사용
    const { amount, handleAmountChange, isNextDisabled } = useIncomeForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isNextDisabled) return;

        // TODO: 상태 관리(Zustand 등)에 금액 저장
        console.log('Fixed Income:', amount);
        router.push('/asset/period'); // 3. 다음 스텝 (목표 기간)으로 이동
    };

    return (
        <Page>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col flex-grow h-full'
            >
                <PageContent>
                    <div className='flex flex-col gap-7'>
                        {/* 4. 헤더 텍스트 변경 */}
                        <div className='flex flex-col gap-2'>
                            <PageHeader>고정 소득 (월)</PageHeader>
                            <p className='text-neutral-500 text-xl font-medium'>
                                매달 고정 소득을 입력해주세요.
                            </p>
                        </div>

                        {/* 5. AmountInput 컴포넌트 재사용 */}
                        <AmountInput
                            id='fixed-income'
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder='0' // 6. placeholder 변경
                            aria-label='월 평균 고정 소득'
                        />
                    </div>
                </PageContent>
                <PageActions>
                    <Button
                        type='submit'
                        variant='primary'
                        disabled={isNextDisabled}
                    >
                        다음
                    </Button>
                </PageActions>
            </form>
        </Page>
    );
}

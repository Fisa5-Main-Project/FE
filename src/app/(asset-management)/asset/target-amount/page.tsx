// app/(asset-management)/asset/target-amount/page.tsx

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
import { useTargetAmountForm } from '@/hooks/asset/useTargetAmountForm'; // 1. 새 훅 임포트

export default function TargetAmountPage() {
    const router = useRouter();
    // 2. TargetAmountForm 훅 사용
    const { amount, handleAmountChange, isNextDisabled } =
        useTargetAmountForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isNextDisabled) return;

        // TODO: 상태 관리(Zustand 등)에 금액 저장
        console.log('Target Amount:', amount);
        // 3. 7단계의 마지막이므로 '구성중' 페이지로 이동
        router.push('/asset/building');
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
                            <PageHeader>목표 금액</PageHeader>
                            <p className='text-neutral-500 text-xl font-medium'>
                                달성하고 싶은 목표 금액을 입력해주세요.
                            </p>
                        </div>

                        {/* 5. AmountInput 컴포넌트 재사용 */}
                        <AmountInput
                            id='target-amount'
                            value={amount}
                            onChange={handleAmountChange}
                            placeholder='0' // 6. placeholder 변경
                            aria-label='달성 목표 금액'
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

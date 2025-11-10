'use client';

import { ChangeEvent } from 'react';
import { useAssetStore } from '@/stores/asset/useAssetStore';

const formatNumericValue = (value: string) => {
    return value.replace(/[^0-9]/g, '');
};

/**
 * '목표 금액' 페이지의 폼 로직(금액, 버튼 활성화)을 관리
 */
export function useTargetAmountForm() {
    const targetAmount = useAssetStore((state) => state.targetAmount);
    const setTargetAmount = useAssetStore((state) => state.setTargetAmount);

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const numericValue = formatNumericValue(e.target.value);
        const amountAsNumber = numericValue ? parseInt(numericValue, 10) : null;
        setTargetAmount(amountAsNumber);
    };

    // 금액이 비어있거나 0원이면 버튼 비활성화
    const isNextDisabled = !targetAmount || targetAmount <= 0;

    const amountAsString = targetAmount === null ? '' : String(targetAmount);

    return {
        amount: amountAsString,
        handleAmountChange,
        isNextDisabled,
    };
}

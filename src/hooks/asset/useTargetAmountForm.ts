// src/hooks/asset/useTargetAmountForm.ts

'use client';

import { useState, ChangeEvent } from 'react';

// 숫자 이외의 문자 제거
const formatNumericValue = (value: string) => {
    return value.replace(/[^0-9]/g, '');
};

/**
 * '목표 금액' 페이지의 폼 로직(금액, 버튼 활성화)을 관리합니다.
 */
export function useTargetAmountForm(initialValue: string = '') {
    const [amount, setAmount] = useState(initialValue);

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAmount(formatNumericValue(e.target.value));
    };

    // 금액이 비어있거나 0원이면 버튼 비활성화
    const isNextDisabled = !amount || parseInt(amount, 10) <= 0;

    return {
        amount,
        handleAmountChange,
        isNextDisabled,
    };
}

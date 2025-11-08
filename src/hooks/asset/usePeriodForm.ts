// src/hooks/asset/usePeriodForm.ts

'use client';

import { useState } from 'react';

/**
 * '목표 기간' 페이지의 폼 로직(기간, 버튼 활성화)을 관리합니다.
 * (수정: onValueChange 핸들러로 변경)
 */
export function usePeriodForm(initialValue: string = '') {
    const [period, setPeriod] = useState(initialValue);

    // Radix Select의 onValueChange에 직접 바인딩할 핸들러
    const handlePeriodChange = (value: string) => {
        setPeriod(value);
    };

    // 기간이 비어있으면 버튼 비활성화
    const isNextDisabled = !period;

    return {
        period,
        handlePeriodChange,
        isNextDisabled,
    };
}

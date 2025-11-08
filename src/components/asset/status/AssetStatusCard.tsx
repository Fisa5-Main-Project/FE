// src/components/asset/status/AssetStatusCards.tsx
// (기존 AssetStatusForm.tsx에서 수정)

'use client';

import React from 'react';
import StatusCard from '@/components/asset/status/StatusCard';
import { AssetStatusType } from '@/app/(asset-management)/asset/status/page';

interface AssetStatusCardsProps {
    selection: AssetStatusType | null;
    onSelect: (selection: AssetStatusType) => void;
}

/**
 * 은퇴/재직 선택 카드 UI
 * 이 컴포넌트는 PageActions를 포함하지 않습니다.
 */
export default function AssetStatusCards({
    selection,
    onSelect,
}: AssetStatusCardsProps) {
    return (
        // mb-[10rem]은 제거하거나 디자인에 맞게 mt (margin-top)로 조절합니다.
        <div className='flex justify-between gap-4 mt-8'>
            <StatusCard
                label='은퇴'
                imageSrc='/asset-management/retirement.png'
                isSelected={selection === 'retired'}
                onClick={() => onSelect('retired')}
                aria-pressed={selection === 'retired'}
            />
            <StatusCard
                label='재직'
                imageSrc='/asset-management/tenure.png'
                isSelected={selection === 'working'}
                onClick={() => onSelect('working')}
                aria-pressed={selection === 'working'}
            />
        </div>
    );
}

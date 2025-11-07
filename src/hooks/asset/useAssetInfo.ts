// src/hooks/asset/useAssetInfo.ts

'use client';

import { useRouter } from 'next/navigation';

/**
 * 자산 설계 정보 입력 페이지의 로직을 담당하는 훅입니다.
 * '다음' 버튼 클릭 시 다음 페이지로 이동하는 기능을 제공합니다.
 */
export function useAssetInfo() {
    const router = useRouter();

    const handleNext = () => {
        // 다음 스텝(예: 예상 생활비) 페이지로 이동합니다.
        router.push('/asset/living-expenses');
    };

    return { handleNext };
}

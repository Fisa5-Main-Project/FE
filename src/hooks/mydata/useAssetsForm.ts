import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useMyDataStore } from '@/stores/mydata/useMyDataStore';

/**
 * 자산 정보 폼 제출 로직을 담당하는 훅입니다.
 * DB 저장 API 호출 및 라우팅을 처리합니다.
 */
export const useAssetsForm = () => {
    const router = useRouter();
    // Zustand에서 assets 상태를 가져와 API 호출에 사용합니다.
    const assets = useMyDataStore(state => state.assets);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 제출 전 유효성 검사 (isNextButtonEnabled는 Page에서 처리)
        // if (!assets.realEstate || !assets.car) return; 

        // TODO: (API) 여기에 DB 저장 로직 (API 호출)이 들어갈 예정입니다.
        console.log('자산 정보 DB 저장 실행:', assets);

        // DB 저장 완료 후 이동할 최종 페이지 경로로 수정 예정입니다.
        router.push('/mydata');
    };

    const handleSkip = () => {
        // 건너뛰기 시 API 호출 없이 다음 페이지로 이동
        router.push('/mydata');
    };

    return { handleSubmit, handleSkip };
};
'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/auth/authStore';
import { getUserInfo } from '@/api/user';

interface AssetDetail {
    type: 'REAL_ESTATE' | 'SAVING' | 'INVESTMENT' | 'LOAN'; // ERD의 type을 기반으로 단순화
    balance: number; // 잔액
    percentage: number; // 총 자산 대비 비율 (계산될 값)
    icon: string; // UI 아이콘 경로 (예: /icons/real_estate.png)
    name: string; // 표시될 자산명
}

interface MainData {
    name: string;
    assetTotal: number | null;
    isMyDataRegistered: boolean;
    investmentTendency: string | null;
    assetDetails?: AssetDetail[];
}


/**
 * 메인 페이지에 필요한 사용자 데이터 및 마이데이터 연동 상태를 불러오는 훅입니다.
 */
export const useMainPageData = () => {
    // AuthStore에서 'isLoggedIn' 상태를 가져옴
    const isLoggedIn = useAuthStore(state => state.isLoggedIn);

    const [data, setData] = useState<MainData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 1. 로그인되어 있지 않으면 API 호출 방지
        if (!isLoggedIn) {
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            try {
                
                const response = await getUserInfo();

                if (response.isSuccess && response.data) {
                    const {
                        name,
                        assetTotal,
                        investmentTendency,
                        userMydataRegistration,
                    } = response.data;

                    // 2. UI 렌더링을 위해 API 응답 데이터를 로컬 상태에 직접 저장
                    setData({
                        name,
                        assetTotal: assetTotal,
                        isMyDataRegistered: userMydataRegistration,
                        investmentTendency: investmentTendency,
                        assetDetails: [], // TODO: API 연동 후 실제 자산 데이터로 교체 예정
                    });
                }


            } catch (error) {
                console.error("메인 페이지 데이터 로드 실패:", error);
                setData(null); // API 실패 시 데이터 null 처리
                // console.error("Mock 데이터 로드 실패 (논리 오류):", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [isLoggedIn]);

    return { data, isLoading };
};
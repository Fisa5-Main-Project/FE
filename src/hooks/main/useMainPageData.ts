'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/auth/authStore';
import { fetchMainPageDataApi } from '@/api/user';

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

/// 임시 Mock Data
const MOCK_DATA_CONNECTED = {
    name: "홍길동",
    asset_total: 42000000,
    user_mydata_registration: true, // 연동 완료 가정
    investment_tendency: "적극투자형",
    assetDetails: [
        { type: 'REAL_ESTATE', balance: 33600000, percentage: 60, icon: "/main/Estate.png", name: '부동산' },
        { type: 'SAVING', balance: 6720000, percentage: 30, icon: "/main/Saving.png", name: '적금' },
        { type: 'SAVING', balance: 6720000, percentage: 18, icon: "/main/Saving.png", name: '적금' },
        { type: 'INVESTMENT', balance: 1680000, percentage: 8, icon: "/main/Invest.png", name: '투자' },
        // ... 필요한 만큼 추가
    ]
};

// const MOCK_DATA_NOT_CONNECTED = {
//     name: "홍길동",
//     asset_total: null, // 자산 없음 가정
//     user_mydata_registration: false, // 연동 안 됨 가정
//     investment_tendency: null,
//     assetDetails: undefined,
// };

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
                
                const response = await fetchMainPageDataApi();

                if (response.isSuccess && response.data) {
                    const {
                        name,
                        asset_total,
                        user_mydata_registration,
                        investment_tendency
                    } = response.data;

                    // 2. UI 렌더링을 위해 API 응답 데이터를 로컬 상태에 직접 저장
                    setData({
                        name,
                        assetTotal: asset_total,
                        isMyDataRegistered: user_mydata_registration,
                        investmentTendency: investment_tendency,
                    });
                }
            

                //1. 500ms 지연 시간 시뮬레이션 (로딩 효과를 위해)
                // await new Promise(resolve => setTimeout(resolve, 500));

                // // 2. 연동 상태에 따른 Mock Data 선택 (테스트 편의를 위해 임의로 선택)
                // // const isConnected = false;
                // const isConnected = true;
                // // const mockResponseData = isConnected ? MOCK_DATA_CONNECTED : MOCK_DATA_NOT_CONNECTED;
                // const mockResponseData = MOCK_DATA_CONNECTED;

                // // 3. UI 렌더링을 위해 API 응답 데이터를 로컬 상태에 직접 저장
                // setData({
                //     name: mockResponseData.name,
                //     assetTotal: mockResponseData.asset_total,
                //     isMyDataRegistered: mockResponseData.user_mydata_registration,
                //     investmentTendency: mockResponseData.investment_tendency,
                //     assetDetails: mockResponseData.assetDetails as AssetDetail[],
                // });


            } catch (error) {
                // console.error("메인 페이지 데이터 로드 실패:", error);
                console.error("Mock 데이터 로드 실패 (논리 오류):", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [isLoggedIn]);

    return { data, isLoading };
};
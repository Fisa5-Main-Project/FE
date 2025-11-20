'use client'

import { useMainNavi } from "@/hooks/main/useMainNavi";
import { useMainPageData } from "@/hooks/main/useMainPageData";
import MainAssetUI from "@/components/main/MainAssetUI";
import MainConnectUI from "@/components/main/MainConnectUI";
import MainFeatureCards from "@/components/main/MainFeatureCards";

export default function Page() {
    const { data, isLoading } = useMainPageData();
    const { handleServiceNavigation } = useMainNavi();

    const bgGradientStyle = {
        background: 'linear-gradient(180deg, #CCE1FF 16.5%, #E0EDFF 50.48%, #FFF 79.28%, #FFF 100%)',
    };

    const navigationHandler = (path: string) => handleServiceNavigation(path);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">데이터를 불러오는 중입니다...</div>;
    }

    if (!data) {
        // API 실패 또는 인증 문제 처리
        return <div className="p-5 text-center text-red-600">사용자 정보를 불러올 수 없습니다.</div>;
    }

    return (
        <div className="flex flex-col flex-grow h-full" style={bgGradientStyle}>

            {/* 1. 조건부 UI 렌더링 */}
            <div className="flex-grow px-8 pt-[113px]">
                {data.isMyDataRegistered ? (
                    <MainAssetUI data={data} handleNavigation={navigationHandler} />
                ) : (
                    <MainConnectUI data={data} handleNavigation={navigationHandler} />
                )}
            </div>

            {/* 2. 하단 공통 서비스 버튼 영역 (공통 디자인 유지) */}
            <div className="w-full mt-1">
                <MainFeatureCards handleNavigation={navigationHandler} />
            </div>
        </div>
    );
}

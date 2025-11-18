'use client'

import Button from "@/components/common/Button";
import { useMainNavi, ASSET_SERVICE_PATH, PENSION_SERVICE_PATH } from "@/hooks/main/useMainNavi";
import { useMainPageData } from "@/hooks/main/useMainPageData";
import MainAssetUI from "@/components/main/MainAssetUI";
import MainConnectUI from "@/components/main/MainConnectUI";

export default function Page() {
    const { data, isLoading } = useMainPageData();
    const { handleServiceNavigation } = useMainNavi();


    const navigationHandler = (path: string) => handleServiceNavigation(path);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">데이터를 불러오는 중입니다...</div>;
    }

    if (!data) {
        // API 실패 또는 인증 문제 처리
        return <div className="p-5 text-center text-red-600">사용자 정보를 불러올 수 없습니다.</div>;
    }

    return (
        <div className="flex flex-col flex-grow h-full">

            {/* 1. 조건부 UI 렌더링 */}
            <div className="flex-grow">
                {data.isMyDataRegistered ? (
                    <MainAssetUI data={data} handleNavigation={navigationHandler} />
                ) : (
                    <MainConnectUI data={data} handleNavigation={navigationHandler} />
                )}
            </div>

            {/* 2. 하단 공통 서비스 버튼 영역 (공통 디자인 유지) */}
            <div className="w-full mt-8 space-y-3">

                {/* 연금 관리 */}
                <div className="p-4 bg-gray-100 rounded-xl flex justify-between items-center">
                    {/* ... (UI 상세는 이전 코드 참고) ... */}
                    <div>
                        <h3 className="font-bold text-base">연금 관리</h3>
                        <p className="text-sm text-gray-600">내 연금 금융을 확인하고 관리하기</p>
                    </div>
                    <Button onClick={() => navigationHandler(PENSION_SERVICE_PATH)} variant="secondary" className="w-auto px-4 py-2">
                        시작
                    </Button>
                </div>

                {/* 일자리 찾기 */}
                <div className="p-4 bg-gray-100 rounded-xl flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-base">일자리 찾기</h3>
                        <p className="text-sm text-gray-600">나와 어울리는 일자리를 찾아보세요!</p>
                    </div>
                    <Button onClick={() => navigationHandler('/jobs/search')} variant="secondary" className="w-auto px-4 py-2">
                        시작
                    </Button>
                </div>
            </div>
        </div>
    );
}

'use client';

import * as React from 'react';
import Button from "@/components/common/Button";
// import Image from 'next/image'; // 필요시 임포트

interface MainAssetUIProps {
    data: { name: string; assetTotal: number | null; investmentTendency: string | null };
    handleNavigation: (path: string) => void;
}

const ASSET_SERVICE_PATH = '/assets';

const MainAssetUI: React.FC<MainAssetUIProps> = ({ data, handleNavigation }) => (
    <div className="text-left space-y-6">
        <h1 className="text-2xl font-bold text-secondary">
            {data.name}님, 총 {data.assetTotal?.toLocaleString() || '???'}원의 자산이 있어요
        </h1>

        <p className="text-sm text-primary font-semibold mt-2">자산 자세히 보기</p>

        {/* 자산 상세 정보 영역 */}
        <div className="bg-white p-4 rounded-xl shadow-md space-y-4">
            {/* 부동산, 현금 등 아이콘 및 자산 비율 표시 (디자인상 가정) */}
            <div className="flex justify-around items-center">
                <div className="text-center">
                    {/*  */}
                    <p className="text-base font-medium">부동산 100%</p>
                </div>
                <div className="text-center">
                    
                    <p className="text-base font-medium">현금 100%</p>
                </div>
            </div>
            <Button onClick={() => handleNavigation(ASSET_SERVICE_PATH)}>
                내 자산 설계하기
            </Button>
        </div>
    </div>
);

export default MainAssetUI;
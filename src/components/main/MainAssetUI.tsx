'use client';

import * as React from 'react';
import Button from "@/components/common/Button";
// import Image from 'next/image'; // 필요시 임포트

interface MainAssetUIProps {
    data: { name: string; assetTotal: number | null; investmentTendency: string | null };
    handleNavigation: (path: string) => void;
}

const ASSET_SERVICE_PATH = '/asset';

const MainAssetUI: React.FC<MainAssetUIProps> = ({ data, handleNavigation }) => (
    <div className="w-full">
        <h1 className="text-[1.625rem] font-medium text-secondary leading-relaxed">
        <strong className="font-bold">{data.name}</strong>님,
            <br/>
            총 <strong className="font-bold">{data.assetTotal?.toLocaleString() || '???'}원</strong>의 
            <br/>
            자산이 있어요
        </h1>

        <p className="text-sm text-primary font-semibold mt-2">자산 자세히 보기</p>

        {/* 자산 상세 정보 영역 */}
        <div className="bg-white p-4 rounded-xl shadow-md space-y-4">
            
            <Button className="bg-white text-secondary"
            onClick={() => handleNavigation(ASSET_SERVICE_PATH)}>
                내 자산 설계하기
            </Button>
        </div>
    </div>
);

export default MainAssetUI;
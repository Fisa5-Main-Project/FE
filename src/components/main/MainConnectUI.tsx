'use client';

import * as React from 'react';
import Button from "@/components/common/Button";

interface MainConnectUIProps {
    data: { name: string };
    handleNavigation: (path: string) => void;
}

const MYDATA_CONNECT_PATH = '/mydata'; 

const MainConnectUI: React.FC<MainConnectUIProps> = ({ data, handleNavigation }) => (
    <div className="text-left space-y-6">
        <h1 className="text-2xl font-bold text-secondary">
            {data.name}님, 총 ???원의 자산이 있어요
        </h1>
        <p className="text-base text-gray-700 mt-2">
            내 자산을 연결하고 자산 관리 설계 받아보세요
        </p>
        
        {/* 이미지 영역 (디자인상 가정) */}
        <div className="my-8 flex justify-center">
            {/*  */}
        </div>
        
        {/* 버튼: 내 자산 연결하기 -> 마이데이터 연동 페이지로 이동 */}
        <Button onClick={() => handleNavigation(MYDATA_CONNECT_PATH)}>
            내 자산 연결하기
        </Button>
    </div>
);

export default MainConnectUI;
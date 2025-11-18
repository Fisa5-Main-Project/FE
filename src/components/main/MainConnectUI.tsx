'use client';

import * as React from 'react';

interface MainConnectUIProps {
    data: { name: string };
    handleNavigation: (path: string) => void;
}

const MYDATA_CONNECT_PATH = '/mydata';

const MainConnectUI: React.FC<MainConnectUIProps> = ({ data, handleNavigation }) => (
    <div className="w-full">
        <h1 className="text-[1.625rem] font-medium text-secondary leading-relaxed">
            <strong className="font-bold">{data.name}</strong>님,
            <br/>
            총 <strong className="font-bold">???원</strong>의 
            <br/>
            자산이 있어요
        </h1>
        <p className="text-base text-gray-700 mt-2">
            내 자산을 연결하고 자산 관리 설계 받아보세요
        </p>

        {/* 이미지 영역 (디자인상 가정) */}
        <div className="flex">
            <img
                src="/main/ConnectMascot.png"
                className="w-[226px] h-auto cursor-pointer"
                onClick={() => handleNavigation(MYDATA_CONNECT_PATH)}
                alt="내 자산 연결하기"
            />
        </div>
    </div>
);

export default MainConnectUI;
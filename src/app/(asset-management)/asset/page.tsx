'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function AssetManagementStartPage() {
  const router = useRouter();

  const handleConfirm = () => {
    // 다음 단계인 자산 설계 정보 입력 페이지로 이동
    router.push('/asset/info');
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-white via-blue-100 to-white rounded-[44px] overflow-hidden p-4">
      <div className="w-full max-w-md relative h-full">
        {/* Content Area */}
        <div className="w-full px-4 py-8">
          <div className="mt-20"> {/* Adjust top margin as needed */}
            <span className="text-navygray text-4xl font-bold font-['Pretendard']">양유진</span>
            <span className="text-navygray text-3xl font-medium font-['Pretendard']">
              님의
              <br />
              든든한 노후,
              <br />
              저희가 책임지고 설계합니다.
            </span>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="absolute bottom-8 left-0 right-0 px-4">
          <button
            onClick={handleConfirm}
            className="w-full h-12 p-2.5 bg-blue rounded-xl inline-flex items-center justify-center gap-2.5 min-h-10"
          >
            <span className="text-white text-xl font-semibold font-['Pretendard']">확인</span>
          </button>
        </div>
      </div>
    </div>
  );
}

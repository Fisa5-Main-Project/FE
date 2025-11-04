'use client'; // 'use client'로 전환해야 합니다.

import React, { useEffect } from 'react';
import { useMyDataStore } from '@/hooks/mydata/useMyDataStore';

const MyDataLayout = ({ children }: { children: React.ReactNode }) => {
  const { setUserName } = useMyDataStore();
  useEffect(() => {
    // 임시로 사용자 이름을 '홍길동'으로 설정합니다.
    // 향후 실제 사용자 정보를 가져오는 로직으로 대체해야 합니다.
    setUserName('홍길동');
  }, [setUserName]);

  return (
    <div className="page-container h-full rounded-[44px] overflow-hidden">
      {children}
    </div>
  );
};

export default MyDataLayout;
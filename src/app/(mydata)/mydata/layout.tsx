'use client';

import React, { useEffect } from 'react';
import { MyDataProvider, useMyDataContext } from '@/context/MyDataContext';

/**
 * 마이데이터 페이지들에 공통 Context를 제공하고,
 * 초기 사용자 정보를 설정하는 역할을 합니다.
 */
const MyDataLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { dispatch } = useMyDataContext();

  useEffect(() => {
    // 실제 앱에서는 여기서 서버 세션이나 API를 통해 사용자 정보를 가져와 설정합니다.
    // 임시로 사용자 이름을 '홍길동'으로 설정합니다.
    dispatch({ type: 'SET_USER_NAME', payload: '홍길동' });
  }, [dispatch]);

  return (
    <div className="page-container h-full rounded-[44px] overflow-hidden">
      {children}
    </div>
  );
};

/**
 * 마이데이터 플로우의 최상위 레이아웃입니다.
 * MyDataProvider로 전체를 감싸 상태 관리 컨텍스트를 제공합니다.
 */
const MyDataLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MyDataProvider>
      <MyDataLayoutContent>{children}</MyDataLayoutContent>
    </MyDataProvider>
  );
};

export default MyDataLayout;
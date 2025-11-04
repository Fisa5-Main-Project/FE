'use client';

import { useEffect } from 'react';
import { useMyDataStore } from '@/hooks/mydata/useMyDataStore';
import LoadingStep from '@/components/mydata/steps/LoadingStep';

/**
 * 마이데이터 연동 - 로딩 페이지
 */
export default function LoadingPage() {
  const { setUserName } = useMyDataStore();
  useEffect(() => {
    setUserName('홍길동');
  }, [setUserName]);

  return <LoadingStep />;
}

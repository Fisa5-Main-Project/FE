'use client';

import { useEffect } from 'react';
import { useMyDataStore } from '@/hooks/mydata/useMyDataStore';
import CheckStep from '@/components/mydata/steps/CheckStep';

/**
 * 마이데이터 연동 - 확인 단계 페이지
 */
export default function CheckPage() {
  const { setUserName } = useMyDataStore();
  useEffect(() => {
    setUserName('홍길동');
  }, [setUserName]);

  return <CheckStep />;
}

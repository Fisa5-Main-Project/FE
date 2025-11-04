'use client';

import { useEffect } from 'react';
import { useMyDataStore } from '@/hooks/mydata/useMyDataStore';
import AssetsStep from '@/components/mydata/steps/AssetsStep';

/**
 * 마이데이터 연동 - 자산 연결 페이지
 */
export default function AssetsPage() {
  const { setUserName } = useMyDataStore();
  useEffect(() => {
    setUserName('홍길동');
  }, [setUserName]);

  return <AssetsStep />;
}

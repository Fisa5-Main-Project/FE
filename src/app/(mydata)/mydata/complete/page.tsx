'use client';

import { useEffect } from 'react';
import { useMyDataStore } from '@/hooks/mydata/useMyDataStore';
import CompleteStep from '@/components/mydata/steps/CompleteStep';

/**
 * 마이데이터 연동 - 완료 페이지
 */
export default function CompletePage() {
  const { setUserName } = useMyDataStore();
  useEffect(() => {
    setUserName('홍길동');
  }, [setUserName]);

  return <CompleteStep />;
}

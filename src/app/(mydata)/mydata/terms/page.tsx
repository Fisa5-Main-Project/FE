'use client';

import { useEffect } from 'react';
import { useMyDataStore } from '@/hooks/mydata/useMyDataStore';
import TermsStep from '@/components/mydata/steps/TermsStep';

/**
 * 마이데이터 연동 - 약관 상세 페이지
 */
export default function TermsPage() {
  const { setUserName } = useMyDataStore();
  useEffect(() => {
    setUserName('홍길동');
  }, [setUserName]);

  return <TermsStep />;
}

'use client';

import { useEffect } from 'react';
import { useMyDataStore } from '@/hooks/mydata/useMyDataStore';
import AdditionalInfoStep from '@/components/mydata/steps/AdditionalInfoStep';

/**
 * 마이데이터 연동 - 추가 정보 입력 페이지
 */
export default function AdditionalInfoPage() {
  const { setUserName } = useMyDataStore();
  useEffect(() => {
    setUserName('홍길동');
  }, [setUserName]);

  return <AdditionalInfoStep />;
}

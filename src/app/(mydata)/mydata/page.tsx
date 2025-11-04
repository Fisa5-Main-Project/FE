'use client';

import { useEffect } from 'react';
import type { Metadata } from 'next';
import { useMyDataStore } from '@/hooks/mydata/useMyDataStore';
import AgreementStep from '@/components/mydata/steps/AgreementStep';

// SEO 최적화: Metadata API를 사용하여 페이지 메타데이터를 정의합니다.
// 클라이언트 컴포넌트에서는 generateMetadata를 사용할 수 없으므로, 
// 필요하다면 상위 layout.tsx에서 동적으로 처리하거나 정적으로 정의해야 합니다.
// 여기서는 주석으로 남겨두지만, 실제 구현에서는 layout.tsx로 옮기는 것을 권장합니다.
/*
export const metadata: Metadata = {
  title: '마이데이터 연동 동의',
  description: '마이데이터 연동을 위해 약관에 동의해주세요.',
};
*/

/**
 * 마이데이터 플로우의 시작 페이지 (클라이언트 컴포넌트)
 * - 사용자가 /mydata 경로로 접근 시, 첫 번째 단계인 약관 동의 컴포넌트를 렌더링합니다.
 */
export default function MyDataFlowStartPage() {
  // 서버에서 가져온 사용자 이름을 Zustand 스토어에 설정합니다.
  const { setUserName } = useMyDataStore();
  useEffect(() => {
    // 임시로 사용자 이름을 '홍길동'으로 설정합니다.
    setUserName('홍길동');
  }, [setUserName]);

  return <AgreementStep />;
}

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
// Context/Hook 관련 파일 경로 확인
import { MyDataProvider } from '@/context/MyDataContext';
import { useInitialUserData } from '@/hooks/mydata/useInitialUserData';
import AgreementStep from '@/components/mydata/steps/AgreementStep';
import Button from '@/components/common/Button';

// SEO 최적화: Metadata API를 클라이언트 컴포넌트에서 직접 사용할 수 없으므로,
// 메타데이터는 상위 layout.tsx에서 관리하는 것이 좋습니다.

/**
 * 마이데이터 플로우의 시작 페이지 (클라이언트 컴포넌트)
 * - 사용자가 /mydata 경로로 접근 시, 첫 번째 단계인 약관 동의 컴포넌트를 렌더링합니다.
 * - 상태 설정 로직은 상위 layout.tsx로 이전되었습니다.
 */

const MyDataFlowContent = () => {
  const router = useRouter();

  // 💡 Hooks 호출: Context가 제공된 후 초기 데이터 로딩 시작
  useInitialUserData();

  const handleNext = () => {
    router.push('/mydata/check');
  };

  return (
    // 레이아웃: 하단 고정 및 디자인 패딩 적용
    <div className="flex flex-col flex-grow h-full">

      <div className="flex-grow">
        <AgreementStep />
      </div>

      <div className="flex-shrink-0">
        <Button onClick={handleNext}>확인</Button>
      </div>
    </div>
  );
}

export default function MyDataStartPage() {
  return (
    // Context Provider로 MyDataFlowContent를 감싸 Hooks 규칙을 준수
    <MyDataProvider>
      <MyDataFlowContent />
    </MyDataProvider>
  );
}



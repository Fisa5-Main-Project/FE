'use client';

import { useParams } from 'next/navigation';
import { useMyDataStore } from '@/hooks/mydata/useMyDataStore';

// 각 단계에 해당하는 컴포넌트들을 import 합니다.
import AgreementStep from '@/components/mydata/steps/AgreementStep';
import CheckStep from '@/components/mydata/steps/CheckStep';
import TermsStep from '@/components/mydata/steps/TermsStep';
import LoadingStep from '@/components/mydata/steps/LoadingStep';
import CompleteStep from '@/components/mydata/steps/CompleteStep';
import AdditionalInfoStep from '@/components/mydata/steps/AdditionalInfoStep';
import AssetsStep from '@/components/mydata/steps/AssetsStep';
import { useEffect } from 'react';

/**
 * 마이데이터 연동 동적 라우팅 페이지입니다.
 * URL의 [step] 파라미터에 따라 적절한 단계 컴포넌트를 렌더링합니다.
 */
export default function MyDataStepPage() {
  const params = useParams();
  const step = params.step as string;

  // 서버에서 가져온 사용자 이름을 Zustand 스토어에 설정합니다.
  // 실제 앱에서는 layout.tsx 등에서 서버 세션을 확인하고 스토어에 주입하는 것이 좋습니다.
  const { setUserName } = useMyDataStore();
  useEffect(() => {
    // 임시로 사용자 이름을 '홍길동'으로 설정합니다.
    setUserName('홍길동');
  }, [setUserName]);


  const renderStepComponent = () => {
    switch (step) {
      case 'agreement':
        return <AgreementStep />;
      case 'check':
        return <CheckStep />;
      case 'terms':
        return <TermsStep />;
      case 'loading':
        return <LoadingStep />;
      case 'complete':
        return <CompleteStep />;
      case 'additional':
        return <AdditionalInfoStep />;
      case 'assets':
        return <AssetsStep />;
      default:
        // 잘못된 step 파라미터의 경우, 404 페이지 또는 첫 단계로 리디렉션 처리
        return <div>잘못된 접근입니다.</div>;
    }
  };

  return <div className="h-full">{renderStepComponent()}</div>;
}

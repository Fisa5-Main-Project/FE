'use client';

import CompleteStep from '@/components/mydata/steps/CompleteStep';
import Button from '@/components/common/Button';
import { useMyDataConnectStatus } from '@/hooks/mydata/useMydataConnectStatus'

/**
 * 마이데이터 연동 - 완료 페이지
 */
export default function CompletePage() {
  const NEXT_PATH = '/mydata/additional'; 
    const { completeConnectionFlow } = useMyDataConnectStatus(NEXT_PATH);

  const handleNext = () => {
    completeConnectionFlow();
  };

  return (
    <div className="flex flex-col flex-grow h-full">
      
      <div className="flex-grow">
        <CompleteStep onNext={handleNext} />
      </div>

      <div className="flex-shrink-0">
        <Button onClick={handleNext}>
          다음
        </Button>
      </div>
    </div>

  );
}

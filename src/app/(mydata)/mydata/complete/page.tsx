'use client';

import CompleteStep from '@/components/mydata/steps/CompleteStep';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

/**
 * 마이데이터 연동 - 완료 페이지
 */
export default function CompletePage() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/mydata/additional');
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

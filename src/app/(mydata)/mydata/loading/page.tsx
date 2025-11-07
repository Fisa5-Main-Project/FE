'use client';

import LoadingStep from '@/components/mydata/steps/LoadingStep';
import { useRouter } from 'next/navigation';

/**
 * 마이데이터 연동 - 로딩 페이지
 */
export default function LoadingPage() {
  const router = useRouter();

  // 로딩 완료 후 다음 페이지로 이동
  const handleLoadingComplete = () => {
    //router.push('/mydata/complete');
  };

  return (
    <div className="h-full px-[2.8125rem] pb-[3.65rem]">
      <LoadingStep onComplete={handleLoadingComplete}/>
    </div>
);
}

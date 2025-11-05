'use client';

import { useRouter } from 'next/navigation';
import AssetsStep from '@/components/mydata/steps/AssetsStep';

/**
 * 마이데이터 연동 - 자산 연결 페이지
 */
export default function AssetsPage() {
  const router = useRouter();

  const handleNext = () => {
    // TODO: 마이데이터 연동 완료 후 이동할 최종 페이지 경로로 수정해주세요.
    router.push('/');
  };

  return <AssetsStep onNext={handleNext} />;
}

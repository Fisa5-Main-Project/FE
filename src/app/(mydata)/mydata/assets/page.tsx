'use client';

import { useRouter } from 'next/navigation';
import AssetsStep from '@/components/mydata/steps/AssetsStep';
import Button from '@/components/common/Button';
import { useMyDataStore } from '@/stores/mydata/useMyDataStore';

/**
 * 마이데이터 연동 - 자산 연결 페이지
 */

export default function AssetsPage() {
  const router = useRouter();
  const assets = useMyDataStore(state => state.assets);

  const isNextButtonEnabled = assets.realEstate !== '' && assets.car !== '';

  const handleNext = () => {
    // TODO: 마이데이터 연동 완료 후 이동할 최종 페이지 경로로 수정해주세요.
    router.push('/mydata');
  };

  const handleSkip = () => {
    router.push('/'); // 동일 페이지로 이동하거나 다른 라우트 사용
  };

  return (
    <div className="flex flex-col flex-grow h-full">

      <div className="flex-grow">
        <AssetsStep />
      </div>

      <div className="flex-shrink-0">
        <Button onClick={handleSkip}>
          건너뛰기
        </Button>
        <div className="mt-2.5">
          <Button onClick={handleNext} disabled={!isNextButtonEnabled}>
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useMyDataStore } from '@/hooks/mydata/useMyDataStore';
import Button from '@/components/common/Button';

/**
 * 마이데이터 연동 동의 단계 컴포넌트 (수정됨)
 * - 'use client': useRouter, useMyDataStore 훅을 사용합니다.
 * - 상태관리: props 대신 Zustand 스토어에서 직접 상태(userName)를 가져옵니다.
 * - 라우팅: 버튼 클릭 시 useRouter를 통해 다음 페이지로 이동합니다.
 */
const AgreementStep = () => {
  const router = useRouter();
  const { userName } = useMyDataStore();

  const handleNext = () => {
    router.push('/mydata/check');
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="mt-20">
        <h1 className="text-3xl leading-relaxed md:text-4xl">
          서비스 이용을 위해
          <br />
          {/* 스토어에서 가져온 userName을 사용, 로딩 중일 경우 대비 */}
          <strong className="font-bold text-4xl md:text-5xl">
            {userName || '...'}
          </strong>
          님의
          <br />
          정보를 불러올게요
        </h1>
      </div>
      <div className="w-full">
        <Button onClick={handleNext} >
          확인
        </Button>
      </div>
    </div>
  );
};

export default AgreementStep;

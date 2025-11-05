'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';

/**
 * 추가 정보 입력 안내 단계 컴포넌트 (수정됨)
 * - 라우팅: 버튼 클릭 시 useRouter를 통해 다음 페이지로 이동합니다.
 */
const AdditionalInfoStep = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="mt-[81px]">
        <h1 className="text-[28px] leading-relaxed text-secondary">
          정확한 서비스 제공을 위해
          <br />
          마이데이터로 연동되지 않는
          <br />
          <strong className="font-bold">
            추가 정보
          </strong>
          를 입력해주세요.
        </h1>
      </div>
      <div className="w-full">
        <Button onClick={() => router.push('/mydata/assets')} >
          정보 추가로 입력하기
        </Button>
      </div>
    </div>
  );
};

export default AdditionalInfoStep;

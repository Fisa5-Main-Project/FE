'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';

/**
 * 마이데이터 서비스 가입 여부 확인 단계 컴포넌트 (수정됨)
 */
const CheckStep = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold md:text-3xl">
          마이데이터
          <br />
          서비스에 가입하셨나요?
        </h1>
        <p className="mt-4 text-gray-600 leading-relaxed">
          마이데이터란, 여러 금융기관에 흩어져 있는
          <br />
          내 모든 금융 정보를 한곳에 모아
          <br />
          편리하게 관리하는 서비스입니다.
        </p>
      </div>
      <div className="w-full flex flex-col gap-2">
        {/* '이용안내' 버튼 클릭 시, 관련 정보 페이지로 이동 (예시) */}
        <Button onClick={() => router.push('/mydata')} >
          이용 안할래요
        </Button>
        {/* '가입하기' 버튼 클릭 시, 다음 단계인 'terms' 페이지로 이동 */}
        <Button 
          onClick={() => router.push('/mydata/terms')} 
        >
          마이데이터 서비스 가입하기
        </Button>
      </div>
    </div>
  );
};

export default CheckStep;

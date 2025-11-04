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
      <div className="mt-[78px]">
        <h1 className="text-[32px] font-bold">
          마이데이터
          <br />
          서비스에 가입하셨나요?
        </h1>
        <p className="mt-4 text-[20px] text-[#6F6F6F]">
          마이데이터란, 여러 금융기관에 흩어져 있는 <br/>
          내 모든 금융 정보를 한곳에 모아 편리하게 <br/>
          관리하는 서비스입니다.
        </p>
      </div>

      <div className="mt-auto"> {/* mt-auto를 사용하여 항상 하단에 가깝게 배치 */}
        <p className="text-base text-[16px] text-[#6F6F6F] mb-2.5 text-center"> {/* 버튼과의 간격을 위해 mb-6 추가 */}
          해당 서비스는 마이데이터 가입 후 이용할 수 있습니다.
        </p>

        <div className="w-full flex flex-col gap-2">
          {/* '이용 안할래요' 버튼 클릭 시, 첫 단계인 'mydata' 페이지로 이동 */}
          <Button onClick={() => router.push('/mydata')} variant="secondary">
            이용 안 할래요
          </Button>
          {/* '가입하기' 버튼 클릭 시, 다음 단계인 'terms' 페이지로 이동 */}
          <Button 
            onClick={() => router.push('/mydata/terms')} 
          >
            마이데이터 서비스 가입하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckStep;

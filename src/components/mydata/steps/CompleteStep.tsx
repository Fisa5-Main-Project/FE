'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/common/Button';

/**
 * 마이데이터 정보 연동 완료 단계 컴포넌트 (수정됨)
 * - 라우팅: 버튼 클릭 시 useRouter를 통해 다음 페이지로 이동합니다.
 */
const CompleteStep = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full text-center justify-between">

      <div className="w-full">

        {/*제목 레이블 박스*/}
        <div className="mt-[93px] flex justify-center">
          <div className="flex items-center justify-center w-[172px] h-[41px] bg-[#C6DCFF] rounded-full">
            <p className="text-base font-semibold text-[#0064FF]">
              내 정보를 불러왔어요!
            </p>
          </div>
        </div>

        <div className="mb-[28px]"></div>

        <div className="flex justify-center mt-0">
          <Image
            src="/mydata/complete.png"
            alt="마이데이터 연동 완료"
            width={248}
            height={248}
            priority
          />
        </div>
      </div>
      
      <div className="w-full">
        <Button onClick={() => router.push('/mydata/additional')} >
          다음
        </Button>
      </div>
    </div>
  );
};

export default CompleteStep;

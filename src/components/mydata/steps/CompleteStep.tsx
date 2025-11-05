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
      <div className="mt-20">
        <h1 className="text-2xl font-bold md:text-3xl">내 정보를 불러왔어요!</h1>
      </div>
      <div className="my-8 flex justify-center">
        <Image 
          src="/mydata/complete.png" 
          alt="마이데이터 연동 완료" 
          width={192} 
          height={192}
          priority 
        />
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

"use client";

import React from "react";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

export default function ProfileIntroPage() {
  const router = useRouter();

  /**
   * '다음' 버튼 클릭 핸들러
   * 다음 단계인 자금 운용 성향 페이지로 이동합니다.
   */
  const handleNext = () => {
    router.push("/signup/profile/financial");
  };

  return (
    // Sticky Footer 레이아웃 컨벤션
    <form
      className="flex flex-col flex-grow h-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleNext();
      }}
    >
      {/* 메인 컨텐츠 영역 (flex-grow) */}
      <div className="flex-grow">
        {/*
          [제목]
          - text-secondary (var(--color-secondary))
          - text-[2rem] (var(--font-size-2rem))
          - font-bold (700)
        */}
        <h1 className="text-secondary text-[2rem] font-bold">
          맞춤형 자산관리 설계
        </h1>

        {/*
          [소제목]
          - text-subheading (var(--color-subheading))
          - text-[1.375rem] (var(--font-size-1\.375rem))
          - font-medium (500)
          - [수정] mt-[24px] -> mt-2 (0.5rem)
        */}
        <p className="text-subheading text-[1.375rem] font-medium mt-2 leading-[32px]">
          더 꼼꼼한 자산 관리를 위해
          <br />
          <strong className="font-bold">자금 운용 성향</strong>과
          <br />
          <strong className="font-bold">은퇴 후 희망하시는 삶의 키워드</strong>
          를
          <br />
          알려주세요.
        </p>
      </div>

      {/* 하단 고정 버튼 영역 (flex-shrink-0) */}
      <div className="flex-shrink-0">
        <Button
          type="submit"
          variant="primary"
          disabled={false} // 활성화 상태
        >
          다음
        </Button>
      </div>
    </form>
  );
}

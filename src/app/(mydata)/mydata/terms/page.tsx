'use client';

import { useRouter } from 'next/navigation';
import { MyDataProvider, useMyDataContext } from '@/context/MyDataContext'; // Provider 임포트
import TermsStep from '@/components/mydata/steps/TermsStep';
import Button from '@/components/common/Button';
import React from 'react';

/**
 * 마이데이터 연동 - 약관 상세 페이지
 */
const TermsPageContent = () => {
  const router = useRouter();

  const { state } = useMyDataContext();
  const agreements = state.agreements;

  const isNextDisabled = agreements.some(a => a.required && !a.isChecked);

  const handleNext = () => {
    router.push('/mydata/loading');
  };

  return (
    // ✅ 페이지 레이아웃: 패딩 및 하단 고정 적용
    <div className="flex flex-col flex-grow h-full">

      {/* 1. 콘텐츠 영역 (TermsStep) */}
      <div className="flex-grow">
        <TermsStep />
      </div>

      {/* 2. 하단 고정 버튼 영역 */}
      <div className="flex-shrink-0">
        {/* ⚠️ Context가 page.tsx에서 제공되지 않으면 useMyDataContext는 오류를 일으킵니다. */}
        <Button onClick={handleNext} disabled={isNextDisabled}>
          다음
        </Button>
      </div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <MyDataProvider>
      <TermsPageContent />
    </MyDataProvider>
  );
}

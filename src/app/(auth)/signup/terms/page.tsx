"use client";

import * as React from "react";
import Button from "@/components/common/Button";
import { useTermsForm } from "@/hooks/auth/useTermsForm";
import TermsAgreementForm from '@/components/common/TermsAgreementForm';


export default function TermsPage() {
  const { terms, checkedTerms, isNextDisabled, isAllChecked, handlers } =
    useTermsForm();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 훅이 가진 제출 로직 (DB 저장/라우팅) 실행
    handlers.handleSubmit(e);
  };

  const title = (
    <h1 className="mt-19.5 text-[2rem] font-medium text-secondary whitespace-pre-line">
      {"만나서 반가워요 :)\n"}
      <span className="font-bold">가입약관</span>
      {"을 확인해주세요"}
    </h1>
  );

  return (
    <form
      className="flex flex-col flex-grow h-full"
      onSubmit={handleSubmit}
    >

      <div className="flex-grow">
        <TermsAgreementForm
          terms={terms}
          checkedTerms={checkedTerms}
          isAllChecked={isAllChecked}
          handlers={{
            handleCheckAll: handlers.handleCheckAll,
            handleCheckTerm: handlers.handleCheckTerm
          }}
          titleComponent={title}
          baseLinkPath="/signup/terms"
        />
      </div>

      {/* 하단 버튼 영역 */}
      <div className="flex-shrink-0 mt-20">
        <Button type="submit" disabled={isNextDisabled}>
          다음
        </Button>
      </div>
    </form>
  );
}

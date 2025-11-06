"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Check } from "lucide-react";

import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import { useTermsForm } from "@/hooks/auth/useTermsForm";

export default function TermsPage() {
  const { terms, checkedTerms, isNextDisabled, isAllChecked, handlers } =
    useTermsForm();

  return (
    <form
      className="flex flex-col flex-grow h-full"
      onSubmit={handlers.handleSubmit}
    >
      {/* 상단 고정 헤더 */}
      <h1 className="mt-19.5 text-[2rem] font-medium text-secondary whitespace-pre-line">
        {"만나서 반가워요 :)\n"}
        <span className="font-bold">가입약관</span>
        {"을 확인해주세요"}
      </h1>
      <div className="flex-grow">
        {/* 전체 동의 섹션*/}
        <div className="mt-9">
          <div className="flex items-start">
            <Checkbox
              id="all-terms"
              checked={isAllChecked}
              onCheckedChange={handlers.handleCheckAll}
            />
            <label htmlFor="all-terms" className="ml-3 cursor-pointer">
              <div className="font-bold text-secondary text-[1.25rem]">
                전체 동의
              </div>
              <div className="pt-[0.625rem] text-sm text-gray-2 text-[1rem]">
                선택 항목을 포함하여 모두 동의합니다.
              </div>
            </label>
          </div>
          <div className="mt-2 pb-2 border-b border-gray-1"></div>
        </div>

        {/* 개별 약관 리스트 */}
        <div className="mt-9 space-y-4">
          {terms.map((term) => (
            <div key={term.id} className="flex items-center">
              <Checkbox
                id={`term-${term.id}`}
                checked={checkedTerms.has(term.id)}
                onCheckedChange={(checked) =>
                  handlers.handleCheckTerm(term.id, !!checked)
                }
              />
              <label
                htmlFor={`term-${term.id}`}
                className="ml-3 cursor-pointer text-[1.25rem] text-secondary"
              >
                {term.required ? (
                  <span className="text-primary">(필수)</span>
                ) : (
                  <span>(선택)</span>
                )}
                <span> {term.text}</span>
              </label>

              <Link href={`/signup/terms/${term.id}`} className="ml-auto">
                <ChevronRight className="h-5 w-5 text-gray-2" />
              </Link>
            </div>
          ))}
        </div>
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

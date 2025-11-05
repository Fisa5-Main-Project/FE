"use client";

// Checkbox 컴포넌트에 필요한 import들을 page.tsx 상단에 추가합니다.
import * as React from "react";
import Link from "next/link";
import { ChevronRight, Check } from "lucide-react"; // Check 아이콘 추가
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"; // Radix UI 추가
import { twMerge } from "tailwind-merge"; // twMerge 추가
import clsx from "clsx"; // clsx 추가

import Button from "@/components/common/Button";
// import Checkbox from "@/components/common/Checkbox"; // 👈 이 줄을 삭제합니다.
import { useTermsForm } from "@/hooks/auth/useTermsForm";

// --- 1. Checkbox 컴포넌트 코드를 여기에 직접 정의 ---
// (export default 대신 const로 선언)
const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={twMerge(
      clsx(
        "h-6 w-6 shrink-0 rounded-full border", // 기본 스타일 (24x24, 원형)
        "border-gray-1 bg-white", // 비활성 상태
        "ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2", // 포커스
        "data-[state=checked]:bg-primary data-[state=checked]:text-white data-[state=checked]:border-primary", // 체크 상태
        "data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-white data-[state=indeterminate]:border-primary", // 중간 상태
        className
      )
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;
// --- Checkbox 정의 끝 ---

// --- 2. TermsPage 컴포넌트 (기존과 동일) ---
export default function TermsPage() {
  const { terms, checkedTerms, isNextDisabled, isAllChecked, handlers } =
    useTermsForm();

  return (
    <form
      className="flex flex-col flex-grow h-full"
      onSubmit={handlers.handleSubmit}
    >
      {/* 1. 상단 고정 헤더 */}
      <h1 className="mt-19.5 text-[2rem] font-medium text-secondary whitespace-pre-line">
        {"만나서 반가워요 :)\n"}
        <span className="font-bold">가입약관</span>
        {"을 확인해주세요"}
      </h1>

      {/* 2. 컨텐츠 영역 (flex-grow) */}
      <div className="flex-grow">
        {/* 전체 동의 섹션 (mt-9) */}
        <div className="mt-9">
          <div className="flex items-start">
            {/* 이제 이 Checkbox는 파일 상단에 정의된 로컬 컴포넌트를 사용합니다. */}
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

          {/* 회색 라인 */}
          <div className="mt-2 pb-2 border-b border-gray-1"></div>
        </div>

        {/* 개별 약관 리스트 (mt-9) */}
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
                  // (필수)는 text-primary (파란색)
                  <span className="text-primary">(필수)</span>
                ) : (
                  // (선택)은 부모의 text-secondary (회색)
                  <span>(선택)</span>
                )}
                {/* 약관 텍스트는 항상 text-secondary */}
                <span> {term.text}</span>
              </label>

              <Link href={`/signup/terms/${term.id}`} className="ml-auto">
                <ChevronRight className="h-5 w-5 text-gray-2" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 3. 하단 버튼 영역 (mt-20) */}
      <div className="flex-shrink-0 mt-20">
        <Button type="submit" disabled={isNextDisabled}>
          다음
        </Button>
      </div>
    </form>
  );
}

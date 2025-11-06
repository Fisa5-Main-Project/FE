"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import { RETIREMENT_CATEGORIES } from "./retirement.constants";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const MAX_SELECTION_LIMIT = 5;

export default function RetirementPage() {
  const router = useRouter();
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  // 키워드가 선택되었는지 확인
  const isSelected = React.useCallback(
    (keyword: string) => selectedKeywords.includes(keyword),
    [selectedKeywords]
  );

  // 키워드 선택/해제 핸들러
  const handleSelectKeyword = React.useCallback((keyword: string) => {
    setSelectedKeywords((prev) => {
      if (prev.includes(keyword)) {
        // 이미 선택됨 -> 선택 해제
        return prev.filter((k) => k !== keyword);
      } else {
        // 새 선택 -> 5개 미만일 때만 추가
        if (prev.length < MAX_SELECTION_LIMIT) {
          return [...prev, keyword];
        }
        // 5개일 경우, 추가하지 않고 현재 상태 유지
        return prev;
      }
    });
  }, []);

  const handleNext = () => {
    // TODO: (API) selectedKeywords 배열 서버로 전송
    console.log("선택된 키워드:", selectedKeywords);
    router.push("/");
  };

  const isDisabled = selectedKeywords.length === 0;

  return (
    <form
      className="flex flex-col flex-grow h-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (!isDisabled) {
          handleNext();
        }
      }}
    >
      {/* 메인 컨텐츠 영역 */}
      <div className="flex-grow">
        <h1 className="text-secondary text-[2rem] font-bold">
          은퇴 후 희망 키워드
        </h1>
        <p className="text-subheading text-[1.375rem] font-medium mt-2">
          은퇴후 어떤 삶을 그리고 계신가요 ?
        </p>
        <p className="text-subheading text-[1rem] font-medium mt-8">
          최대 {MAX_SELECTION_LIMIT}개의 키워드를 고를 수 있어요!
        </p>

        {/* 카테고리 묶음*/}
        <div className="mt-4 mb-16">
          {RETIREMENT_CATEGORIES.map((category, index) => (
            <div key={category.title} className={index > 0 ? "mt-8" : ""}>
              <h3 className="text-secondary text-[1.5rem] font-semibold">
                {category.title}
              </h3>

              {/* 칩 버튼 묶음*/}
              <div className="flex flex-wrap gap-2.5 mt-3">
                {category.keywords.map((keyword) => {
                  const selected = isSelected(keyword);
                  return (
                    <button
                      key={keyword}
                      type="button"
                      onClick={() => handleSelectKeyword(keyword)}
                      className={twMerge(
                        clsx(
                          "p-2.5 justify-center items-center rounded-3xl border whitespace-nowrap transition-colors cursor-pointer",
                          selected
                            ? "bg-[#E6F4FF] text-primary border-primary/20"
                            : "bg-white text-secondary border-gray-1"
                        )
                      )}
                    >
                      {keyword}
                    </button>
                  );
                })}
              </div>
              {index < RETIREMENT_CATEGORIES.length - 1 && (
                <hr className="mt-5 border-t border-gray-1" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 하단 고정 버튼 영역 */}
      <div className="flex-shrink-0">
        <Button
          type="submit"
          variant="primary"
          disabled={isDisabled} // 1개 이상 선택해야 활성화
        >
          다음
        </Button>
      </div>
    </form>
  );
}

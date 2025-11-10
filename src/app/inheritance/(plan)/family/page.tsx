"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import Button from "@/components/common/Button";
import { useFamilySelection } from "@/hooks/inheritance/useFamilySelection";

export default function FamilyPage() {
  const {
    selectedType,
    familyOptions,
    handleSelect,
    handleNext,
    isButtonDisabled,
  } = useFamilySelection();

  return (
    <form className="flex flex-col flex-grow">
      <div className="flex-grow">
        <h1 className="mt-[6.75rem] text-secondary text-[2rem] font-bold">
          가족 유형
        </h1>
        <p className="mt-2 text-subheading text-[1.375rem] font-medium">
          본인의 가족 유형을 선택해주세요.
        </p>

        {/* === 가족 유형 2x3 그리드 === */}
        <div className="mt-6 grid grid-cols-3 gap-x-[0.8125rem] gap-y-[0.625rem]">
          {familyOptions.map((option) => {
            const isSelected = selectedType === option.id;

            return (
              <button
                type="button"
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={clsx(
                  "h-[7.75rem] rounded-[0.75rem] flex flex-col items-center justify-center transition-colors cursor-pointer",
                  isSelected
                    ? "bg-primary text-white"
                    : "bg-white text-secondary"
                )}
              >
                {/* 직접설정이 아닌 경우에만 이미지 표시 */}
                {!option.isCustom && (
                  <Image
                    // 선택 상태에 따라 이미지 파일(D/W) 변경
                    src={`/assets/img/inheritance/${option.imgBase}${
                      isSelected ? "W" : "D"
                    }.png`}
                    alt={option.label}
                    width={44}
                    height={44}
                  />
                )}
                <span
                  className={clsx(
                    "text-center text-[1rem] font-medium",
                    !option.isCustom && "mt-[0.125rem]" // 직접설정이 아닐 때만 이미지와 간격 둠
                  )}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-shrink-0">
        <Button type="button" onClick={handleNext} disabled={isButtonDisabled}>
          다음
        </Button>
      </div>
    </form>
  );
}

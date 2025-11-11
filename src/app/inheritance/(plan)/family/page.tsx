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
    <div className="flex flex-col flex-grow">
      <div className="flex-grow">
        <h1 className="mt-[6.75rem] text-secondary text-[2rem] font-bold">
          가족 유형
        </h1>
        <p className="mt-2 text-subheading text-[1.375rem] font-medium">
          본인의 가족 유형을 선택해주세요.
        </p>

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
                {!option.isCustom && (
                  <Image
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
                    !option.isCustom && "mt-[0.125rem]"
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
    </div>
  );
}

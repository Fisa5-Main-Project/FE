"use client";

import React from "react";
import Image from "next/image";
import { Slider } from "@/components/common/Slider";
import Button from "@/components/common/Button";
import { useRatioAdjustment } from "@/hooks/inheritance/useRatioAdjustment";

export default function RatioPage() {
  const {
    heirs,
    ratios,
    totalRatio,
    handleRatioChange,
    calculateAmount,
    isButtonDisabled,
    handleNext,
  } = useRatioAdjustment();

  return (
    <form className="flex flex-col flex-grow h-full">
      <div className="flex-shrink-0">
        <h1 className="mt-[6.75rem] text-secondary text-[2rem] font-bold">
          상속 비율 정하기
        </h1>
        <p className="mt-2 text-subheading text-[1.375rem] font-medium">
          가족들에게 나눠줄 상속 비율을
          <br /> 정해보세요
        </p>
      </div>
      {/* 상속인 리스트 */}
      <div className="flex-grow overflow-y-auto mt-6 min-h-0">
        <div className="flex flex-col gap-3">
          {heirs.map((heir) => {
            const currentRatio = ratios[heir.id] || 0;
            const currentAmount = calculateAmount(currentRatio);

            return (
              <div
                key={heir.id}
                className="flex items-center gap-4 rounded-lg bg-white p-4 shadow-md"
              >
                <div className="flex w-16 flex-shrink-0 flex-col items-center gap-1">
                  <Image
                    src={`/assets/inheritance/${heir.imgBase}.svg`}
                    alt={heir.label}
                    width={48}
                    height={48}
                  />
                  <span className="text-[1rem] font-medium text-secondary">
                    {heir.label}
                  </span>
                </div>

                {/* 슬라이더, 금액*/}
                <div className="flex flex-1 flex-col gap-2">
                  {/* 슬라이더 + % 표시 */}
                  <div className="flex items-center gap-3">
                    <Slider
                      value={[currentRatio]}
                      onValueChange={(value) =>
                        handleRatioChange(heir.id, value[0])
                      }
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                    <span className="w-12 text-right font-bold text-primary">
                      {currentRatio}%
                    </span>
                  </div>
                  {/* 계산된 금액 */}
                  <span className="text-right text-lg font-bold text-primary">
                    {currentAmount}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex-shrink-0 pt-4">
        <div className="mb-2 flex justify-between text-lg font-bold">
          <span className="text-neutral-700">총 비율</span>
          <span
            className={totalRatio === 100 ? "text-primary" : "text-red-500"}
          >
            {totalRatio} / 100%
          </span>
        </div>
        <Button type="button" onClick={handleNext} disabled={isButtonDisabled}>
          다 골랐어요
        </Button>
      </div>
    </form>
  );
}

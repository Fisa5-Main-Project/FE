"use client";

/**
 * 이 컴포넌트는 입사 연월 입력 페이지
 * 추후 백엔드 연동 예정: working_date(근속 개월), 평균 급여 등은 서버 DB에 저장
 * date type으로 입사 시기 파악 후 local date로 재직 기간 계산
 */

import React from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { usePensionPeriod } from "@/hooks/pension/usePensionPeriod";
import { useMyDataContext } from "@/context/MyDataContext";

interface PensionPeriodFormProps {
  onSubmit?: (value: string) => void;
}

/** 근무 기간(입사 연월) 입력 폼 컴포넌트 */
export function PensionPeriodForm({ onSubmit }: PensionPeriodFormProps) {
  const router = useRouter();
  const { periodText, isValid, handleChange, computeWorkingMonths } = usePensionPeriod();
  const { dispatch } = useMyDataContext();

  /** 다음 버튼 클릭 시 유효성 확인 후 라우팅/제출 */
  const handleClickNext = () => {
    if (!isValid) return;
    const months = computeWorkingMonths();
    if (months > 0) {
      dispatch({ type: 'SET_WORKING_MONTHS', payload: months });
    }
    if (onSubmit) {
      onSubmit(periodText);
      return;
    }
    router.push("/pension/income");
  };

  return (
    <div className="flex flex-col flex-grow">
      <section className="flex flex-col gap-20 flex-grow">
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-secondary)]">
              입사 연월을 입력해주세요
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="bg-white rounded-xl">
            <Input
              type="month"
              placeholder="입사 연월"
              className="h-12 rounded-xl border-transparent px-5 text-lg font-medium placeholder:text-neutral-400"
              value={periodText}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>

      <div className="flex-shrink-0 pt-6">
        <Button disabled={!isValid} onClick={handleClickNext}>
          다음
        </Button>
      </div>
    </div>
  );
}


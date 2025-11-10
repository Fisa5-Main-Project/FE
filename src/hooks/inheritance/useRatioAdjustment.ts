"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInheritanceAmountForm } from "./useInheritanceAmountForm";
import { useInheritanceStore } from "@/stores/inheritance/inheritanceStore";

// (임시) 총 자산 1억원
// TODO: (API) 자산 받아오기
const TOTAL_ASSET = 100_000_000;

export const useRatioAdjustment = () => {
  const router = useRouter();

  const heirs = useInheritanceStore((state) => state.selectedHeirs);
  const totalAsset = useInheritanceStore((state) => state.totalAsset);

  const [ratios, setRatios] = useState<Record<string, number>>(() =>
    heirs.reduce((acc, heir) => ({ ...acc, [heir.id]: 0 }), {})
  );

  useEffect(() => {
    setRatios(
      heirs.reduce((acc, heir) => ({ ...acc, [heir.uniqueId]: 0 }), {})
    );
  }, [heirs]);

  // 슬라이더 값 변경 핸들러
  const handleRatioChange = (uniqueId: string, value: number) => {
    setRatios((prev) => ({
      ...prev,
      [uniqueId]: value,
    }));
  };

  // 총 비율 계산
  const totalRatio = useMemo(() => {
    return Object.values(ratios).reduce((sum, ratio) => sum + ratio, 0);
  }, [ratios]);

  // 비율에 따른 금액 계산
  const calculateAmount = (ratio: number) => {
    const amount = (totalAsset * ratio) / 100;
    return new Intl.NumberFormat("ko-KR").format(amount) + "원";
  };

  // <다음> 버튼 활성화 로직
  const isButtonDisabled = totalRatio !== 100;

  // 다음 버튼 클릭
  const handleNext = () => {
    if (isButtonDisabled) return;
    // TODO: 비율 설정 상태를 서버로 전송
    router.push("/inheritance/overview"); // (경로 예시)
  };

  return {
    heirs,
    ratios,
    totalRatio,
    handleRatioChange,
    calculateAmount,
    isButtonDisabled,
    handleNext,
  };
};

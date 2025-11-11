"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useInheritanceStore } from "@/stores/inheritance/inheritanceStore";
import { SelectedHeir } from "@/types/inheritance";

export const useRatioAdjustment = () => {
  const router = useRouter();
  const heirs = useInheritanceStore((s) => s.selectedHeirs);
  const ratios = useInheritanceStore((s) => s.ratios);
  const setRatioFor = useInheritanceStore((s) => s.setRatioFor);
  const totalAsset = useInheritanceStore((s) => s.totalAsset);

  const totalRatio = useMemo(() => {
    return Object.values(ratios).reduce((a, b) => a + (b || 0), 0);
  }, [ratios]);

  const handleRatioChange = (uniqueId: string, percent: number) => {
    setRatioFor(uniqueId, percent);
  };

  const calculateAmount = (percent: number) => {
    const n = Math.round((totalAsset * (percent / 100)) / 1); // 원 단위
    // 간단 포맷: 1,234,567원
    return n.toLocaleString("ko-KR") + "원";
  };

  const isButtonDisabled = totalRatio !== 100 || heirs.length === 0;

  const handleNext = () => {
    if (isButtonDisabled) return;
    router.push("/inheritance/complete");
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

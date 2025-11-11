"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInheritanceStore } from "@/stores/inheritance/inheritanceStore";

export const useRatioAdjustment = () => {
  const router = useRouter();

  // store에서 필요한 모든 상태와 액션을 한번에 가져오기
  const heirs = useInheritanceStore((state) => state.selectedHeirs);
  const totalAsset = useInheritanceStore((state) => state.totalAsset);
  const storeRatios = useInheritanceStore((state) => state.ratios);
  const setStoreRatios = useInheritanceStore((state) => state.setRatios);

  // 로컬 ratios 상태를 초기화
  const [ratios, setRatios] = useState<Record<string, number>>({});

  // `heirs`가 store에서 변경될 때마다 `ratios` 상태를 동기화
  useEffect(() => {
    setRatios((currentRatios) => {
      const heirIds = heirs.map((h) => h.uniqueId);
      const newRatios: Record<string, number> = {};

      heirIds.forEach((id) => {
        // 기존에 설정된 값이 있으면 유지, 없으면 0으로 초기화
        newRatios[id] = currentRatios[id] || storeRatios[id] || 0;
      });

      // store의 비율과 동기화
      setStoreRatios(newRatios);
      return newRatios;
    });
  }, [heirs, setStoreRatios]); // `heirs`가 변경될 때 이 effect를 실행

  // 슬라이더 값 변경 핸들러 (store와 동기화)
  const handleRatioChange = (uniqueId: string, value: number) => {
    const newRatios = {
      ...ratios,
      [uniqueId]: value,
    };
    setRatios(newRatios); // 로컬 상태 업데이트
    setStoreRatios(newRatios); // store에 즉시 저장
  };

  // 총 비율 계산
  const totalRatio = useMemo(() => {
    return Object.values(ratios).reduce((sum, ratio) => sum + ratio, 0);
  }, [ratios]);

  // 비율에 따른 금액 계산 (store의 totalAsset 사용)
  const calculateAmount = (ratio: number) => {
    const amount = (totalAsset * ratio) / 100;
    return new Intl.NumberFormat("ko-KR").format(amount) + "원";
  };

  // <다음> 버튼 활성화 로직 (총합 100)
  const isButtonDisabled = totalRatio !== 100;

  // 다음 버튼 클릭
  const handleNext = () => {
    if (isButtonDisabled) return;
    // store는 이미 최신 상태이므로 페이지 이동만 처리
    router.push("/inheritance/overview");
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

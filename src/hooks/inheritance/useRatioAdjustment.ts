"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

// 이전 단계에서 받아올 상속인 데이터
// TODO: 실제로는 props나 global state(Zustand 등)로 받아야 함
const MOCK_HEIRS = [
  { id: "spouse", label: "배우자", imgBase: "spouse" },
  { id: "child1", label: "자녀", imgBase: "child" },
  { id: "child2", label: "자녀", imgBase: "child" },
  { id: "child3", label: "자녀", imgBase: "child" },
];

// (임시) 총 자산 1억원
// TODO: (API) 자산 받아오기
const TOTAL_ASSET = 100_000_000;

export const useRatioAdjustment = () => {
  const router = useRouter();

  const [ratios, setRatios] = useState<Record<string, number>>(() =>
    MOCK_HEIRS.reduce((acc, heir) => ({ ...acc, [heir.id]: 0 }), {})
  );

  // 슬라이더 값 변경 핸들러
  const handleRatioChange = (id: string, value: number) => {
    setRatios((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 총 비율 계산
  const totalRatio = useMemo(() => {
    return Object.values(ratios).reduce((sum, ratio) => sum + ratio, 0);
  }, [ratios]);

  // 비율에 따른 금액 계산
  const calculateAmount = (ratio: number) => {
    const amount = (TOTAL_ASSET * ratio) / 100;
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
    heirs: MOCK_HEIRS,
    ratios,
    totalRatio,
    handleRatioChange,
    calculateAmount,
    isButtonDisabled,
    handleNext,
  };
};

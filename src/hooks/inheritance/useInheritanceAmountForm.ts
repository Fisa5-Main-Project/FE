"use client";

import { useState, useMemo, ChangeEvent, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useInheritanceStore } from "@/stores/inheritance/inheritanceStore";

export const useInheritanceAmountForm = () => {
  const router = useRouter();

  const totalAsset = useInheritanceStore((state) => state.totalAsset);
  const setTotalAsset = useInheritanceStore((state) => state.setTotalAsset);

  const [amount, setAmount] = useState(
    totalAsset > 0 ? String(totalAsset) : "",
  );

  // <다음> 버튼 활성화 여부: amount가 비어있지 않고, "0"이 아닌지 확인 (1원 이상)
  const isValid = useMemo(() => {
    const numericValue = parseInt(amount, 10);
    return !isNaN(numericValue) && numericValue > 0;
  }, [amount]);

  // <Input 변경 이벤트 핸들러> 3자리 콤마 삽입 및 숫자만 입력받도록 처리
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // 입력값에서 숫자 이외의 문자(콤마 포함)를 모두 제거
    const numericValue = value.replace(/[^0-9]/g, "");

    // 순수 숫자 문자열을 상태에 저장
    setAmount(numericValue);
  };

  // <다음> 버튼 클릭 핸들러
  const handleSubmit = useCallback(() => {
    if (!isValid) return;
    const numericValue = parseInt(amount, 10);
    setTotalAsset(numericValue);
    router.push("/inheritance/family");
  }, [isValid, amount, router, setTotalAsset]);

  // <<포매팅>> 3자리 콤마가 적용된 표시용 값 (ex. 4,000,000원)
  const formattedAmount = useMemo(() => {
    if (amount === "") return "";
    return parseInt(amount, 10).toLocaleString("ko-KR");
  }, [amount]);

  return {
    amount: formattedAmount, // Input에 표시될 콤마 적용된 값
    isValid,
    handleChange,
    handleSubmit,
  };
};

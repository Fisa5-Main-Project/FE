/**
 * Overview 화면 관리
 * 월 수령액 계산: utils/pension.ts의 calcMonthlyPayout 사용
 * 추후 백엔드 연동 예정: 초기 더미 데이터 교체 예정
 */
import { useCallback, useMemo, useState } from "react";
import { calcMonthlyPayout } from "@/utils/pension";
import type { PensionAccounts } from "@/types/pension";
import { useMyDataContext } from "@/context/MyDataContext";

export interface RecommendationItem {
  id: string;
  category: string; // 예: 예적금, 연금저축, 펀드
  name: string;
  provider: string;
  highlight?: string; // 예: 연 3.5%, 세액공제 16.5%, 수익률 12.3%
  icon?: string; // 이모지 등
}

/** Overview 화면용 종합 상태/행동 훅 */
export function usePensionOverview() {
  const { state } = useMyDataContext();
  const { workingMonths, annualIncome } = state;
  // 더미 데이터: 이후 API 연동으로 대체
  const [userName] = useState("사용자");
  const [totalPension, setTotalPension] = useState<number>(1000000000); // 10억 기본
  const [taxSavingAmount] = useState<number>(1008344234);
  const [recommendations] = useState<RecommendationItem[]>([
    { id: "r1", category: "예적금", name: "우리 정기예금", provider: "우리은행", highlight: "연 3.5%", icon: "🏦" },
    { id: "r2", category: "연금저축", name: "우리 연금저축", provider: "우리은행", highlight: "세액공제 16.5%", icon: "💰" },
    { id: "r3", category: "펀드", name: "우리 배당성장 펀드", provider: "우리은행", highlight: "수익률 12.3%", icon: "📈" },
  ]);

  /**
   * Mock 계좌 데이터
   * - 빈 객체 {} 는 해당 유형의 계좌가 없음을 의미합니다.
   */
  // DB형 현재 금액 계산: ex) (1년 2개월 -> 26 / 12) * (연 소득 / 12)
  // 평균 소득세율/3개월 평균 급여 등은 추후 백엔드 데이터로 보정됩니다. (추후 백엔드 연동 예정)
  const dbCurrentAmount = useMemo(() => {
    if (workingMonths && annualIncome) {
      return Math.max(0, Math.round((workingMonths / 12) * (annualIncome / 12)));
    }
    return 0;
  }, [workingMonths, annualIncome]);

  const accounts: PensionAccounts = {
    db: workingMonths && annualIncome ? {
      assetId: 123, // mock id
      accountNumber: "312-0393-2319-20",
      currentAmount: dbCurrentAmount,
      recent3mAvgSalary: Math.round((annualIncome || 0) / 12),
      tenureYears: Math.max(0, Math.floor((workingMonths || 0) / 12)),
    } : {},
    dc: {
      assetId: 456,
      accountNumber: "312-1111-2222-33",
      currentAmount: 1850200,
      principal: 450000,
      yieldPercent: 0.058,
    },
    irp: {
      assetId: 789,
      accountNumber: "312-9999-8888-77",
      currentAmount: 1850200,
      principal: 450000,
      yieldPercent: -0.37,
    },
  };

  // 세부 내역 토글
  const [showDetail, setShowDetail] = useState(false);
  /** 세부 내역 카드 표시/숨김 토글 */
  const toggleDetail = useCallback(() => setShowDetail((v) => !v), []);

  // 계산 입력값
  const [startAge, setStartAge] = useState<number>(65);
  const [years, setYears] = useState<number>(15);
  const [monthlyIrp, setMonthlyIrp] = useState<number>(500000);
  const [annualRate, setAnnualRate] = useState<number>(0.05);

  const [monthlyPayout, setMonthlyPayout] = useState<number | null>(null);

  /** 입력을 기반으로 계산된 월 수령액(미리보기) */
  const computedMonthly = useMemo(() => {
    if (years <= 0) return 0;
    return calcMonthlyPayout({ totalPension, years, annualRate, monthlyIrp });
  }, [totalPension, years, annualRate, monthlyIrp]);

  /** 계산하기 버튼 핸들러 (결과 확정) */
  const handleCalculate = useCallback(() => {
    setMonthlyPayout(computedMonthly);
  }, [computedMonthly]);

  return {
    userName,
    totalPension,
    setTotalPension,
    taxSavingAmount,
    recommendations,
    accounts,
    showDetail,
    toggleDetail,
    startAge,
    setStartAge,
    years,
    setYears,
    monthlyIrp,
    setMonthlyIrp,
    annualRate,
    setAnnualRate,
    monthlyPayout,
    handleCalculate,
  };
}

/**
 * Overview 화면 관리 훅
 * 연금 수령액 계산: utils/pension.ts의 calcMonthlyPayout 사용
 * ERD에 맞춘 계좌 mock 구성 (빈 객체 {} = 계좌 없음)
 */
import { useCallback, useMemo, useState } from "react";
import { calcMonthlyPayout } from "@/utils/pension";
import type { PensionAccounts } from "@/types/pension";
import { hasAccount } from "@/types/pension";
import { useMyDataStore } from "@/stores/mydata/useMyDataStore";

export interface RecommendationItem {
  id: string;
  category: string;
  name: string;
  provider: string;
  highlight?: string;
  icon?: string;
}

export function usePensionOverview() {
  const workingMonths = useMyDataStore(s => s.workingMonths);
  const annualIncome = useMyDataStore(s => s.annualIncome);

  const [userName] = useState("사용자");
  const [totalPension, setTotalPension] = useState<number>(1000000000);
  const [taxSavingAmount] = useState<number>(1008344234);
  const [recommendations] = useState<RecommendationItem[]>([
    { id: "r1", category: "적금", name: "우리 정기적금", provider: "우리은행", highlight: "최대 3.5%", icon: "💰" },
    { id: "r2", category: "연금저축", name: "우리 연금저축펀드", provider: "우리은행", highlight: "세액공제 16.5%", icon: "📈" },
    { id: "r3", category: "ETF", name: "우리 배당성장 ETF", provider: "우리은행", highlight: "수익률 12.3%", icon: "📊" },
  ]);

  // mock 계좌 데이터
  const accounts: PensionAccounts = {
    db: {accountName: "우리퇴직연금DB", pensionType: "DB"},
    dc: {
      accountName: "우리퇴직연금DC",
      pensionType: "DC",
      companyContrib: 300000,
      personalContrib: 450000,
      contribYear: new Date().getFullYear(),
      balance: 1850200,
    },
    irp: {
      accountName: "우리퇴직연금IRP",
      pensionType: "IRP",
      personalContrib: 600000,
      contribYear: new Date().getFullYear(),
      totalPersonalContrib: 3200000,
      balance: 2500000,
    },
  };

  const accountsWithIds: PensionAccounts = {
    db: hasAccount(accounts.db) ? { assetId: 101, ...(accounts.db as any) } : {},
    dc: hasAccount(accounts.dc) ? { assetId: 102, ...(accounts.dc as any) } : {},
    irp: hasAccount(accounts.irp) ? { assetId: 103, ...(accounts.irp as any) } : {},
  };

  // 상세 영역 on/off
  const [showDetail, setShowDetail] = useState(false);
  const toggleDetail = useCallback(() => setShowDetail((v) => !v), []);

  // 계산 입력값
  const [startAge, setStartAge] = useState<number>(65);
  const [years, setYears] = useState<number>(15);
  const [monthlyIrp, setMonthlyIrp] = useState<number>(500000);
  const [annualRate, setAnnualRate] = useState<number>(0.05);

  const [monthlyPayout, setMonthlyPayout] = useState<number | null>(null);

  const computedMonthly = useMemo(() => {
    if (years <= 0) return 0;
    return calcMonthlyPayout({ totalPension, years, annualRate, monthlyIrp });
  }, [totalPension, years, annualRate, monthlyIrp]);

  const handleCalculate = useCallback(() => {
    setMonthlyPayout(computedMonthly);
  }, [computedMonthly]);

  // DB 로직의 예상 금액 계산식을 공통화하여 표시용으로 사용
  const estimatedAmount = useMemo(() => {
    if (workingMonths && annualIncome) {
      return Math.max(0, Math.round((workingMonths / 12) * (annualIncome / 12)));
    }
    return 0;
  }, [workingMonths, annualIncome]);

  return {
    userName,
    totalPension,
    setTotalPension,
    taxSavingAmount,
    recommendations,
    accounts: accountsWithIds,
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
    workingMonths,
    estimatedAmount,
  };
}

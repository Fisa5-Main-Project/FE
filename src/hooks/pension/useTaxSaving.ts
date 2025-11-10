import { useMemo, useState } from "react";
import { usePensionOverview } from "@/hooks/pension/usePensionOverview";
import { useMyDataStore } from "@/stores/mydata/useMyDataStore";

export function useTaxSaving() {
  const { accounts, userName: overviewName } = usePensionOverview();
  const storeUserName = useMyDataStore((s) => s.userName);
  const annualIncome = useMyDataStore((s) => s.annualIncome);

  const [showDetail, setShowDetail] = useState(false);
  const toggleDetail = () => setShowDetail((v) => !v);

  const userName = storeUserName ?? overviewName ?? "사용자";
  const currentYear = new Date().getFullYear();

  const taxCreditRate = useMemo(() => {
    if (!annualIncome || annualIncome <= 55_000_000) return 0.165;
    return 0.132;
  }, [annualIncome]);

  const personalContribThisYear = useMemo(() => {
    const dc = accounts.dc?.contribYear === currentYear ? accounts.dc?.personalContrib ?? 0 : 0;
    const irp = accounts.irp?.contribYear === currentYear ? accounts.irp?.personalContrib ?? 0 : 0;
    return dc + irp;
  }, [accounts.dc, accounts.irp, currentYear]);

  const taxSavingAmount = useMemo(() => {
    return Math.max(0, Math.floor(personalContribThisYear * taxCreditRate));
  }, [personalContribThisYear, taxCreditRate]);

  const ANNUAL_LIMIT = 9_000_000;
  const currentPaid = personalContribThisYear;
  const additionalAvailable = Math.max(0, ANNUAL_LIMIT - currentPaid);

  return {
    userName,
    currentYear,
    accounts,
    annualIncome,
    taxCreditRate,
    personalContribThisYear,
    taxSavingAmount,
    ANNUAL_LIMIT,
    currentPaid,
    additionalAvailable,
    showDetail,
    toggleDetail,
  };
}


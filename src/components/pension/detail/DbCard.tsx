import React from "react";
import { DbAccount } from "@/types/pension";
import { formatCurrencyKRW } from "@/utils/pension";

/**
 * DB형 계좌
 * 추후 백엔드 연동 예정: 필드 값은 API 응답으로 대체됩니다.
 */
export default function DbCard({ account }: { account: DbAccount }) {
  return (
    <div className="w-full bg-white rounded-xl flex flex-col items-center gap-5 p-4">
      <div className="w-full flex items-start gap-5">
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-xl font-semibold text-black/20">DB형</div>
          <div className="text-xl font-medium text-[var(--color-gray-2)]">{account.accountNumber}</div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <div className="text-xl font-semibold text-[var(--color-secondary)]">현재 금액</div>
        <div className="text-3xl font-semibold text-[var(--color-primary)]">{formatCurrencyKRW(account.currentAmount)}원</div>
      </div>

      <div className="w-full flex items-center gap-5">
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-xl font-medium text-[var(--color-gray-2)]">최근 3개월 평균 급여</div>
          <div className="text-xl font-semibold text-[var(--color-secondary)]">{formatCurrencyKRW(account.recent3mAvgSalary)}원</div>
        </div>
        <div className="w-24 flex flex-col gap-2">
          <div className="text-xl font-medium text-[var(--color-gray-2)]">근속 기간</div>
          <div className="text-xl font-semibold text-[var(--color-secondary)]">{account.tenureYears}년</div>
        </div>
      </div>
    </div>
  );
}


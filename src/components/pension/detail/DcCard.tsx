import React from "react";
import { DcAccount } from "@/types/pension";
import { formatCurrencyKRW } from "@/utils/pension";

/**
 * DC형 계좌 카드
 */
export default function DcCard({ account }: { account: DcAccount }) {
  const principal = (account.companyContrib || 0) + (account.personalContrib || 0);
  const yieldRatio = principal > 0 ? (account.balance - principal) / principal : 0;
  const yieldText = `${(yieldRatio * 100).toFixed(1)}%`;
  const yieldClass = yieldRatio >= 0 ? "text-red-600" : "text-sky-600";

  return (
    <div className="w-full bg-white rounded-xl p-4 flex flex-col items-start gap-5">
      <div className="w-full flex items-start gap-5">
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-xl font-semibold text-black/40">DC형</div>
          {account.accountName && (
            <div className="text-xl font-medium text-[var(--color-gray-2)]">{account.accountName}</div>
          )}
        </div>
      </div>

      <div className="w-full flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <div className="text-xl font-semibold text-[var(--color-secondary)]">현재 금액</div>
          <div className="text-3xl font-semibold text-[var(--color-primary)]">{formatCurrencyKRW(account.balance)}원</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="text-xl font-medium text-[var(--color-gray-2)]">수익률</div>
          <div className={`text-xl font-semibold ${yieldClass}`}>{yieldRatio > 0 ? "+" : ""}{yieldText}</div>
        </div>
      </div>
    </div>
  );
}


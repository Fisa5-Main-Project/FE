import React from "react";
import { DbAccount } from "@/types/pension";
import { formatCurrencyKRW } from "@/utils/pension";

/**
 * DB형 계좌 카드 (존재 시 표시)
 */
export default function DbCard({ account, estimatedAmount }: { account: DbAccount; estimatedAmount?: number }) {
  return (
    <div className="w-full bg-white rounded-xl p-4 flex flex-col items-start gap-5">
      <div className="w-full flex items-start gap-5">
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-xl font-semibold text-black/40">DB형</div>
          {account.accountName && (
            <div className="text-xl font-medium text-[var(--color-gray-2)]">{account.accountName}</div>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <div className="text-xl font-semibold text-[var(--color-secondary)]">예상 금액</div>
        <div className="text-3xl font-semibold text-[var(--color-primary)]">{formatCurrencyKRW(estimatedAmount ?? 0)}원</div>
      </div>
    </div>
  );
}


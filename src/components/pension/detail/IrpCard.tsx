import React from "react";
import { IrpAccount } from "@/types/pension";
import { formatCurrencyKRW } from "@/utils/pension";

/**
 * IRP형 계좌
 * 계좌번호, 현재 금액, 납입 원금, 수익률을 표시.
 * 추후 백엔드 연동 예정: 필드 값은 API 응답으로 대체됩니다.
 */
export default function IrpCard({ account }: { account: IrpAccount }) {
  const yieldText = `${(account.yieldPercent * 100).toFixed(1)}%`;
  const yieldClass = account.yieldPercent >= 0 ? "text-sky-500" : "text-[var(--color-primary)]";
  return (
    <div className="w-full bg-white rounded-xl flex flex-col items-start gap-5 p-4">
      <div className="w-full flex items-start gap-5">
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-xl font-semibold text-black/20">IRP형</div>
          <div className="text-xl font-medium text-[var(--color-gray-2)]">{account.accountNumber}</div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <div className="text-xl font-semibold text-[var(--color-secondary)]">현재 금액</div>
        <div className="text-3xl font-semibold text-[var(--color-primary)]">{formatCurrencyKRW(account.currentAmount)}원</div>
      </div>

      <div className="w-full flex items-center gap-5">
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-xl font-medium text-[var(--color-gray-2)]">납입 원금</div>
          <div className="text-xl font-semibold text-[var(--color-secondary)]">{formatCurrencyKRW(account.principal)}원</div>
        </div>
        <div className="w-24 flex flex-col gap-2">
          <div className="text-xl font-medium text-[var(--color-gray-2)]">수익률</div>
          <div className={`text-xl font-semibold ${yieldClass}`}>{account.yieldPercent >= 0 ? "+" : ""}{yieldText}</div>
        </div>
      </div>
    </div>
  );
}


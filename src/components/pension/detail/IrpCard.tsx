import React from "react";
import { IrpAccount } from "@/types/pension";
import { formatCurrencyKRW } from "@/utils/formatting";

export default function IrpCard({ account }: { account: IrpAccount }) {
  const principal = account.totalPersonalContrib || 0;
  const yieldRatio = principal > 0 ? (account.balance - principal) / principal : 0;
  const yieldText = `${(yieldRatio * 100).toFixed(1)}%`;
  const yieldClass = yieldRatio >= 0 ? "text-red-600" : "text-sky-600";

  return (
    <div className="w-full h-48 relative bg-white rounded-xl">
      <div className="w-72 left-[25px] top-[27px] absolute inline-flex justify-start items-start gap-5">
        <div className="w-48 inline-flex flex-col justify-start items-start gap-2">
          <div className="justify-start text-[var(--color-secondary)] text-xl font-semibold">IRP형</div>
          {account.accountName && (
            <div className="w-48 justify-start text-[var(--color-gray-2)] text-xl font-medium">{account.accountName}</div>
          )}
        </div>
      </div>
      <div className="w-72 h-16 left-[25px] top-[103px] absolute">
        <div className="w-72 left-0 top-0 absolute justify-start text-[var(--color-secondary)] text-xl font-semibold">현재 금액</div>
        <div className="w-72 left-0 top-[32px] absolute justify-start text-[var(--color-primary)] text-3xl font-semibold">
          {formatCurrencyKRW(account.balance)}원
        </div>
        <div className="w-24 left-[206px] top-[7px] absolute inline-flex flex-col justify-start items-start gap-2">
          <div className="self-stretch justify-start text-[var(--color-gray-2)] text-xl font-medium">수익률</div>
          <div className={`self-stretch justify-start text-xl font-semibold ${yieldClass}`}>{yieldRatio > 0 ? "+" : ""}{yieldText}</div>
        </div>
      </div>
    </div>
  );
}


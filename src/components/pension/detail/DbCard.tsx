import React from "react";
import { DbAccount } from "@/types/pension";
import { formatCurrencyKRW } from "@/utils/formatting";

export default function DbCard({ account, estimatedAmount }: { account: DbAccount; estimatedAmount?: number }) {
  return (
    <div className="w-full h-48 relative bg-white rounded-xl">
      <div className="w-72 left-[25px] top-[32px] absolute inline-flex justify-start items-start gap-5">
        <div className="w-48 inline-flex flex-col justify-start items-start gap-2">
          <div className="justify-start text-[var(--color-secondary)] text-xl font-semibold">DB형</div>
          {account.accountName && (
            <div className="w-48 justify-start text-[var(--color-gray-2)] text-xl font-medium">{account.accountName}</div>
          )}
        </div>
      </div>
      <div className="w-72 left-[25px] top-[108px] absolute inline-flex flex-col justify-start items-start gap-2">
        <div className="self-stretch justify-start text-[var(--color-secondary)] text-xl font-semibold">예상 금액</div>
        <div className="self-stretch justify-start text-[var(--color-primary)] text-3xl font-semibold">
          {formatCurrencyKRW(estimatedAmount ?? 0)}원
        </div>
      </div>
    </div>
  );
}


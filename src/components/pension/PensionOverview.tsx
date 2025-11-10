"use client";

/**
 * 퇴직연금 메인 화면
 * - 요약 카드, 세부 내역, 계산기, 세제 혜택, 추천 상품
 */

import React from "react";
import Link from "next/link";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { usePensionOverview } from "@/hooks/pension/usePensionOverview";
import PensionDetailCard from "@/components/pension/PensionDetailCard";
import { formatCurrencyKRW } from "@/utils/pension";

export default function PensionOverview() {
  const {
    userName,
    totalPension,
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
    workingMonths,
    estimatedAmount,
  } = usePensionOverview();

  return (
    <div className="flex flex-col gap-12">
      {/* 요약 카드 */}
      <section className="flex flex-col gap-5">
        <div className="text-3xl font-bold text-[var(--color-secondary)]">
          <span className="font-extrabold">{userName}</span>
          <span className="font-medium">님의 퇴직연금</span>
        </div>

        <div className="w-full bg-white rounded-xl p-6 flex flex-col items-center gap-6">
          <div className="w-full flex flex-col gap-3">
            <div className="text-xl font-semibold text-[var(--color-secondary)]">총 퇴직연금</div>
            <div className="text-4xl font-bold text-[var(--color-secondary)]">{formatCurrencyKRW(totalPension)}원</div>
          </div>

          <button type="button" className="text-base font-semibold text-[var(--color-secondary)]/80" onClick={toggleDetail}>
            세부내역 보기
          </button>
          {showDetail && (
            <PensionDetailCard accounts={accounts} workingMonths={workingMonths} estimatedAmount={estimatedAmount} />
          )}
        </div>
      </section>

      {/* 연금수령 계산기 */}
      <section className="flex flex-col gap-5">
        <div className="inline-flex items-center gap-2">
          <div className="w-7 h-7 flex items-center justify-center">ⓘ</div>
          <h2 className="text-2xl font-semibold text-[var(--color-secondary)]">예상 연금수령 계산기</h2>
        </div>

        <div className="w-full bg-white rounded-xl p-6 flex flex-col items-center gap-6">
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[var(--color-secondary)]">희망 수령 시작 연령</label>
              <Input
                inputMode="numeric"
                value={startAge.toString()}
                onChange={(e) => setStartAge(Number(e.target.value.replace(/\D/g, "")) || 0)}
                className="h-12 rounded-xl !bg-[var(--color-gray-1)] border-transparent px-3"
                placeholder="65"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[var(--color-secondary)]">희망 수령 기간(년)</label>
              <Input
                inputMode="numeric"
                value={years.toString()}
                onChange={(e) => setYears(Number(e.target.value.replace(/\D/g, "")) || 0)}
                className="h-12 rounded-xl !bg-[var(--color-gray-1)] border-transparent px-3"
                placeholder="15"
              />
            </div>
          </div>

          <div className="w-full grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[var(--color-secondary)]">예상 IRP 추가 납입(월)</label>
              <Input
                inputMode="numeric"
                value={monthlyIrp.toString()}
                onChange={(e) => setMonthlyIrp(Number(e.target.value.replace(/\D/g, "")) || 0)}
                className="h-12 rounded-xl !bg-[var(--color-gray-1)] border-transparent px-3"
                placeholder="500000"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-[var(--color-secondary)]">예상 수익률(%)</label>
              <Input
                inputMode="decimal"
                value={(annualRate * 100).toString()}
                onChange={(e) => {
                  const num = Number(e.target.value.replace(/[^\d.]/g, ""));
                  if (!Number.isFinite(num)) return setAnnualRate(0);
                  setAnnualRate(num / 100);
                }}
                className="h-12 rounded-xl !bg-[var(--color-gray-1)] border-transparent px-3"
                placeholder="5"
              />
            </div>
          </div>

          <div className="w-full">
            <Button onClick={handleCalculate}>계산하기</Button>
          </div>

          {monthlyPayout != null && (
            <div className="w-full text-center text-xl font-bold text-[var(--color-secondary)]">
              예상 월 연금수령액 {formatCurrencyKRW(Math.round(monthlyPayout))}원
            </div>
          )}
        </div>
      </section>

      {/* 세제 혜택 */}
      <section className="flex flex-col gap-5">
        <div className="inline-flex items-center gap-2">
          <div className="w-7 h-7 flex items-center justify-center">💡</div>
          <h2 className="text-2xl font-semibold text-[var(--color-secondary)]">세제 혜택</h2>
        </div>

        <div className="w-full bg-white rounded-xl p-6">
          <div className="text-xl font-semibold text-[var(--color-secondary)]">2025년 예상 절세 금액</div>
          <div className="mt-2 text-4xl font-bold text-[var(--color-secondary)]">{formatCurrencyKRW(taxSavingAmount)}원</div>
          <div className="mt-4 text-right">
            <Link href="/pension/taxsaving" className="text-base font-semibold text-[var(--color-gray-2)]">
              자세히보기
            </Link>
          </div>
        </div>
      </section>

      {/* 추천 상품 */}
      <section className="flex flex-col gap-4">
        <div className="inline-flex items-center gap-2">
          <div className="w-7 h-7 flex items-center justify-center">⭐</div>
          <h2 className="text-2xl font-bold text-slate-700">
            투자 성향 <span className="text-[var(--color-primary)]">맞춤 상품</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {recommendations.map((rec) => (
            <div key={rec.id} className="w-full bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] px-4 pt-4">
              <div className="flex items-center justify-between h-12">
                <div className="flex-1 flex items-center gap-3.5">
                  <div className="w-11 h-11 bg-gradient-to-b from-sky-100 to-blue-50 rounded-xl flex items-center justify-center">
                    <div className="text-2xl">{rec.icon || "💼"}</div>
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="px-2 h-6 bg-zinc-100 rounded-md flex items-center">
                        <span className="text-gray-500 text-xs font-semibold">{rec.category}</span>
                      </div>
                      <div className="text-base font-semibold text-gray-800">{rec.name}</div>
                    </div>
                    <div className="text-sm text-gray-500">{rec.provider}</div>
                  </div>
                </div>
                {rec.highlight && <div className="text-sky-500 text-base font-bold">{rec.highlight}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


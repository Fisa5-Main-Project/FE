"use client";

import React from "react";
import clsx from "clsx";
import Image from "next/image";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { ProcessedHeir } from "@/hooks/inheritance/useDashboardPage";

interface HeirResultCardProps {
  heir: ProcessedHeir;
}

export const HeirResultCard: React.FC<HeirResultCardProps> = ({ heir }) => {
  return (
    <div
      className={clsx(
        "w-full rounded-xl border p-4 flex flex-col gap-4 shadow-sm",
        heir.isOver
          ? "border-green-200 bg-green-50"
          : "border-red-200 bg-red-200 bg-red-50"
      )}
    >
      {/* 유류분 대비 */}
      <div
        className={clsx(
          "flex items-center gap-2 justify-center text-sm font-semibold",
          heir.isOver ? "text-green-600" : "text-red-600"
        )}
      >
        {heir.isOver ? (
          <CheckCircle className="h-5 w-5" />
        ) : (
          <AlertTriangle className="h-5 w-5" />
        )}
        <span>유류분 대비</span>
        <span>{heir.difference}</span>
      </div>

      {/* 이미지 + 이름 + 금액 비교 */}
      <div className="flex gap-4 items-start">
        {/* 좌측: 이미지 + 이름 */}
        <div className="flex flex-col items-center gap-2 min-w-[80px]">
          <Image
            src={`/assets/inheritance/${heir.imgBase}.svg`}
            alt={heir.label}
            width={56}
            height={56}
          />
          <span className="text-base font-bold text-secondary text-center">
            {heir.label}
          </span>
        </div>

        {/* 우측: 금액 비교 */}
        <div className="flex-1 flex flex-col gap-2">
          {/* 나의 설정 (메인 강조) */}
          <div className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">나의 설정</p>
            <div className="text-right">
              <p className="text-lg font-bold text-primary">{heir.myAmount}</p>
              <p className="text-sm font-semibold text-primary">
                ({heir.myRatio}%)
              </p>
            </div>
          </div>

          {/* 법정상속분 & 유류분 (보조) */}
          <div className="flex gap-2">
            <div className="flex-1 bg-white rounded-lg p-2 text-center shadow-inner">
              <p className="text-xs font-medium text-neutral-500">법정상속분</p>
              <p className="mt-1 text-sm font-bold text-neutral-700">
                {heir.statutoryAmount}
              </p>
              <p className="text-xs font-semibold text-neutral-700">
                ({heir.statutoryRatio}%)
              </p>
            </div>
            <div className="flex-1 bg-white rounded-lg p-2 text-center shadow-inner">
              <p className="text-xs font-medium text-neutral-500">유류분</p>
              <p className="mt-1 text-sm font-bold text-neutral-700">
                {heir.legalReserveAmount}
              </p>
              <p className="text-xs font-semibold text-neutral-700">
                ({heir.legalReserveRatio}%)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import clsx from "clsx";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { ProcessedHeir } from "@/hooks/inheritance/useDashboardPage";
interface HeirResultCardProps {
  heir: ProcessedHeir;
}

export const HeirResultCard: React.FC<HeirResultCardProps> = ({ heir }) => {
  return (
    <div
      className={clsx(
        "w-full rounded-lg border p-4 shadow-sm",
        heir.isOver
          ? "border-green-200 bg-green-50"
          : "border-red-200 bg-red-50"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xl font-bold text-secondary">{heir.label}</span>
        <div
          className={clsx(
            "flex items-center gap-1 text-sm font-semibold",
            heir.isOver ? "text-green-600" : "text-red-600"
          )}
        >
          {heir.isOver ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertTriangle className="h-4 w-4" />
          )}
          <span>유류분 대비</span>
          <span>{heir.difference}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-sm font-medium text-neutral-500">나의 설정</p>
          <p className="mt-1 text-base font-bold text-primary">
            {heir.myAmount}
          </p>
          <p className="text-sm font-semibold text-primary">
            ({heir.myRatio}%)
          </p>
        </div>
        {/* 법정상속분 */}
        <div>
          <p className="text-sm font-medium text-neutral-500">법정상속분</p>
          <p className="mt-1 text-base font-bold text-neutral-700">
            {heir.statutoryAmount}
          </p>
          <p className="text-sm font-semibold text-neutral-700">
            ({heir.statutoryRatio}%)
          </p>
        </div>
        {/* 유류분 */}
        <div>
          <p className="text-sm font-medium text-neutral-500">유류분</p>
          <p className="mt-1 text-base font-bold text-neutral-700">
            {heir.legalReserveAmount}
          </p>
          <p className="text-sm font-semibold text-neutral-700">
            ({heir.legalReserveRatio}%)
          </p>
        </div>
      </div>
    </div>
  );
};

"use client";

import React from "react";
import Button from "@/components/common/Button";
import { useDashboardPage } from "@/hooks/inheritance/useDashboardPage";
import { HeirResultCard } from "@/components/inheritance/HeirResultCard";

export default function DashboardPage() {
  const { userName, processedHeirs, handleReset, handleNext } =
    useDashboardPage();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow min-h-0 overflow-y-auto">
        <h1 className="mt-[6.75rem] text-secondary text-[2rem] font-bold">
          {userName}님의
          <br />
          상속 설계 결과입니다
        </h1>
        <div className="mt-6 flex flex-col gap-3">
          {processedHeirs.map((heir) => (
            <HeirResultCard key={heir.uniqueId} heir={heir} />
          ))}
        </div>
      </div>

      <div className="flex-shrink-0 pt-4 flex flex-col gap-3">
        <Button type="button" onClick={handleReset} variant="secondary">
          상속 다시 설계하기
        </Button>
        <Button type="button" onClick={handleNext} variant="primary">
          다음
        </Button>
      </div>
    </div>
  );
}

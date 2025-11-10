"use client";

import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import Button from "@/components/common/Button";
import { useComparePage } from "@/hooks/inheritance/useComparePage"; // (경로 확인)
import { CompareTabButton } from "@/components/inheritance/CompareTabButton";
import { CompareInfoBox } from "@/components/inheritance/CompareInfoBox";
import { legalReserveContent, statutoryContent } from "./compare.content";

export default function ComparePage() {
  const { activeTab, handleTabChange, handleNext } = useComparePage();

  const isStatutory = activeTab === "statutory";

  return (
    <div className="flex flex-col flex-grow h-full">
      <div className="flex-grow overflow-y-auto min-h-0">
        <h1 className="mt-[6.75rem] text-secondary text-[2rem] font-bold">
          법정상속분 VS 유류분
        </h1>
        <p className="mt-2 text-subheading text-[1.375rem] font-medium">
          상속 재산 분배의 두 가지 기준을 비교해보세요.
        </p>

        {/* 탭 버튼 영역 */}
        <div className="mt-6 flex items-center gap-3">
          <CompareTabButton
            tab="statutory"
            isActive={isStatutory}
            onClick={() => handleTabChange("statutory")}
          />
          <CompareTabButton
            tab="legalReserve"
            isActive={!isStatutory}
            onClick={() => handleTabChange("legalReserve")}
          />
        </div>

        {/* 탭 콘텐츠 (소개) */}
        <CompareInfoBox type="info" activeTab={activeTab} />

        {/* 아코디언 콘텐츠 (순위) */}
        <Accordion.Root type="multiple" className="mt-4 flex flex-col gap-3">
          {isStatutory ? statutoryContent : legalReserveContent}
        </Accordion.Root>

        {/* 핵심 차이점 */}
        <CompareInfoBox type="lightbulb" />

        <CompareInfoBox type="alert" />
      </div>

      <div className="flex-shrink-0 pt-4">
        <Button type="button" onClick={handleNext} disabled={false}>
          이해했어요
        </Button>
      </div>
    </div>
  );
}

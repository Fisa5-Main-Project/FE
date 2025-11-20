"use client";

import React from "react";
import Button from "@/components/common/Button";
import { JobDetailInfo } from "@/components/job/JobDetailInfo";
import { useJobDetail } from "@/hooks/job/useJobDetail";

// TODO: 헤더로 바꾸기-뒤로가기 아이콘 (SVG)
const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

export default function JobDetailPage() {
  const { detail, loading, error, handlePrev, handleHomepage } = useJobDetail();

  // 1. 로딩 중
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center flex-col gap-3 bg-white">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
        <p className="text-gray-400 text-sm">상세 정보를 불러오는 중...</p>
      </div>
    );
  }

  // 2. 에러 또는 데이터 없음
  if (error || !detail) {
    return (
      <div className="flex h-full items-center justify-center flex-col gap-4 bg-white px-6 text-center">
        <p className="text-gray-500">{error || "정보를 찾을 수 없습니다."}</p>
        <Button className="w-full max-w-[200px]" onClick={handlePrev}>
          이전 페이지로
        </Button>
      </div>
    );
  }

  // 홈페이지 URL 존재 여부 체크
  const hasHomepage = !!detail.homepageUrl;
  // 상세 내용 존재 여부 체크
  const hasDescription =
    detail.description && detail.description.trim().length > 0;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* 뒤로가기 아이콘 + 제목 */}
      <div className="pt-4 pb-2 shrink-0">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={handlePrev}
          className="w-10 h-10 flex items-center justify-center -ml-2 text-black hover:bg-gray-100 rounded-full transition-colors mb-2"
          aria-label="뒤로가기"
        >
          <BackIcon />
        </button>

        {/* 타이틀 영역 */}
        <div>
          <h1 className="text-[2rem] font-bold text-secondary leading-snug break-keep">
            {detail.title}
          </h1>
          <div className="mt-2 text-[1.375rem] font-medium text-gray-2">
            {detail.companyName}
          </div>
        </div>
      </div>

      {/* 스크롤 가능 영역*/}
      <div className="flex-1 overflow-y-auto min-h-0 py-6">
        {/* 요약 정보 컴포넌트 */}
        <JobDetailInfo detail={detail} />

        {/* 상세 내용 본문 */}
        <div className="mt-8 pb-4">
          <h2 className="text-[1.25rem] font-bold mb-3 text-black">
            상세 내용
          </h2>

          {hasDescription ? (
            <p className="whitespace-pre-line text-gray-600 leading-relaxed text-[1rem]">
              {detail.description}
            </p>
          ) : (
            // 상세 내용이 없을 때 보여줄 UI
            <div className="w-full py-10 bg-gray-50 rounded-xl flex flex-col items-center justify-center text-gray-400">
              <span className="text-2xl mb-2">📝</span>
              <span className="text-[1rem]">제공된 상세 내용이 없습니다.</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-shrink-0 mt-5 z-10">
        <Button
          onClick={handleHomepage}
          disabled={!hasHomepage} // URL 없으면 비활성화
          className="w-full"
        >
          {hasHomepage ? "홈페이지 보러 가기" : "홈페이지 정보 없음"}
        </Button>
      </div>
    </div>
  );
}

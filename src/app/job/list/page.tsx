"use client";

import React from "react";
import Button from "@/components/common/Button";
import { JobCard } from "@/components/job/JobCard";
import { useJobList } from "@/hooks/job/useJobList";

export default function JobListPage() {
  const {
    jobs,
    totalCount,
    loading,
    currentPage,
    totalPages,
    locationInfo,
    handleJobClick,
    handlePageChange,
    handleHome,
  } = useJobList();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* 1. Header Area */}
      <div className="my-4 shrink-0 z-10 border-b border-gray-50">
        <h1 className="text-secondary text-[2rem] font-bold leading-tight">
          {/* 예: 서울시 광진구 | 정규직 */}
          <span className="text-secondary">
            {locationInfo.city} {locationInfo.district}
          </span>
          <span className="text-gray-300 mx-2">|</span>
          <span className="text-black">{locationInfo.typeLabel}</span>
        </h1>
        <p className="mt-2 text-[1.375rem] font-medium text-gray-2">
          총 <span className="text-secondary font-bold">{totalCount}</span>개의
          일자리를 찾았습니다.
        </p>
      </div>

      {/* 2. List Content Area */}
      <div className="flex-1 overflow-y-auto min-h-0 ">
        {loading ? (
          // 로딩 상태
          <div className="h-full flex flex-col items-center justify-center gap-3 text-gray-400 pb-20">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-secondary rounded-full animate-spin"></div>
            <p className="text-sm">일자리를 불러오고 있어요</p>
          </div>
        ) : jobs.length === 0 ? (
          // 결과 없음 상태
          <div className="h-full flex flex-col items-center justify-center gap-2 text-gray-400 pb-20">
            <p className="text-[3rem]">📭</p>
            <p>조건에 맞는 공고가 없습니다.</p>
          </div>
        ) : (
          // 리스트 출력
          <div className="py-5 flex flex-col gap-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} onClick={handleJobClick} />
            ))}

            {/* Pagination (리스트 하단) */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 py-6 mt-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-gray-500 disabled:text-gray-300 font-medium hover:bg-gray-100 rounded transition-colors"
                >
                  &lt; 이전
                </button>
                <span className="text-[1rem] font-bold text-secondary px-3 py-1 rounded">
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-gray-500 disabled:text-gray-300 font-medium hover:bg-gray-100 rounded transition-colors"
                >
                  다음 &gt;
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-2 flex-shrink-0 z-20">
        <Button variant="secondary" onClick={handleHome}>
          홈 화면으로
        </Button>
      </div>
    </div>
  );
}

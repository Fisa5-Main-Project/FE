"use client";

import React from "react";
import { useRouter } from "next/navigation";

// 뒤로가기 아이콘
const ChevronLeftIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 19L8 12L15 5"
      stroke="#111111"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface HeaderProps {
  /** 뒤로가기 버튼 노출 여부 (기본값: true) */
  hasBackButton?: boolean;
  /** 로고(또는 타이틀) 노출 여부 (기본값: true) */
  hasLogo?: boolean;
  /** 마이페이지(프로필) 노출 여부 (기본값: true) */
  hasMyPage?: boolean;
  /** 로고 대신 보여줄 타이틀 (없으면 기본 로고 노출) */
  title?: string;
}

export default function Header({
  hasBackButton = true,
  hasLogo = true,
  hasMyPage = true,
  title,
}: HeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-[7.5rem] bg-white shrink-0  backdrop-blur-sm">
      {/* 1. 왼쪽: 뒤로가기 버튼 */}
      {/* 내부 버튼이 없어도 w-10 공간을 유지해야 중앙 로고가 치우치지 않음 */}
      <div className="w-10 flex justify-start">
        {hasBackButton && (
          <button
            type="button"
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-start cursor-pointer"
            aria-label="뒤로가기"
          >
            <ChevronLeftIcon />
          </button>
        )}
      </div>

      {/* 2. 가운데: 로고 또는 타이틀 */}
      <div className="flex-1 flex justify-center">
        {hasLogo && (
          <button
            type="button"
            onClick={() => router.push("/main")}
            className="flex items-center justify-center cursor-pointer"
          >
            {title ? (
              <span className="font-bold text-lg text-secondary">{title}</span>
            ) : (
              // 로고 이미지나 텍스트
              <span className="font-bold text-lg text-primary">LOGO</span>
            )}
          </button>
        )}
      </div>

      {/* 3. 오른쪽: 프로필 (마이페이지) */}
      {/* 내부 버튼이 없어도 w-10 공간을 유지해야 중앙 로고가 정가운데 위치함 */}
      <div className="w-10 flex justify-end">
        {hasMyPage && (
          <button
            type="button"
            onClick={() => router.push("/mypage")}
            className="w-10 h-10 flex items-center justify-end cursor-pointer"
            aria-label="마이페이지"
          >
            <div className="w-8 h-8 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
              <svg
                className="w-full h-full text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </button>
        )}
      </div>
    </header>
  );
}

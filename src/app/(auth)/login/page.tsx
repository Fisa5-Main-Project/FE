"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

const KakaoIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 4.666c-6.262 0-11.333 4.088-11.333 9.135 0 3.19 2.05 5.973 5.093 7.597l-.95 3.51c-.14.516.31.98.81.74l4.24-2.17c.69.102 1.4.156 2.11.156 6.262 0 11.333-4.088 11.333-9.135S22.262 4.666 16 4.666z"
      fill="#3A1D1D"
    />
  </svg>
);

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 아이디와 비밀번호가 모두 입력되었는지 확인
  const isLoginDisabled = !id || !password || isLoading;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoginDisabled) return;

    setIsLoading(true);
    console.log("로그인 시도:", { id, password });

    // TODO: 로그인 API 호출 로직 구현
    // 임시 로딩 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleKakaoLogin = () => {
    if (isLoading) return;
    setIsLoading(true);
    console.log("카카오 로그인 시도");
    // TODO: 카카오 로그인 SDK 연동 및 API 호출 로직 구현
    setIsLoading(false);
  };

  return (
    <form className="flex flex-col flex-grow h-full" onSubmit={handleSubmit}>
      {/*상단 컨텐츠 영역 (로고, 폼, 소셜 로그인)*/}
      <div className="flex-grow">
        <div className="w-[11.25rem] h-[11.25rem] bg-gray-200 mx-auto">
          {/* TODO: 로고 완성되면 로고로 변경하기 */}
        </div>
        <h1 className="mt-9 text-[2rem] font-bold text-secondary">로그인</h1>

        {/* 아이디/비밀번호 폼 */}
        <div className="mt-6 space-y-3">
          <div>
            <label htmlFor="login-id" className="sr-only">
              아이디
            </label>
            <Input
              id="login-id"
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              autoComplete="username"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="login-password" className="sr-only">
              비밀번호
            </label>
            <Input
              id="login-password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="mt-6">
          <Button type="submit" disabled={isLoginDisabled} variant="primary">
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>
        </div>
        {/*  소셜 로그인 (구분선 + 카카오) */}
        <div className="my-8 flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="mx-4 flex-shrink text-sm text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        <button
          type="button"
          onClick={handleKakaoLogin}
          disabled={isLoading}
          className="w-full h-[52px] flex items-center justify-center rounded-[12px] bg-[#FEE500] text-black/85 font-semibold text-[20px] transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <KakaoIcon />
          카카오로 로그인
        </button>
      </div>

      {/* 회원가입*/}
      <div className="flex-shrink-0 mt-10 text-center">
        <p className="text-center text-sm mt-4 text-gray-400">
          해당 서비스는 노후하우 가입 후 이용할 수 있습니다
        </p>
        <p className="mt-2.5 text-1rem text-gray-500">
          아직 회원이 아니신가요?
          <Link
            href="/signup/verify"
            className="ml-2 font-semibold text-primary hover:underline"
          >
            회원가입
          </Link>
        </p>
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // 아이디와 비밀번호가 모두 입력되었는지 확인
  const isLoginDisabled = !id || !password;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoginDisabled) return;

    // TODO: 로그인 API 호출 로직 구현
    console.log("로그인 시도:", { id, password });
  };

  return (
    <form className="flex flex-col flex-grow" onSubmit={handleSubmit}>
      {/*상단 컨텐츠 영역*/}
      <div className="flex-grow">
        <div className="w-[11.25rem] h-[11.25rem] bg-gray-200 mx-auto">
          {/* TODO: 로고 완성되면 로고로 변경하기 */}
        </div>
        <h1 className="mt-9 text-[2rem] font-bold text-secondary">로그인</h1>
        <div className="mt-9 space-y-3">
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
            />
          </div>
        </div>
      </div>

      {/* 하단 버튼 영역*/}
      <div className="flex-shrink-0">
        <Button type="submit" disabled={isLoginDisabled}>
          로그인
        </Button>
        <p className="text-start text-sm mt-4 text-gray-2">
          해당 서비스는 마이데이터 가입 후 이용할 수 있습니다
        </p>
        <div className="mt-2.5">
          <Link href="/signup/verify" passHref>
            <Button type="button">회원가입</Button>
          </Link>
        </div>
      </div>
    </form>
  );
}

"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import PhoneAuth from "@/components/verify/PhoneAuth";
import { useVerifyForm } from "@/hooks/auth/useVerifyForm";

export default function VerifyPage() {
  // useVerifyForm 훅을 호출하여 모든 로직과 상태를 받아옴
  const { formValues, setters, uiState, handlers } = useVerifyForm();

  return (
    // handleSubmit 핸들러 연결
    <form
      className="flex flex-col flex-grow h-full"
      onSubmit={handlers.handleSubmit}
    >
      {/* 상단 컨텐츠 영역 */}
      <div className="flex-grow">
        <h1
          className="text-[2rem] font-normal whitespace-pre-line"
          style={{ color: "var(--color-secondary)" }}
        >
          {"노후하우 이용을 위해\n"}
          <span className="font-bold">본인 확인</span>
          {"을 해주세요"}
        </h1>

        {/* 입력 필드 묶음 */}
        <div className="mt-9 space-y-4">
          <Input
            placeholder="이름(성+이름)"
            value={formValues.name}
            onChange={(e) => setters.setName(e.target.value)}
            autoComplete="name"
          />
          <div className="flex gap-x-[1.125rem]">
            <Input
              type="text"
              placeholder="주민번호 앞자리"
              value={formValues.rrnFront}
              onChange={(e) => setters.setRrnFront(e.target.value)}
              maxLength={6}
              inputMode="numeric"
              autoComplete="off"
            />
            <Input
              type="password"
              placeholder="주민번호 뒷자리"
              value={formValues.rrnBack}
              onChange={(e) => setters.setRrnBack(e.target.value)}
              maxLength={7}
              inputMode="numeric"
            />
          </div>

          {/* PhoneAuth 컴포넌트에 훅의 값과 핸들러 전달 */}
          {uiState.isRrnFilled && (
            <PhoneAuth
              telecom={formValues.telecom}
              phone={formValues.phone}
              code={formValues.code}
              isCodeSent={uiState.isCodeSent}
              isPhoneFilled={uiState.isPhoneFilled}
              setTelecom={setters.setTelecom}
              setPhone={(value) => setters.setPhone(value)}
              setCode={(value) => setters.setCode(value)}
              onRequestCode={handlers.handleRequestCode}
            />
          )}
        </div>
      </div>

      {/* 하단 버튼 영역 */}
      <div className="flex-shrink-0">
        <Button type="submit" disabled={uiState.isNextDisabled}>
          다음
        </Button>
      </div>
    </form>
  );
}

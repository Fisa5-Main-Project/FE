"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * 본인 확인 페이지(VerifyPage)의 비즈니스 로직을 관리하는 훅
 */
export function useVerifyForm() {
  const router = useRouter();

  // 폼 필드 상태
  const [name, setName] = useState("");
  const [rrnFront, setRrnFront] = useState(""); // 주민번호 앞 6자리
  const [rrnBack, setRrnBack] = useState(""); // 주민번호 뒤 7자리
  const [telecom, setTelecom] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");

  // UI 상태
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증번호 발송 여부

  // 파생 상태 (유효성 검사)
  const isRrnFilled = rrnFront.length === 6 && rrnBack.length === 7;
  const isPhoneFilled = phone.length >= 10;
  const isCodeFilled = code.length === 6;

  // <다음> 버튼 활성화 조건
  const isNextDisabled =
    !name || !isRrnFilled || !telecom || !isPhoneFilled || !isCodeFilled;

  // ----- 이벤트 핸들러 (API 호출) -----

  // (API) 인증번호 받기/재요청
  const handleRequestCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 폼 제출 방지
    if (!isPhoneFilled) return;

    // TODO: 인증번호 발송 API 호출
    console.log("인증번호 요청:", { phone, telecom });
    setIsCodeSent(true); // 인증번호 입력칸 표시
  };

  // (API) 폼 제출
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isNextDisabled) return;

    // TODO: 서버에 본인 확인 정보 및 인증번호 검증 요청
    console.log("본인 확인 제출:", {
      name,
      rrnFront,
      rrnBack,
      telecom,
      phone,
      code,
    });

    // 검증 성공 시 다음 단계(약관 동의)로 이동
    router.push("/signup/terms");
  };

  // 페이지(View)에 필요한 모든 것을 반환
  return {
    // 폼 값
    formValues: {
      name,
      rrnFront,
      rrnBack,
      telecom,
      phone,
      code,
    },
    // 폼 상태 변경자 (Setter)
    setters: {
      setName,
      setRrnFront,
      setRrnBack,
      setTelecom,
      setPhone,
      setCode,
    },
    // UI 계산 값
    uiState: {
      isRrnFilled,
      isPhoneFilled,
      isCodeSent,
      isNextDisabled,
    },
    // 폼 제출/API 핸들러
    handlers: {
      handleRequestCode,
      handleSubmit,
    },
  };
}

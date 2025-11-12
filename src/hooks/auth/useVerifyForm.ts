"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

/**
 * 본인 확인 페이지의 비즈니스 로직을 관리하는 훅
 */
export function useVerifyForm() {
  const router = useRouter();

  // 폼 필드 상태
  const [name, setName] = useState("");
  const [rrnFront, setRrnFront] = useState(""); // 주민번호 앞 6자리
  const [rrnBackFirst, setRrnBackFirst] = useState(""); // 주민번호 뒤 첫 1자리
  const [telecom, setTelecom] = useState("");
  const [phone, setPhone] = useState(""); // 010으로 시작하는 11자리
  const [code, setCode] = useState("");

  // UI 상태
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증번호 발송 여부

  // --- 파생 상태 (성별, 생년월일 가공) ---
  const { gender, birth } = useMemo(() => {
    if (rrnFront.length !== 6 || rrnBackFirst.length !== 1) {
      return { gender: null, birth: null };
    }

    const rrnBack = rrnBackFirst;

    // 1, 3 = MALE, 2, 4 = FEMALE
    const derivedGender =
      rrnBack === "1" || rrnBack === "3"
        ? "MALE"
        : rrnBack === "2" || rrnBack === "4"
        ? "FEMALE"
        : null;

    // 1, 2 = 1900년대, 3, 4 = 2000년대
    const yearPrefix =
      rrnBack === "1" || rrnBack === "2"
        ? "19"
        : rrnBack === "3" || rrnBack === "4"
        ? "20"
        : null;

    if (!yearPrefix || !derivedGender) {
      return { gender: derivedGender, birth: null };
    }

    const year = yearPrefix + rrnFront.substring(0, 2);
    const month = rrnFront.substring(2, 4);
    const day = rrnFront.substring(4, 6);

    // TODO: 2월 30일 같은 비정상 날짜 검증 로직 추가
    const derivedBirth = `${year}-${month}-${day}`;

    return { gender: derivedGender, birth: derivedBirth };
  }, [rrnFront, rrnBackFirst]);
  // ------------------------------------------

  // 파생 상태 (유효성 검사)
  const isRrnFilled =
    rrnFront.length === 6 && rrnBackFirst.length === 1 && !!gender && !!birth;
  // 010으로 시작하는 11자리인지 검사
  const isPhoneFilled = phone.startsWith("010") && phone.length === 11;
  const isCodeFilled = code.length === 6;

  // <다음> 버튼 활성화 조건
  const isNextDisabled =
    !name || !isRrnFilled || !telecom || !isPhoneFilled || !isCodeFilled;

  // ----- 이벤트 핸들러 (API 호출) -----

  // (API) 인증번호 받기/재요청
  const handleRequestCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // 폼 제출 방지

    // 010 검증 통과 못하면 리턴
    if (!isPhoneFilled) {
      // TODO: 사용자에게 010으로 시작하는 11자리 쓰라는 알림
      return;
    }
    // 이름, 주민번호도 다 채워야 요청 가능
    if (!name || !isRrnFilled) {
      // TODO: 사용자에게 이름, 주민번호 안썼다는 알림
      return;
    }

    // TODO: 인증번호 발송 API 호출
    setIsCodeSent(true); // 인증번호 입력칸 표시
  };

  // (API) 폼 제출
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isNextDisabled) return;

    // TODO: 서버에 본인 확인 정보 및 인증번호 검증 요청
    router.push("/signup/terms");
  };

  // 페이지(View)에 필요한 모든 것을 반환
  return {
    // 폼 값
    formValues: {
      name,
      rrnFront,
      rrnBack: rrnBackFirst,
      telecom,
      phone,
      code,
    },
    setters: {
      setName,
      setRrnFront,
      setRrnBack: setRrnBackFirst,
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

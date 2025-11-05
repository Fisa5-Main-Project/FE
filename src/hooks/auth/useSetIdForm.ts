"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

// 메시지 색상을 위한 타입
type MessageState = {
  text: string;
  color: "text-primary" | "text-red-500" | "text-gray-2";
};

// TODO: 실제 API 연결로 대체하기
// 가짜 중복 확인 API (1초)
const fakeCheckIdApi = (id: string): Promise<{ isAvailable: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (id === "admin" || id === "test") {
        resolve({ isAvailable: false });
      } else {
        resolve({ isAvailable: true });
      }
    }, 1000);
  });
};

// 아이디 형식을 검사할 정규식 (영어, 숫자만 허용)
const ID_REGEX = /^[a-zA-Z0-9]+$/;

export function useSetIdForm() {
  const router = useRouter();

  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isIdCheckedAndAvailable, setIsIdCheckedAndAvailable] = useState(false);
  const [message, setMessage] = useState<MessageState>({
    text: "",
    color: "text-gray-2",
  });

  // ID 입력 핸들러
  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newId = e.target.value;
    setId(newId);

    // 아이디를 수정하면 <<중복 확인 통과>> 상태가 무효화되고,
    // 이전에 표시됐던 모든 메시지(형식 오류, API 결과)가 초기화
    setIsIdCheckedAndAvailable(false);
    setMessage({ text: "", color: "text-gray-2" });
  };

  // (API) 중복 확인 버튼 핸들러
  const handleDuplicateCheck = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    // 로딩 중이거나 빈칸이면 중지
    if (!id || isLoading) return;

    // 클라이언트측 형식 검사
    // ID_REGEX.test(id)가 false라면 (영어/숫자 외의 문자가 있다면)
    if (!ID_REGEX.test(id)) {
      setMessage({
        text: "영어와 숫자만 조합할 수 있습니다.",
        color: "text-red-500",
      });
      setIsIdCheckedAndAvailable(false); // <다음> 버튼 비활성화
      return; // API 요청 보내지 않고 종료
    }

    // 백엔드 API 중복 검사
    setIsLoading(true);
    setIsIdCheckedAndAvailable(false);
    setMessage({ text: "중복 확인 중...", color: "text-gray-2" });

    try {
      const { isAvailable } = await fakeCheckIdApi(id);

      if (isAvailable) {
        setMessage({
          text: "사용 가능한 아이디입니다.",
          color: "text-primary",
        });
        setIsIdCheckedAndAvailable(true);
      } else {
        setMessage({
          text: "이미 존재하는 아이디입니다.",
          color: "text-red-500",
        });
        setIsIdCheckedAndAvailable(false);
      }
    } catch (error) {
      setMessage({
        text: "확인 중 오류가 발생했습니다.",
        color: "text-red-500",
      });
      setIsIdCheckedAndAvailable(false);
    } finally {
      setIsLoading(false);
    }
  };

  // (API) <다음> 버튼 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isIdCheckedAndAvailable) return;
    router.push("/signup/set-password");
  };

  // --- 버튼 활성화 로직 ---

  // <중복 확인> 버튼 비활성화 조건
  const isDuplicateCheckDisabled = !id || isLoading || isIdCheckedAndAvailable;

  // <다음> 버튼 비활성화 조건
  const isNextDisabled = !isIdCheckedAndAvailable;

  return {
    id,
    message,
    isLoading,
    isDuplicateCheckDisabled,
    isNextDisabled,
    handlers: {
      handleIdChange,
      handleDuplicateCheck,
      handleSubmit,
    },
  };
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// 상속인 옵션 데이터 타입
export interface Heir {
  id: string;
  label: string;
  imgBase: string;
}

// 상속인 선택 목록
// TODO: 이미지 채우기
const heirOptions: Heir[] = [
  { id: "spouse", label: "배우자", imgBase: "spouse" },
  { id: "child", label: "자녀", imgBase: "child" },
  { id: "grandchild", label: "손자녀", imgBase: "grandchild" },
  { id: "father", label: "아버지", imgBase: "father" },
  { id: "mother", label: "어머니", imgBase: "mother" },
  { id: "grandfather", label: "할아버지", imgBase: "grandfather" },
  { id: "grandmother", label: "할머니", imgBase: "grandmother" },
  { id: "sibling", label: "형제 자매", imgBase: "sibling" },
  { id: "relative", label: "4촌 이내 혈족", imgBase: "relative" },
];

export const useFamilyCustom = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHeirs, setSelectedHeirs] = useState<Heir[]>([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 상속인 추가
  const addHeir = (heir: Heir) => {
    setSelectedHeirs((prev) => [...prev, heir]);
    closeModal(); // 추가 후 모달 닫기
  };

  // <다음> 버튼 클릭
  const handleNext = () => {
    // TODO: (API) 선택된 상속인 정보 저장
    router.push("/inheritance/ratio");
  };

  // 한 명이라도 추가해야 <다음> 버튼 활성화
  const isButtonDisabled = selectedHeirs.length === 0;

  return {
    isModalOpen,
    setIsModalOpen,
    openModal,
    addHeir,
    selectedHeirs,
    heirOptions,
    handleNext,
    isButtonDisabled,
  };
};

"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  useInheritanceStore,
  SelectedHeir,
} from "@/stores/inheritance/inheritanceStore";

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

  // Zustand store와 연동
  const storeHeirs = useInheritanceStore((state) => state.selectedHeirs);
  const setStoreHeirs = useInheritanceStore((state) => state.setSelectedHeirs);

  // store의 값으로 로컬 상태 초기화
  const [selectedHeirs, setSelectedHeirs] = useState<SelectedHeir[]>(storeHeirs);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 상속인 추가 (store와 동기화)
  const addHeir = useCallback(
    (heir: Heir) => {
      const newHeirInstance: SelectedHeir = {
        ...heir,
        uniqueId: crypto.randomUUID(),
      };
      const updatedHeirs = [...selectedHeirs, newHeirInstance];
      setSelectedHeirs(updatedHeirs); // 로컬 상태 업데이트
      setStoreHeirs(updatedHeirs); // store 업데이트
      closeModal();
    },
    [selectedHeirs, setStoreHeirs],
  );

  // 상속인 제거 (store와 동기화)
  const removeHeir = useCallback(
    (uniqueId: string) => {
      const updatedHeirs = selectedHeirs.filter((h) => h.uniqueId !== uniqueId);
      setSelectedHeirs(updatedHeirs); // 로컬 상태 업데이트
      setStoreHeirs(updatedHeirs); // store 업데이트
    },
    [selectedHeirs, setStoreHeirs],
  );

  // <다음> 버튼 클릭
  const handleNext = () => {
    // store는 이미 최신 상태이므로 페이지 이동만 처리
    router.push("/inheritance/ratio");
  };

  // 한 명이라도 추가해야 <다음> 버튼 활성화
  const isButtonDisabled = selectedHeirs.length === 0;

  return {
    isModalOpen,
    setIsModalOpen,
    openModal,
    addHeir,
    removeHeir, // UI에서 사용할 수 있도록 반환
    selectedHeirs,
    heirOptions,
    handleNext,
    isButtonDisabled,
  };
};

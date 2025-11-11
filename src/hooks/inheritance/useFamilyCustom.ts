// hooks/inheritance/useFamilyCustom.ts

"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  useInheritanceStore,
  SelectedHeir,
} from "@/stores/inheritance/inheritanceStore";

export interface Heir {
  id: string;
  label: string;
  imgBase: string;
}

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
  const [isModalOpen, setIsModalOpen] = useState(false); // [!!!] 수정: 로컬 state 대신 Zustand store 상태를 직접 사용합니다.

  const selectedHeirs = useInheritanceStore((state) => state.selectedHeirs);
  const setStoreHeirs = useInheritanceStore((state) => state.setSelectedHeirs);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false); // 상속인 추가 (store 직접 업데이트)

  const addHeir = useCallback(
    (heir: Heir) => {
      const newHeirInstance: SelectedHeir = {
        ...heir,
        uniqueId: crypto.randomUUID(),
      }; // [!!!] 수정: store state를 기반으로 새 배열을 만들어 store에 저장
      setStoreHeirs([...selectedHeirs, newHeirInstance]);
      closeModal();
    },
    [selectedHeirs, setStoreHeirs] // closeModal은 상태가 아니므로 의존성에서 제외 가능
  ); // 상속인 제거 (store 직접 업데이트)

  const removeHeir = useCallback(
    (uniqueId: string) => {
      // [!!!] 수정: store state를 기반으로 필터링하여 store에 저장
      const updatedHeirs = selectedHeirs.filter((h) => h.uniqueId !== uniqueId);
      setStoreHeirs(updatedHeirs);
    },
    [selectedHeirs, setStoreHeirs]
  );

  const handleNext = () => {
    router.push("/inheritance/ratio");
  };

  const isButtonDisabled = selectedHeirs.length === 0;

  return {
    isModalOpen,
    setIsModalOpen,
    openModal,
    addHeir,
    removeHeir, // UI에서 사용할 수 있도록 반환
    selectedHeirs, // store에서 직접 가져온 최신 목록
    heirOptions,
    handleNext,
    isButtonDisabled,
  };
};

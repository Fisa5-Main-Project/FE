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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedHeirs = useInheritanceStore((state) => state.selectedHeirs);
  const setStoreHeirs = useInheritanceStore((state) => state.setSelectedHeirs);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const addHeir = useCallback(
    (heir: Heir) => {
      const newHeirInstance: SelectedHeir = {
        ...heir,
        uniqueId: crypto.randomUUID(),
      };
      setStoreHeirs([...selectedHeirs, newHeirInstance]);
      closeModal();
    },
    [selectedHeirs, setStoreHeirs]
  );

  const removeHeir = useCallback(
    (uniqueId: string) => {
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
    removeHeir,
    selectedHeirs,
    heirOptions,
    handleNext,
    isButtonDisabled,
  };
};

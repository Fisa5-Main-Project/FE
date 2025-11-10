"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type FamilyType =
  | "BIG_FAM"
  | "FAM"
  | "TWO"
  | "ALONE"
  | "SIBLINGS"
  | "CUSTOM";

interface FamilyOption {
  id: FamilyType;
  label: string;
  imgBase: string; // 이미지 파일명의 기본 부분 (ex. bigFam)
  isCustom: boolean;
}

const familyOptions: FamilyOption[] = [
  { id: "BIG_FAM", label: "다둥이 가족", imgBase: "bigFam", isCustom: false },
  { id: "FAM", label: "자녀 둘", imgBase: "fam", isCustom: false },
  { id: "TWO", label: "둘이서", imgBase: "two", isCustom: false },
  { id: "ALONE", label: "혼자서", imgBase: "alone", isCustom: false },
  { id: "SIBLINGS", label: "형제자매", imgBase: "siblings", isCustom: false },
  { id: "CUSTOM", label: "직접설정", imgBase: "", isCustom: true },
];

export const useFamilySelection = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<FamilyType | null>(null);

  // 유형 선택 핸들러
  const handleSelect = (type: FamilyType) => {
    setSelectedType(type);
  };

  // 다음 버튼 클릭 핸들러
  const handleNext = () => {
    if (!selectedType) return;

    if (selectedType === "CUSTOM") {
      router.push("/inheritance/family-custom");
    } else {
      router.push("/inheritance/ratio");
    }
  };

  const isButtonDisabled = selectedType === null;

  return {
    selectedType,
    familyOptions,
    handleSelect,
    handleNext,
    isButtonDisabled,
  };
};

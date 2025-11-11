// hooks/inheritance/useFamilySelection.ts

"use client";

import { useState } from "react";
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

export type FamilyType =
  | "BIG_FAM"
  | "FAM"
  | "TWO"
  | "ONE" // "ALONE" 대신 "ONE"으로 수정 (아래 familyOptions와 맞춤)
  | "SIBLINGS"
  | "CUSTOM";

interface FamilyOption {
  id: FamilyType;
  label: string;
  imgBase: string;
  isCustom: boolean;
}

const familyOptions: FamilyOption[] = [
  { id: "BIG_FAM", label: "다둥이 가족", imgBase: "bigFam", isCustom: false },
  { id: "FAM", label: "자녀 둘", imgBase: "fam", isCustom: false },
  { id: "TWO", label: "둘이서", imgBase: "two", isCustom: false },
  { id: "ONE", label: "자녀 하나", imgBase: "alone", isCustom: false }, // ID가 "ONE"
  { id: "SIBLINGS", label: "형제자매", imgBase: "siblings", isCustom: false },
  { id: "CUSTOM", label: "직접설정", imgBase: "", isCustom: true },
];

const familyStructureMap: Record<
  Exclude<FamilyType, "CUSTOM">,
  Heir["id"][]
> = {
  BIG_FAM: ["spouse", "child", "child", "child"],
  FAM: ["spouse", "child", "child"],
  TWO: ["spouse"],
  ONE: ["spouse", "child"],
  SIBLINGS: ["sibling", "sibling"],
};

const findHeir = (id: Heir["id"]): Heir | undefined =>
  heirOptions.find((h) => h.id === id);

export const useFamilySelection = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<FamilyType | null>(null);
  const setSelectedHeirs = useInheritanceStore(
    (state) => state.setSelectedHeirs
  ); // resetInheritance는 여기서는 사용되지 않으므로 제거 가능 // const resetInheritance = useInheritanceStore( //   (state) => state.resetInheritance // );
  const handleSelect = (type: FamilyType) => {
    setSelectedType(type);

    if (type === "CUSTOM") {
      setSelectedHeirs([]);
    } else {
      const structure = familyStructureMap[type];
      const heirs: SelectedHeir[] = structure
        .map((heirId) => {
          const heirData = findHeir(heirId);
          if (!heirData) return null;
          return {
            ...heirData,
            uniqueId: crypto.randomUUID(),
          };
        })
        .filter((h): h is SelectedHeir => h !== null);

      setSelectedHeirs(heirs);
    }
  };

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

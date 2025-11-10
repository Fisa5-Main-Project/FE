"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useInheritanceStore,
  SelectedHeir,
} from "@/stores/inheritance/inheritanceStore";

// NOTE: 아래 타입과 데이터는 여러 훅에서 중복 사용되고 있습니다.
// 추후 `types` 또는 `constants` 폴더의 공통 파일로 분리하는 리팩토링을 권장합니다.
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
// --- 중복 끝 ---

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
  imgBase: string;
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

// FamilyType에 따른 상속인 구조 정의
const familyStructureMap: Record<Exclude<FamilyType, "CUSTOM">, Heir["id"][]> =
  {
    BIG_FAM: ["spouse", "child", "child", "child"],
    FAM: ["spouse", "child", "child"],
    TWO: ["spouse", "child"],
    ALONE: ["child"], // NOTE: '혼자서'의 정책을 '자녀 1명'으로 가정
    SIBLINGS: ["sibling", "sibling"],
  };

// id로 Heir 정보 찾기
const findHeir = (id: Heir["id"]): Heir | undefined =>
  heirOptions.find((h) => h.id === id);

export const useFamilySelection = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<FamilyType | null>(null);
  const setSelectedHeirs = useInheritanceStore(
    (state) => state.setSelectedHeirs,
  );
  const resetInheritance = useInheritanceStore(
    (state) => state.resetInheritance,
  );

  // 유형 선택 핸들러
  const handleSelect = (type: FamilyType) => {
    setSelectedType(type);

    if (type === "CUSTOM") {
      // "직접 설정" 선택 시, 상속인 목록 초기화
      setSelectedHeirs([]);
    } else {
      // 미리 정의된 상속인 목록을 생성하여 store에 저장
      const structure = familyStructureMap[type];
      const heirs: SelectedHeir[] = structure
        .map((heirId) => {
          const heirData = findHeir(heirId);
          if (!heirData) return null; // heirData가 없으면 null 반환
          return {
            ...heirData,
            uniqueId: crypto.randomUUID(),
          };
        })
        .filter((h): h is SelectedHeir => h !== null); // null이 아닌 항목만 필터링

      setSelectedHeirs(heirs);
    }
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

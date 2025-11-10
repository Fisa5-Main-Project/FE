import { create } from "zustand";
import { Heir } from "@/hooks/inheritance/useFamilyCustom";

// 자녀 2번 고른 경우 동시에 비율 설정 움직이지 않게 하기 위해서
export type SelectedHeir = Heir & { uniqueId: string };

// state와 actions 정의
interface InheritanceState {
  totalAsset: number;
  selectedHeirs: SelectedHeir[];
  ratios: Record<string, number>;
  setTotalAsset: (amount: number) => void;
  setSelectedHeirs: (heirs: SelectedHeir[]) => void;
  setRatios: (ratios: Record<string, number>) => void;
  resetInheritance: () => void;
}

const initialState = {
  // 총 자산을 0으로 초기화
  totalAsset: 0,
  selectedHeirs: [],
  ratios: {},
};

export const useInheritanceStore = create<InheritanceState>((set) => ({
  ...initialState,

  // 자산 설정 (amount 페이지에서 호출)
  setTotalAsset: (amount) => set({ totalAsset: amount }),

  // 상속인 목록 설정 (family 또는 family-custom 페이지에서 호출)
  setSelectedHeirs: (heirs) => set({ selectedHeirs: heirs }),

  setRatios: (ratios) => set({ ratios: ratios }),

  // 스토어 리셋
  resetInheritance: () => set(initialState),
}));

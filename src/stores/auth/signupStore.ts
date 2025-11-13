import { create } from "zustand";
import type { TermAgreement } from "@/types/signup";

// 최종 제출에 필요한 정보들
interface SignupData {
  verificationId?: string; // [1단계 본인확인] 정보
  termAgreements: TermAgreement[]; // [2단계 약관] 정보
}

interface SignupStore {
  data: SignupData;
  setVerificationId: (id: string) => void;
  setTermAgreements: (agreements: TermAgreement[]) => void;
  clearData: () => void;
}

const initialState: SignupData = {
  verificationId: undefined,
  termAgreements: [],
};

export const useSignupStore = create<SignupStore>((set) => ({
  data: initialState,
  setVerificationId: (id) =>
    set((state) => ({
      data: { ...state.data, verificationId: id },
    })),
  setTermAgreements: (agreements) =>
    set((state) => ({
      data: { ...state.data, termAgreements: agreements },
    })),
  clearData: () => set({ data: initialState }),
}));

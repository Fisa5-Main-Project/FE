import { create } from "zustand";
import type { TermAgreement } from "@/types/signup";

// 최종 제출에 필요한 정보들
interface SignupData {
  verificationId?: string; // [1단계 본인확인] 정보
  termAgreements: TermAgreement[]; // [2단계 약관] 정보
  loginId?: string; // [3단계 아이디 설정]
}

interface SignupStore {
  data: SignupData;
  setVerificationId: (id: string) => void;
  setTermAgreements: (agreements: TermAgreement[]) => void;
  setLoginId: (id: string) => void;
  clearData: () => void;
}

const initialState: SignupData = {
  verificationId: undefined,
  termAgreements: [],
  loginId: undefined,
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
  setLoginId: (id) =>
    set((state) => ({
      data: { ...state.data, loginId: id },
    })),
  clearData: () => set({ data: initialState }),
}));

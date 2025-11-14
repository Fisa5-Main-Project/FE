import { create } from "zustand";
import type { TermAgreement } from "@/types/signup";
import type { FinancialType } from "@/app/(auth)/signup/profile/financial/financial.constants";

// 최종 제출에 필요한 정보들
interface SignupData {
  verificationId?: string; // [1단계 본인확인] 정보
  termAgreements: TermAgreement[]; // [2단계 약관] 정보
  loginId?: string; // [3단계 아이디 설정]
  password?: string; // [4단계 비밀번호 설정]
  financialPropensity?: FinancialType; // [5단계 자금운용성향 추가]
  signupToken?: string; // 소셜 로그인 시 발급 받는 토큰
}

interface SignupStore {
  data: SignupData;
  setVerificationId: (id: string) => void;
  setTermAgreements: (agreements: TermAgreement[]) => void;
  setLoginId: (id: string) => void;
  setPassword: (password: string) => void;
  setFinancialPropensity: (propensity: FinancialType) => void;
  setSignupToken: (token: string) => void;
  clearData: () => void;
}

const initialState: SignupData = {
  verificationId: undefined,
  termAgreements: [],
  loginId: undefined,
  password: undefined,
  financialPropensity: undefined,
  signupToken: undefined,
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
  setPassword: (password) =>
    set((state) => ({
      data: { ...state.data, password: password },
    })),
  setFinancialPropensity: (propensity) =>
    set((state) => ({
      data: { ...state.data, financialPropensity: propensity },
    })),
  setSignupToken: (token) =>
    set((state) => ({
      data: { ...state.data, signupToken: token },
    })),
  clearData: () => set({ data: initialState }),
}));

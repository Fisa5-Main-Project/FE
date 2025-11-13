import { create } from "zustand";

// 최종 제출에 필요한 정보들
interface SignupData {
  verificationId?: string; // [1단계 본인확인] 정보
}

interface SignupStore {
  data: SignupData;
  setVerificationId: (id: string) => void;
  clearData: () => void;
}

export const useSignupStore = create<SignupStore>((set) => ({
  data: {},
  setVerificationId: (id) =>
    set((state) => ({
      data: { ...state.data, verificationId: id },
    })),
  clearData: () => set({ data: {} }),
}));

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 약관 동의 항목 타입
interface Agreement {
  id: string;
  isChecked: boolean;
}

// 스토어의 상태(state)와 액션(actions)에 대한 타입 정의
interface MyDataState {
  userName: string | null;
  agreements: Agreement[];
  assets: {
    realEstate: string;
    car: string;
  };
  setUserName: (name: string) => void;
  toggleAgreement: (id: string, isChecked: boolean) => void;
  setAllAgreements: (isChecked: boolean) => void;
  setAssets: (assetType: 'realEstate' | 'car', value: string) => void;
  reset: () => void;
}

const initialState = {
  userName: null,
  agreements: [
    { id: 'terms1', isChecked: false },
    { id: 'terms2', isChecked: false },
    { id: 'terms3', isChecked: false },
  ],
  assets: {
    realEstate: '',
    car: '',
  },
};

/**
 * 마이데이터 연동 플로우의 전역 상태를 관리하는 Zustand 스토어입니다.
 * - 아키텍처: `hooks/mydata/`에 위치하여 'mydata' 도메인의 핵심 로직임을 명시합니다.
 * - persist 미들웨어: 사용자가 새로고침해도 데이터가 유지되도록 sessionStorage에 상태를 저장합니다.
 */
export const useMyDataStore = create<MyDataState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setUserName: (name) => set({ userName: name }),
      toggleAgreement: (id, isChecked) => set(state => ({
        agreements: state.agreements.map(a => a.id === id ? { ...a, isChecked } : a),
      })),
      setAllAgreements: (isChecked) => set(state => ({
        agreements: state.agreements.map(a => ({ ...a, isChecked })),
      })),
      setAssets: (assetType, value) => set(state => ({
        assets: { ...state.assets, [assetType]: value },
      })),
      reset: () => set(initialState),
    }),
    {
      name: 'mydata-storage', // 스토리지에 저장될 때 사용될 키 이름
      getStorage: () => sessionStorage,
    }
  )
);

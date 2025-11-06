'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// --- 1. 타입 정의 ---
interface Agreement {
  id: string;
  isChecked: boolean;
}

interface MyDataState {
  userName: string | null;
  agreements: Agreement[];
  assets: {
    realEstate: string; // 입력 필드는 string 값을 사용하므로 string으로 유지
    car: string;
  };
  workingMonths: number | null; // 근속 기간(월)
  annualIncome: number | null; // 연 소득(원)
}

// 액션 타입 정의
type Action = 
  | { type: 'SET_USER_NAME'; payload: string }
  | { type: 'TOGGLE_AGREEMENT'; payload: { id: string; isChecked: boolean } }
  | { type: 'SET_ALL_AGREEMENTS'; payload: boolean }
  | { type: 'SET_ASSET'; payload: { assetType: 'realEstate' | 'car'; value: string } }
  | { type: 'SET_WORKING_MONTHS'; payload: number }
  | { type: 'SET_ANNUAL_INCOME'; payload: number }
  | { type: 'RESET' };

// Context에서 제공할 값의 타입
interface MyDataContextType {
  state: MyDataState;
  dispatch: React.Dispatch<Action>;
}

// --- 2. 초기 상태 ---
const initialState: MyDataState = {
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
  workingMonths: null,
  annualIncome: null,
};

// --- 3. 리듀서 함수 ---
const myDataReducer = (state: MyDataState, action: Action): MyDataState => {
  switch (action.type) {
    case 'SET_USER_NAME':
      return { ...state, userName: action.payload };
    case 'TOGGLE_AGREEMENT':
      return {
        ...state,
        agreements: state.agreements.map(a => 
          a.id === action.payload.id ? { ...a, isChecked: action.payload.isChecked } : a
        ),
      };
    case 'SET_ALL_AGREEMENTS':
      return {
        ...state,
        agreements: state.agreements.map(a => ({ ...a, isChecked: action.payload })),
      };
    case 'SET_ASSET':
      return {
        ...state,
        assets: { ...state.assets, [action.payload.assetType]: action.payload.value },
      };
    case 'SET_WORKING_MONTHS':
      return { ...state, workingMonths: action.payload };
    case 'SET_ANNUAL_INCOME':
      return { ...state, annualIncome: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

// --- 4. Context 생성 ---
const MyDataContext = createContext<MyDataContextType | undefined>(undefined);

// --- 5. Provider 컴포넌트 ---
export const MyDataProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(myDataReducer, initialState);

  return (
    <MyDataContext.Provider value={{ state, dispatch }}>
      {children}
    </MyDataContext.Provider>
  );
};

// --- 6. 커스텀 훅 ---
export const useMyDataContext = () => {
  const context = useContext(MyDataContext);
  if (context === undefined) {
    throw new Error('useMyDataContext must be used within a MyDataProvider');
  }
  return context;
};

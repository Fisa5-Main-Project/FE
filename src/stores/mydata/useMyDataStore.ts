import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Agreement 타입 정의 (Context와 동일하게 유지)
interface Agreement {
    id: string;
    isChecked: boolean;
    required: boolean; // required 속성 추가
}

// 스토어의 전체 상태 및 액션 타입 정의
interface MyDataState {
    userName: string | null;
    agreements: Agreement[];
    assets: {
        realEstate: string; // string 타입으로 최종 결정
        car: string;
    };
    // Actions
    setUserName: (name: string) => void;
    toggleAgreement: (id: string, isChecked: boolean) => void;
    setAllAgreements: (isChecked: boolean) => void;
    setAssets: (assetType: 'realEstate' | 'car', value: string) => void;
    reset: () => void;
}

const initialState: Partial<MyDataState> = {
    userName: null,
    agreements: [
        { id: 'terms1', isChecked: false, required: true },
        { id: 'terms2', isChecked: false, required: true },
        { id: 'terms3', isChecked: false, required: false },
    ],
    assets: {
        realEstate: '',
        car: '',
    },
};

/**
 * 마이데이터 플로우의 전역 상태를 관리하는 Zustand 스토어입니다.
 */
export const useMyDataStore = create<MyDataState>()(
    persist(
        (set, _get) => ({ // _get으로 변경하여 ESLint 경고 방지
            ...initialState as MyDataState, 

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
            
            reset: () => set(initialState as MyDataState),
        }),
        {
            name: 'mydata-storage', 
            // Zustand persist 미들웨어의 storage 설정
            storage: {
                getItem: (name) => {
                    const str = sessionStorage.getItem(name);
                    return str ? JSON.parse(str) : null;
                },
                setItem: (name, value) => {
                    sessionStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name) => sessionStorage.removeItem(name),
            },
        }
    )
);
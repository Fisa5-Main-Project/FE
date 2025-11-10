import * as React from 'react';
import { useMyDataStore } from '@/stores/mydata/useMyDataStore';
import { useRouter } from 'next/navigation';

// UI에만 필요한 정적 약관 정의 (MyDataStore에서 사용되는 것과 동일)
const MYDATA_AGREEMENT_DEFINITIONS = [
    { id: 1, text: '개인정보 수집 및 이용 안내', required: true },
    { id: 2, text: '개인정보 수집 및 이용 안내', required: true },
    { id: 3, text: '개인정보 수집 및 이용 안내', required: false },
];

/**
 * 마이데이터 약관 동의 폼 로직을 캡슐화하는 훅입니다.
 * Zustand 스토어와 연동하여 데이터와 핸들러를 제공합니다.
 */
export const useMyDataTermsForm = () => {
    const router = useRouter();

    // 1. Zustand 스토어에서 상태와 액션을 가져옵니다.
    const agreementsState = useMyDataStore(state => state.agreements);
    const setAllAgreements = useMyDataStore(state => state.setAllAgreements);
    const toggleAgreement = useMyDataStore(state => state.toggleAgreement);

    // 2. UI 렌더링을 위한 데이터 가공 (useMemo)
    const terms = React.useMemo(() =>
        MYDATA_AGREEMENT_DEFINITIONS.map(def => {
            const match = def.text.match(/^(\(.*?\))\s*(.*)$/);
            const prefix = match ? match[1] : '';
            const mainText = match ? match[2] : def.text;
            const prefixColor = prefix === '(필수)' ? 'text-[#0064FF]' : 'text-secondary';

            return {
                ...def,
                // 스토어의 체크 상태를 찾아서 연결
                isChecked: agreementsState.find(s => s.id === def.id)?.isChecked || false,
                // UI 렌더링에 필요한 파싱된 데이터 추가
                prefix,
                mainText,
                prefixColor,
            };
        }),
        [agreementsState]
    );

    // 3. 전체 동의 및 다음 버튼 활성화 상태 계산
    const checkedTerms = new Set(terms.filter(t => t.isChecked).map(t => t.id));
    const isAllChecked = terms.every(t => t.isChecked);
    const isNextDisabled = !terms.filter(t => t.required).every(t => t.isChecked);

    // --- Handlers ---

    const handleCheckAll = (checked: boolean) => {
        setAllAgreements(checked);
    };

    const handleCheckTerm = (id: number, checked: boolean) => {
        toggleAgreement(id, checked);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // 다음 Step인 Loading 페이지로 라우팅
        router.push('/mydata/loading');
    };

    return {
        terms,
        checkedTerms,
        isNextDisabled,
        isAllChecked,
        handlers: {
            handleSubmit,
            handleCheckAll,
            handleCheckTerm,
        },
    };
};
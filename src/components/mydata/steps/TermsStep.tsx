'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useMyDataStore } from '@/hooks/mydata/useMyDataStore';
import Button from '@/components/common/Button';

// UI에만 필요한 정적 데이터
const AGREEMENT_DEFINITIONS = [
  { id: 'terms1', text: '[필수] 개인정보 수집 및 이용 안내', required: true },
  { id: 'terms2', text: '[필수] 개인정보 수집 및 이용 안내', required: true },
  { id: 'terms3', text: '[선택] 개인정보 수집 및 이용 안내', required: false },
];

/**
 * 약관 동의 단계 컴포넌트 (수정됨)
 * - 상태관리: '동의 여부'는 Zustand 스토어에서, '약관 내용'은 컴포넌트 내부에서 관리하여 분리.
 */
const TermsStep = () => {
  const router = useRouter();
  
  // Zustand 스토어에서 상태와 액션을 가져옵니다.
  const { agreements: agreementState, toggleAgreement, setAllAgreements } = useMyDataStore();

  // UI 렌더링을 위해 정적 데이터와 스토어의 상태를 결합합니다.
  const agreements = useMemo(() => 
    AGREEMENT_DEFINITIONS.map(def => ({
      ...def,
      isChecked: agreementState.find(s => s.id === def.id)?.isChecked || false,
    })),
    [agreementState]
  );

  const allAgreed = useMemo(() => agreements.every(a => a.isChecked), [agreements]);

  const handleAllAgreedChange = () => {
    const newValue = !allAgreed;
    setAllAgreements(newValue);
  };

  const handleAgreementChange = (id: string, isChecked: boolean) => {
    toggleAgreement(id, isChecked);
  };

  const isNextDisabled = useMemo(() =>
    !agreements.filter(a => a.required).every(a => a.isChecked),
    [agreements]
  );

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold leading-relaxed md:text-3xl">
        서비스 이용을 위한
        <br />
        필수 동의 목록이에요.
      </h1>
      <div className="mt-8 flex-grow">
        <div className="flex items-center mb-4 p-2">
          <input
            type="checkbox"
            id="all-agree"
            checked={allAgreed}
            onChange={handleAllAgreedChange}
            className="h-6 w-6 cursor-pointer"
          />
          <label htmlFor="all-agree" className="ml-3 text-lg font-semibold cursor-pointer">
            전체 동의
          </label>
        </div>
        <hr />
        <div className="mt-4 space-y-2">
          {agreements.map(agreement => (
            <div key={agreement.id} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={agreement.id}
                  checked={agreement.isChecked}
                  onChange={(e) => handleAgreementChange(agreement.id, e.target.checked)}
                  className="h-5 w-5 cursor-pointer"
                />
                <label htmlFor={agreement.id} className="ml-3 text-base cursor-pointer">
                  {agreement.text}
                </label>
              </div>
              <button className="text-gray-500 text-xl p-2" aria-label={`${agreement.text} 상세보기`} onClick={() => { /* TODO: 상세 페이지로 이동 */ }}>{' > '}</button>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto w-full">
        <Button onClick={() => router.push('/mydata/loading')} disabled={isNextDisabled} >
          다음
        </Button>
      </div>
    </div>
  );
};

export default TermsStep;

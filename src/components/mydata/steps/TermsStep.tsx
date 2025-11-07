'use client';

import { useMemo } from 'react';
import { useMyDataContext } from '@/context/MyDataContext';
import Checkbox from '@/components/common/Checkbox';

// UI에만 필요한 정적 데이터
const AGREEMENT_DEFINITIONS = [
  { id: 'terms1', text: '(필수) 개인정보 수집 및 이용 안내', required: true },
  { id: 'terms2', text: '(필수) 개인정보 수집 및 이용 안내', required: true },
  { id: 'terms3', text: '(선택) 개인정보 수집 및 이용 안내', required: false },
];

/**
 * 약관 동의 단계 컴포넌트 (수정됨)
 * - 상태관리: '동의 여부'는 Context에서, '약관 내용'은 컴포넌트 내부에서 관리하여 분리.
 */
const TermsStep = () => {

  // Context에서 상태와 dispatch 함수를 가져옵니다.
  const { state, dispatch } = useMyDataContext();
  const { agreements: agreementState } = state;

  // UI 렌더링을 위해 정적 데이터와 컨텍스트의 상태를 결합합니다.
  const agreements = useMemo(() =>
    AGREEMENT_DEFINITIONS.map(def => {

      const match = def.text.match(/^(\(.*?\))\s*(.*)$/);
      const prefix = match ? match[1] : ''; // e.g., "(필수)"
      const mainText = match ? match[2] : def.text; // e.g., "개인정보 수집 및 이용 안내"

      // ✅ 색상 분기 처리: (필수)일 때만 #0064FF 적용
      const prefixColor = prefix === '(필수)' ? 'text-primary-dark' : 'text-secondary';

      return {
      ...def,
      isChecked: agreementState.find(s => s.id === def.id)?.isChecked || false,
      // 파싱된 결과를 useMemo 결과 객체에 저장
      prefix,
      mainText,
      prefixColor,
      };
    }),
  [agreementState]
  );

const allAgreed = useMemo(() => agreements.every(a => a.isChecked), [agreements]);

const handleAllAgreedChange = () => {
  const newValue = !allAgreed;
  dispatch({ type: 'SET_ALL_AGREEMENTS', payload: newValue });
};

const handleAgreementChange = (id: string, isChecked: boolean) => {
  dispatch({ type: 'TOGGLE_AGREEMENT', payload: { id, isChecked } });
};

const isNextDisabled = useMemo(() =>
  !agreements.filter(a => a.required).every(a => a.isChecked),
  [agreements]
);

return (
  <div className="flex flex-col h-full">
    <h1 className="mt-[4.875rem] text-[2rem] font-bold leading-normal text-secondary mb-[100px]">
      서비스 이용을 위한
      <br />
      필수 동의 목록이에요.
    </h1>

    <div className="flex-grow">
      <div className="flex items-center">
        <Checkbox
          id="all-agree"
          checked={allAgreed}
          onCheckedChange={handleAllAgreedChange}
          className="cursor-pointer"
        />
        <div className="ml-3">
          <label htmlFor="all-agree" className="block text-[20px] font-semibold cursor-pointer text-secondary">
            전체 동의
          </label>

          <p className="text-base text-gray-2 mt-0.5">선택 항목을 포함하여 모두 동의합니다.</p>
        
        </div>
      </div>

      <hr className="my-4 border-t-2 border-gray-200" /> {/* 굵은 구분선 추가 및 간격 확보 */}

      <div className="mt-[36px] space-y-4">
        {agreements.map(agreement => {
          return (
            <div key={agreement.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center">
                <Checkbox
                  id={agreement.id}
                  checked={agreement.isChecked}
                  onCheckedChange={(isChecked: boolean) => handleAgreementChange(agreement.id, isChecked)}
                  className="cursor-pointer"
                />
                {/* 개별 항목 텍스트: 20px 및 Secondary 색상 유지 */}
                <label htmlFor={agreement.id} className="ml-3 text-[20px] cursor-pointer text-secondary">
                  {/* ✅ [필수]일 경우에만 #0064FF 적용 */}
                  <span className={agreement.prefixColor}>{agreement.prefix}</span>{' '}
                  {/* 본문 텍스트는 Secondary 색상 유지 */}
                  <span>{agreement.mainText}</span>
                </label>
              </div>
              <button className="text-gray-500 text-lg font-bold p-1" aria-label={`${agreement.text} 상세보기`} onClick={() => { /* TODO: 상세 페이지로 이동 */ }}>{' > '}</button>
            </div>
          )
        })}
      </div>
    </div>

  </div>
);
};

export default TermsStep;

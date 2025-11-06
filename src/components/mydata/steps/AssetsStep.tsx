'use client';

import Image from 'next/image';
import Button from '@/components/common/Button';
import AmountInput from '@/components/common/AmountInput';
import { useMyDataContext } from '@/context/MyDataContext';

interface AssetsStepProps {
  onNext: () => void;
}

/**
 * 부동산 및 자동차 자산 정보 입력 단계 컴포넌트입니다.
 * - 'use client': 사용자 입력을 위한 Context 훅을 사용하므로 클라이언트 컴포넌트입니다.
 * - 접근성(A11y): label과 input을 명확히 연결하고, 시각적 계층을 개선합니다.
 */
const AssetsStep = ({ onNext }: AssetsStepProps) => {
  const { state, dispatch } = useMyDataContext();
  const { assets } = state;

  const isNextButtonEnabled = assets.realEstate !== '' && assets.car !== '';

  const handleAssetChange = (assetType: 'realEstate' | 'car', value: string) => {
    dispatch({ type: 'SET_ASSET', payload: { assetType, value } });
  };

  return (
    <div className="flex flex-col h-full">
      <div  className='mt-[81px]'>
        <h1 className="text-[32px] font-medium leading-relaxed text-secondary">
          <strong className="font-bold">부동산 및 자동차</strong>
          <br />
          자산 정보를 입력해주세요.
        </h1>
      </div>

      <div className="mt-[22px] space-y-4 flex-grow">
        <div>
          <label htmlFor="real-estate" className="block text-[20px] font-semibold text-secondary mb-2">
            부동산
          </label>
          <AmountInput
            id="real-estate"
            value={assets.realEstate ? assets.realEstate.toString() : ''}
            onChange={(e) => handleAssetChange('realEstate', e.target.value)}
            placeholder="0원"
            aria-label="부동산 금액 입력"
          />
        </div>
        <div>
          <label htmlFor="car" className="block text-[20px] font-medium text-gray-800 mb-2">
            자동차
          </label>
          <AmountInput
            id="car"
            value={assets.car ? assets.car.toString() : ''}
            onChange={(e) => handleAssetChange('car', e.target.value)}
            placeholder="0원"
            aria-label="자동차 금액 입력"
          />
        </div>
      </div>
      <div className="mt-auto w-full flex flex-col gap-2">
        <Button onClick={onNext} variant="primary">
          건너뛰기
        </Button>
        <Button onClick={onNext} disabled={!isNextButtonEnabled}>
          다음
        </Button>
      </div>
    </div>
  );
};

export default AssetsStep;
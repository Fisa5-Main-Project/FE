'use client';

import Image from 'next/image';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
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

  const isNextButtonEnabled = !!assets.realEstate && !!assets.car;

  const handleAssetChange = (assetType: 'realEstate' | 'car', value: string) => {
    dispatch({ type: 'SET_ASSET', payload: { assetType, value } });
  };

  return (
    <div className="flex flex-col h-full">
      <div>
        <h1 className="text-2xl font-bold leading-relaxed md:text-3xl">
          부동산 및 자동차
          <br />
          자산 정보를 입력해주세요.
        </h1>
        <div className="my-8 flex justify-center">
          {/* 이미지 실제 경로는 /public/images/mydata/assets.png 와 같아야 합니다. */}
          <Image 
            src="/mydata/assets.png" 
            alt="부동산 및 자동차 자산" 
            width={192} 
            height={192} 
          />
        </div>
      </div>
      <div className="mt-8 space-y-6 flex-grow">
        <div>
          <label htmlFor="real-estate" className="block text-lg font-medium text-gray-800 mb-2">
            부동산
          </label>
          <Input
            id="real-estate"
            type="number"
            value={assets.realEstate}
            onChange={(e) => handleAssetChange('realEstate', e.target.value)}
            placeholder="0원"
            aria-label="부동산 금액 입력"
          />
        </div>
        <div>
          <label htmlFor="car" className="block text-lg font-medium text-gray-800 mb-2">
            자동차
          </label>
          <Input
            id="car"
            type="number"
            value={assets.car}
            onChange={(e) => handleAssetChange('car', e.target.value)}
            placeholder="0원"
            aria-label="자동차 금액 입력"
          />
        </div>
      </div>
      <div className="mt-auto w-full">
        <Button onClick={onNext} disabled={!isNextButtonEnabled}>
          다음
        </Button>
      </div>
    </div>
  );
};

export default AssetsStep;
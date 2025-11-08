// src/components/asset/LoadingStep.tsx

'use client';

import { useState, useEffect } from 'react';
import CircularProgressBar from '@/components/common/CircularProgressBar';

interface LoadingStepProps {
    onComplete: () => void;
}

const LoadingStep = ({ onComplete }: LoadingStepProps) => {
    const [progress, setProgress] = useState(0);

    // ... useEffect 훅 (동일) ...
    // Effect 1
    useEffect(() => {
        const PROGRESS_INTERVAL = 50; // ms
        const interval = setInterval(() => {
            setProgress((prev) => (prev >= 100 ? 100 : prev + 1));
        }, PROGRESS_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    // Effect 2
    useEffect(() => {
        if (progress >= 100) {
            const timer = setTimeout(onComplete, 500);
            return () => clearTimeout(timer);
        }
    }, [progress, onComplete]);

    return (
        // [수정]
        // 1. 'h-full' 추가: PageContent의 전체 높이를 채웁니다.
        // 2. 'justify-center' 추가: 자식 아이템들을 그룹으로 묶어 수직 중앙 정렬합니다.
        // 3. 'items-center'로 변경: 텍스트를 제외한 스피너/상태 바의 수평 정렬을 일관되게 관리합니다.
        <div className='w-full flex flex-col items-center h-full justify-center'>
            {/* [수정] 'pt-[4.875rem]' 제거. 
              'w-full'을 유지하여 텍스트는 왼쪽 정렬을 유지합니다. 
              (items-center의 자식이므로 w-full이 없으면 텍스트도 중앙 정렬됨)
            */}
            <div className='w-full'>
                <h1 className='text-[2rem] text-secondary font-bold'>
                    정보를 불러오는 중이에요.
                </h1>
                <p className='text-gray-2 text-[1.25rem] mt-2'>
                    최대 1분 정도 소요될 수 있어요.
                </p>
            </div>

            {/* [수정] 'mt-20'을 'mt-16' (64px) 정도로 줄여 
               헤더와의 간격을 조정합니다.
            */}
            <div className='mt-16'>
                {' '}
                {/* self-center는 부모가 items-center이므로 불필요 */}
                <CircularProgressBar progress={progress} />
            </div>

            {/* [수정] 'mt-[3.125rem]'을 'mt-12' (48px) 정도로 조정합니다. */}
            <div className='w-full flex items-center p-4 rounded-2xl bg-info-bg mt-12'>
                <svg
                    className='w-5 h-5 text-info-text mr-2'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                </svg>
                <p className='text-info-text text-[1.25rem] font-medium'>
                    나의 정보 불러오는 중...
                </p>
            </div>
        </div>
    );
};

export default LoadingStep;

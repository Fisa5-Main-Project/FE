// src/components/asset/LoadingStep.tsx

'use client';

import { useEffect } from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface LoadingStepProps {
    onComplete: () => void;
    isLoading: boolean;
}

const LoadingStep = ({ onComplete, isLoading }: LoadingStepProps) => {
    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(onComplete, 500);
            return () => clearTimeout(timer);
        }
    }, [isLoading, onComplete]);

    return (
        <div className="w-full flex flex-col items-center h-full justify-center">
            <div className="w-full">
                <h1 className="text-[2rem] text-secondary font-bold">
                    정보를 불러오는 중이에요.
                </h1>
                <p className="text-gray-2 text-[1.25rem] mt-2">
                    최대 1분 정도 소요될 수 있어요.
                </p>
            </div>

            <div className="mt-16">
                <LoadingSpinner size="h-32 w-32" />
            </div>

            <div className="w-full flex items-center p-4 rounded-2xl bg-info-bg mt-12">
                <svg
                    className="w-5 h-5 text-info-text mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <p className="text-info-text text-[1.25rem] font-medium">
                    나의 정보 불러오는 중...
                </p>
            </div>
        </div>
    );
};

export default LoadingStep;

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * 마이데이터 정보 로딩 단계 컴포넌트 (수정됨)
 * - 라우팅: 로딩 완료 후 useRouter를 통해 다음 페이지로 이동합니다.
 */
const LoadingStep = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  // Effect 1: progress 상태를 100까지 증가시키는 타이머를 관리합니다.
  useEffect(() => {
    const PROGRESS_INTERVAL = 50; // 애니메이션 프레임 간격 (ms)
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 100 ? 100 : prev + 1));
    }, PROGRESS_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // Effect 2: progress 상태가 100에 도달하면 페이지 이동이라는 부수 효과를 처리합니다.
  useEffect(() => {
    if (progress >= 100) {
      // 로딩 완료 후 다음 단계인 'complete' 페이지로 이동
      const timer = setTimeout(() => {
        router.push('/mydata/complete');
      }, 500); // 100%를 잠시 보여준 후 이동

      return () => clearTimeout(timer);
    }
  }, [progress, router]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-primary-50 text-center">
      <h1 className="text-2xl font-bold md:text-3xl">정보를 불러오는 중이에요.</h1>
      <p className="text-gray-600 mt-2">최대 1분 정도 소요될 수 있어요.</p>
      
      <div className="relative mt-16 w-40 h-40">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-primary-500">{progress}%</span>
        </div>
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <circle
            className="text-primary-500"
            strokeWidth="10"
            strokeDasharray={2 * Math.PI * 45}
            strokeDashoffset={(2 * Math.PI * 45) * (1 - progress / 100)}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            transform="rotate(-90 50 50)"
          />
        </svg>
      </div>

      <div className="mt-16 bg-white p-4 rounded-lg w-4/5 shadow-sm">
        <p className="text-gray-700">나의 정보 불러오는 중...</p>
      </div>
    </div>
  );
};

export default LoadingStep;

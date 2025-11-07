'use client';

import { useEffect } from 'react';

/**
 * 모바일 브라우저에서 100vh가 주소창을 포함하여 계산되는 문제를 해결합니다.
 * 실제 내부 높이(window.innerHeight)를 기반으로 CSS 변수 `--vh`를 설정합니다.
 */
export default function ViewportHeightHandler() {
  useEffect(() => {
    const setVh = () => {
      // window.innerHeight는 뷰포트의 실제 높이를 가져옵니다.
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // 컴포넌트 마운트 시 및 창 크기 변경 시 높이를 다시 계산합니다.
    setVh();
    window.addEventListener('resize', setVh);

    // 클린업 함수
    return () => window.removeEventListener('resize', setVh);
  }, []);

  // 이 컴포넌트는 UI를 렌더링하지 않습니다.
  return null;
}

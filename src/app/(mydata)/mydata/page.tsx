'use client';

import AgreementStep from '@/components/mydata/steps/AgreementStep';

// SEO 최적화: Metadata API를 클라이언트 컴포넌트에서 직접 사용할 수 없으므로,
// 메타데이터는 상위 layout.tsx에서 관리하는 것이 좋습니다.

/**
 * 마이데이터 플로우의 시작 페이지 (클라이언트 컴포넌트)
 * - 사용자가 /mydata 경로로 접근 시, 첫 번째 단계인 약관 동의 컴포넌트를 렌더링합니다.
 * - 상태 설정 로직은 상위 layout.tsx로 이전되었습니다.
 */
export default function MyDataFlowStartPage() {
  return <AgreementStep />;
}

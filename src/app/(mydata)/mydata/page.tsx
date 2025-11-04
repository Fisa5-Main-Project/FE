import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

// SEO 최적화: Metadata API를 사용하여 페이지 메타데이터를 정의합니다.
export const metadata: Metadata = {
  title: '마이데이터 연동 시작',
  description: '마이데이터 연동을 시작하여 여러 금융사에 흩어진 내 자산을 한 번에 관리하세요.',
};

/**
 * 마이데이터 플로우의 시작 페이지 (서버 컴포넌트)
 * - 사용자가 /mydata 경로로 접근 시, 첫 번째 단계인 /mydata/agreement로 리디렉션합니다.
 */
export default function MyDataFlowStartPage() {
  // 서버 컴포넌트에서 next/navigation의 redirect 함수를 사용하여 리디렉션을 수행합니다.
  redirect('/mydata/agreement');
}

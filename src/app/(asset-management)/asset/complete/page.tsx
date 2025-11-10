// app/(asset-management)/asset/complete/page.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { Page, PageContent, PageActions } from '@/components/common/Page';
import Button from '@/components/common/Button';
// clsx는 이제 이 컴포넌트에서 필요하지 않습니다.
import { useAssetRouter } from '@/hooks/asset/useAssetRouter';

/**
 * 포트폴리오 구성 완료 페이지
 */
export default function CompletePage() {
    const { goTo } = useAssetRouter();

    const handleViewPortfolio = () => {
        goTo('portfolio');
    };

    return (
        <Page>
            <PageContent>
                {/* justify-center: 그룹(텍스트+이미지)을 수직 중앙 정렬
                  items-center: 그룹 내 아이템들을 수평 중앙 정렬
                */}
                <div className="flex flex-col items-center justify-center h-full">
                    {/* [수정] 새 디자인 시스템 적용 */}
                    <div className="w-48 h-10 p-2 bg-[#C6DCFF] rounded-[20px] flex justify-center items-center mb-12">
                        <div className="text-center text-[#0064FF] text-base font-bold">포트폴리오가 완성되었어요!</div>
                    </div>

                    <div className="relative w-60 h-60">
                        <Image
                            src="/asset-management/complete.png"
                            alt="포트폴리오 완성"
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 240px"
                            priority
                        />
                    </div>
                </div>
            </PageContent>
            <PageActions>
                <Button variant="primary" onClick={handleViewPortfolio}>
                    포트폴리오 확인하기
                </Button>
            </PageActions>
        </Page>
    );
}

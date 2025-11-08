// app/(asset-management)/asset/complete/page.tsx

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Page, PageContent, PageActions } from '@/components/common/Page';
import Button from '@/components/common/Button';
import clsx from 'clsx';

/**
 * 포트폴리오 구성 완료 페이지
 */
export default function CompletePage() {
    const router = useRouter();

    // '포트폴리오 확인하기' 버튼 클릭 시
    const handleViewPortfolio = () => {
        // (가정) 최종 결과 페이지는 /asset/result 입니다.
        router.push('/asset/portfolio');
    };

    return (
        <Page>
            {/* PageContent는 flex-grow로, PageActions는 flex-shrink-0로 분리 */}

            {/* 1. 컨텐츠 (flex-grow) */}
            <PageContent>
                {/* 수직/수평 중앙 정렬을 위한 래퍼 */}
                <div className='flex flex-col items-center justify-center h-full gap-8'>
                    {/* "포트폴리오가 완성되었어요!" 토스트 */}
                    <div
                        className={clsx(
                            'px-6 py-3 rounded-full',
                            'bg-primary-dark text-white', // globals.css에 정의된 색상 가정
                            'font-semibold text-lg shadow-md'
                        )}
                    >
                        포트폴리오가 완성되었어요!
                    </div>

                    {/* 완료 이미지 (체크 깃발) */}
                    <div className='relative w-60 h-60'>
                        <Image
                            src='/asset-management/complete.png' // "complete.png" 경로 가정
                            alt='포트폴리오 완성'
                            fill
                            className='object-contain'
                            sizes='(max-width: 768px) 100vw, 240px'
                            priority // 이 페이지의 핵심 이미지이므로 우선 로드
                        />
                    </div>
                </div>
            </PageContent>

            {/* 2. 액션 (flex-shrink-0) */}
            <PageActions>
                <Button variant='primary' onClick={handleViewPortfolio}>
                    포트폴리오 확인하기
                </Button>
            </PageActions>
        </Page>
    );
}

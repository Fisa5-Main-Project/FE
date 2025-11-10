'use client';

import React from 'react';
import { useAssetRouter } from '@/hooks/asset/useAssetRouter';
import { Page, PageContent, PageActions } from '@/components/common/Page';
import Button from '@/components/common/Button';
import clsx from 'clsx';
import { ArrowLeft } from 'lucide-react';

import { useAssetStore } from '@/stores/asset/useAssetStore';

import PortfolioSummaryCard from '@/components/asset/portfolio/PortfolioSummaryCard';
import AchievementCard from '@/components/asset/portfolio/AchievementCard';
import RecommendedProducts from '@/components/asset/portfolio/RecommendProducts';

export default function PortfolioPage() {
    const { goTo } = useAssetRouter();

    const userName = useAssetStore((state) => state.userName);
    const goalAmount = useAssetStore((state) => state.goalAmount);
    const totalAssets = useAssetStore((state) => state.totalAssets);
    const monthlyExpense = useAssetStore((state) => state.monthlyExpense);
    const goalPeriodYears = useAssetStore((state) => state.goalPeriodYears);
    const goalDate = useAssetStore((state) => state.goalDate);
    const percentage = useAssetStore((state) => state.percentage);
    const achievement = useAssetStore((state) => state.achievement);
    const recommendedProducts = useAssetStore((state) => state.recommendedProducts);

    // 4. formatCurrency 함수를 컴포넌트 내부에 정의합니다.
    const formatCurrency = (value: number | null) => new Intl.NumberFormat('ko-KR').format(value || 0);

    // 5. 데이터 객체로 재조립
    const data = {
        userName: userName || '고객',
        goalAmount: goalAmount || 0,
        totalAssets: totalAssets || 0,
        monthlyExpense: monthlyExpense || 0,
        goalPeriodYears: goalPeriodYears || 0,
        goalDate: goalDate || 'N/A',
        percentage: percentage || 0,
        achievement: achievement,
        recommendedProducts: recommendedProducts || [],
        formatCurrency,
    };

    if (!data.achievement || data.percentage === null) {
        return (
            <Page>
                <PageContent>
                    <div className="p-10 text-center">데이터를 불러오는 중입니다...</div>
                </PageContent>
            </Page>
        );
    }

    return (
        <Page>
            <PageContent className={clsx('overflow-y-auto')}>
                <button
                    onClick={() => goTo('complete')}
                    className="absolute left-4 -mt-20 w-10 h-10 flex items-center justify-center z-10"
                    aria-label="뒤로가기"
                >
                    <ArrowLeft className="w-6 h-6 text-black" />
                </button>

                <div className="flex flex-col gap-10 pb-10">
                    <div>
                        <span className="text-[#333F56] text-4xl font-extrabold">{data.userName}</span>
                        <span className="text-[#333F56] text-4xl font-medium">
                            님의
                            <br />
                            자산 포트폴리오
                        </span>
                    </div>

                    <PortfolioSummaryCard data={data} />
                    {data.achievement && <AchievementCard achievement={data.achievement} />}
                    <RecommendedProducts products={data.recommendedProducts} userName={data.userName} />
                </div>
            </PageContent>

            <PageActions>
                <Button variant="primary" onClick={() => goTo('chatbot')}>
                    AI 자산 관리 상담받기
                </Button>
            </PageActions>
        </Page>
    );
}

'use client';

import React from 'react';
import { useAssetRouter } from '@/hooks/asset/useAssetRouter';
import { Page, PageContent } from '@/components/common/Page';
import LoadingStep from '@/components/asset/building/LoadingStep';
import { useAssetStore } from '@/stores/asset/useAssetStore';
import {
    getAchievementText,
    MOCK_USER_NAME,
    MOCK_TOTAL_ASSETS,
    MOCK_RECOMMENDED_PRODUCTS,
    calculateMonthlyExpense,
    calculateGoalDate,
} from '@/lib/portfolioUtils';

/**
 * 포트폴리오 구성 중 로딩 페이지
 */
export default function BuildingPage() {
    const { goTo } = useAssetRouter();

    // [ 2. 객체 대신 개별 상태로 구독하여 무한 루프 방지
    const targetAmount = useAssetStore((state) => state.targetAmount);
    const period = useAssetStore((state) => state.period);
    const livingExpenses = useAssetStore((state) => state.livingExpenses);
    const fixedCosts = useAssetStore((state) => state.fixedCosts);

    // 3. 세터(Setter)는 re-render를 유발하지 않으므로 getState()로 안전하게 사용
    const {
        setUserName,
        setGoalAmount,
        setTotalAssets,
        setMonthlyExpense,
        setGoalPeriodYears,
        setGoalDate,
        setPercentage,
        setAchievement,
        setRecommendedProducts,
    } = useAssetStore.getState();

    const handleLoadingComplete = () => {
        const userName = MOCK_USER_NAME;
        const totalAssets = MOCK_TOTAL_ASSETS;
        const recommendedProducts = MOCK_RECOMMENDED_PRODUCTS;

        const goalAmount = targetAmount || 0;
        const goalPeriodYears = period || 0;
        const monthlyExpense = calculateMonthlyExpense(livingExpenses, fixedCosts);
        const goalDate = calculateGoalDate(period);

        const percentage = goalAmount > 0 ? Math.round((totalAssets / goalAmount) * 100) : 0;

        const achievement = getAchievementText(percentage, userName);

        // 스토어에 계산된 데이터 저장
        setUserName(userName);
        setGoalAmount(goalAmount);
        setTotalAssets(totalAssets);
        setMonthlyExpense(monthlyExpense);
        setGoalPeriodYears(goalPeriodYears);
        setGoalDate(goalDate);
        setPercentage(percentage);
        setAchievement(achievement);
        setRecommendedProducts(recommendedProducts);

        goTo('complete');
    };

    return (
        <Page>
            <PageContent>
                <LoadingStep onComplete={handleLoadingComplete} />
            </PageContent>
        </Page>
    );
}

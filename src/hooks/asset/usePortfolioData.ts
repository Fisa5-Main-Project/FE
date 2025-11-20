// src/hooks/asset/usePortfolioData.ts

'use client';

import { useAssetStore } from '@/stores/asset/useAssetStore';
import { useUserStore } from '@/stores/user/useUserStore';
import { Product, Achievement } from '@/types/asset';
import { getAchievementText } from '@/lib/portfolioUtils';

const MOCK_RECOMMENDED_PRODUCTS: Product[] = [
    {
        id: 'p1',
        type: '예적금',
        name: 'WON플러스 예금',
        bank: '우리은행',
        stat: '연 3.5%',
        icon: '🏦',
        link: 'https://spot.wooribank.com/pot/Dream?withyou=PODEP0001&cc=c011240:c009166;c012263:c012399&PRD_CD=P010002491&PRD_YN=Y',
    },
    {
        id: 'p2',
        type: '적금',
        name: '우리 SUPER 주거래 적금',
        bank: '우리은행',
        stat: '최고 연 3.7%',
        icon: '💰',
        link: 'https://spot.wooribank.com/pot/Dream?withyou=PODEP0019&cc=c007095:c009166;c012263:c012399&PLM_PDCD=P010000109&PRD_CD=P010000109&ALL_GB=ALL&depKind=',
    },
    {
        id: 'p3',
        type: '펀드',
        name: '우리 배당성장 펀드',
        bank: '우리은행',
        stat: '수익률 12.3%',
        icon: '📈',
        link: '#', // Placeholder link
    },
];

/**
 * 포트폴리오 결과 페이지에 필요한 데이터를 제공하는 훅입니다.
 * Zustand 스토어에서 사용자 입력 데이터를 가져와 가공하고,
 * 추천 상품 및 목표 달성 관련 정보를 반환합니다.
 */
export const usePortfolioData = () => {
    // Zustand Store에서 필요한 데이터 가져오기
    const {
        income,
        fixedCosts,
        livingExpenses,
        period,
        targetAmount,
        cashFlowDiagnostic,
        prediction,
        goalAmount: storedGoalAmount,
        totalAssets: storedTotalAssets,
        monthlyExpense: storedMonthlyExpense,
        goalPeriodYears: storedGoalPeriodYears,
        goalDate: storedGoalDate,
        percentage: storedPercentage,
        achievement: storedAchievement,
    } = useAssetStore((state) => state);
    const user = useUserStore((state) => state.user);

    const userName = user?.name || '사용자';

    const goalAmount = targetAmount || storedGoalAmount || 1_000_000_000;
    const totalAssets = storedTotalAssets || 320_000_000;
    const monthlyExpense = storedMonthlyExpense || (fixedCosts || 0) + (livingExpenses || 0);
    const goalPeriodYears = period || storedGoalPeriodYears || 15;

    const currentYear = new Date().getFullYear();
    const futureYear = currentYear + goalPeriodYears;
    const goalDate = storedGoalDate || `${futureYear}년 10월 29일`;

    const percentage = storedPercentage ?? (totalAssets && goalAmount ? Math.min(Math.round((totalAssets / goalAmount) * 100), 100) : 0);

    const recommendedProducts = MOCK_RECOMMENDED_PRODUCTS;
    const achievement = storedAchievement || getAchievementText(percentage, userName);

    const formatCurrency = (value: number | null) => new Intl.NumberFormat('ko-KR').format(value || 0);

    return {
        userName,
        goalAmount,
        totalAssets,
        monthlyExpense,
        goalPeriodYears,
        goalDate,
        percentage,
        achievement,
        recommendedProducts,
        cashFlowDiagnostic,
        prediction,
        formatCurrency,
    };
};

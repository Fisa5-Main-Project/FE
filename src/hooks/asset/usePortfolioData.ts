// src/hooks/asset/usePortfolioData.ts

'use client';

import { useAssetStore } from '@/stores/asset/useAssetStore';
import { Product, Achievement } from '@/types/asset';

const MOCK_RECOMMENDED_PRODUCTS: Product[] = [
    {
        id: 'p1',
        type: '예적금',
        name: '우리 정기예금',
        bank: '우리은행',
        stat: '연 3.5%',
        icon: '/asset-management/deposit.png',
    },
    {
        id: 'p2',
        type: '연금저축',
        name: '우리 연금저축',
        bank: '우리은행',
        stat: '세액공제 16.5%',
        icon: '/asset-management/pension.png',
    },
    {
        id: 'p3',
        type: '펀드',
        name: '우리 배당성장 펀드',
        bank: '우리은행',
        stat: '수익률 12.3%',
        icon: '/asset-management/fund.png',
    },
];

const MOCK_ACHIEVEMENT: Achievement = {
    icon: '⛰️',
    title: '목표의 3분의 1을 넘으셨네요!',
    description: '지금까지 정말 잘해오셨어요. 가장 지루할 수 있는 구간이지만, 이 고비만 넘기면 절반입니다.',
};

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
        userName: storeUserName,
    } = useAssetStore((state) => ({
        income: state.income,
        fixedCosts: state.fixedCosts,
        livingExpenses: state.livingExpenses,
        period: state.period,
        targetAmount: state.targetAmount,
        userName: state.userName,
    }));

    const userName = storeUserName || '사용자';

    const goalAmount = targetAmount || 1_000_000_000; // 스토어의 targetAmount 사용
    const totalAssets = 320_000_000; // [TODO] 계산 로직 필요
    const monthlyExpense = (fixedCosts || 0) + (livingExpenses || 0); // 스토어의 fixedCosts, livingExpenses 사용
    const goalPeriodYears = period || 15; // 스토어의 period 사용

    const currentYear = new Date().getFullYear();
    const futureYear = currentYear + goalPeriodYears;
    const goalDate = `${futureYear}년 10월 29일`; // [TODO] 실제 계산 로직 필요

    // 임시 percentage 계산
    const percentage = totalAssets && goalAmount ? Math.min(Math.round((totalAssets / goalAmount) * 100), 100) : 0;

    const recommendedProducts = MOCK_RECOMMENDED_PRODUCTS;
    const achievement = MOCK_ACHIEVEMENT;

    const formatCurrency = (value: number) => new Intl.NumberFormat('ko-KR').format(value);

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
        formatCurrency,
    };
};

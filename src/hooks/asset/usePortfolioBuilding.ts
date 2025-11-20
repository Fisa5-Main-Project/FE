'use client';

import { useEffect, useState } from 'react';
import { getAssetManagementPortfolio } from '@/api/asset';
import { useAssetStore } from '@/stores/asset/useAssetStore';
import { useUserStore } from '@/stores/user/useUserStore';
import { getAchievementText } from '@/lib/portfolioUtils';
import { useAssetRouter } from './useAssetRouter';

export function usePortfolioBuilding() {
    const { goTo } = useAssetRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const user = useUserStore((state) => state.user);
    const {
        setGoalAmount,
        setTotalAssets,
        setMonthlyExpense,
        setGoalPeriodYears,
        setGoalDate,
        setPercentage,
        setAchievement,
        setCashFlowDiagnostic,
        setPrediction,
    } = useAssetStore.getState();

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await getAssetManagementPortfolio();
                if (response.isSuccess) {
                    const { goalMetrics, cashFlowDiagnostic, prediction } = response.data;

                    const userName = user?.name || '사용자';
                    const achievement = getAchievementText(goalMetrics.goalProgressPercent, userName);

                    setGoalAmount(goalMetrics.goalAmount);
                    setTotalAssets(goalMetrics.totalAsset);
                    setGoalPeriodYears(goalMetrics.yearsLeft);
                    setGoalDate(goalMetrics.goalTargetDate);
                    setPercentage(goalMetrics.goalProgressPercent);
                    setAchievement(achievement);
                    setCashFlowDiagnostic(cashFlowDiagnostic);
                    setPrediction(prediction);
                } else {
                    setIsError(true);
                    console.error('API 호출 실패:', response.error);
                }
            } catch (error) {
                setIsError(true);
                console.error('API 호출 중 예외 발생:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPortfolio();
    }, [
        user,
        setGoalAmount,
        setTotalAssets,
        setGoalPeriodYears,
        setGoalDate,
        setPercentage,
        setAchievement,
        setCashFlowDiagnostic,
        setPrediction,
    ]);

    const handleLoadingComplete = () => {
        if (!isError) {
            goTo('complete');
        } else {
            // 에러 발생 시 다른 페이지로 보내거나 에러 처리를 할 수 있습니다.
            // 현재는 콘솔에만 에러를 출력하고 complete 페이지로 이동합니다.
            goTo('complete');
        }
    };

    return { isLoading, handleLoadingComplete };
}

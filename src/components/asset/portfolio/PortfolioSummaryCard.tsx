'use client';

import GoalGauge from './GoalGauge';
import { Achievement, Product } from '@/types/asset';
import React from 'react';

// PortfolioPage에서 실제로 전달하는 data 객체의 모양과 일치
type PortfolioData = {
    userName: string;
    goalAmount: number | null;
    totalAssets: number | null;
    monthlyExpense: number | null;
    goalPeriodYears: number | null;
    goalDate: string | null;
    percentage: number | null;
    achievement: Achievement | null;
    recommendedProducts: Product[];
    formatCurrency: (value: number | null) => string;
};

interface PortfolioSummaryCardProps {
    data: PortfolioData;
}

export default function PortfolioSummaryCard({ data }: PortfolioSummaryCardProps) {
    return (
        <div className="w-full bg-white rounded-xl shadow-sm p-6 flex flex-col items-center gap-10">
            <div className="text-center">
                <span className="text-accent text-xl font-medium">
                    목표 기간
                    <br />
                </span>
                <span className="text-accent text-2xl font-bold">{data.goalDate}</span>
                <span className="text-accent text-xl font-medium">
                    까지
                    <br />
                </span>
                <span className="text-blue-500 text-2xl font-bold">{data.goalPeriodYears}년</span>
                <span className="text-accent text-xl font-medium"> 남았어요!</span>
            </div>

            <div className="relative flex flex-col items-center">
                <GoalGauge percentage={data.percentage || 0} />
                <div className="absolute bottom-2 flex flex-col items-center gap-1">
                    <span className="text-accent text-lg font-extrabold">목표 금액</span>
                    <span className="text-accent text-xl font-normal">{data.formatCurrency(data.goalAmount)}원</span>
                </div>
            </div>

            <div className="flex w-full justify-center items-center gap-3.5">
                <div className="flex-1 flex flex-col">
                    <span className="text-accent text-base font-bold">총 자산</span>
                    <span className="text-accent text-lg">{data.formatCurrency(data.totalAssets)}원</span>
                </div>
                <div className="w-9 h-0 border-t-2 border-neutral-200 rotate-90" />
                <div className="flex-1 flex flex-col">
                    <span className="text-accent text-base font-bold">월 지출액</span>
                    <span className="text-accent text-lg">{data.formatCurrency(data.monthlyExpense)}원</span>
                </div>
            </div>

            <div className="text-center text-accent text-xl font-medium">
                현재 목표 금액의 <span className="text-blue-500 text-2xl font-bold">{data.percentage}%</span>를
                모았어요!
            </div>
        </div>
    );
}

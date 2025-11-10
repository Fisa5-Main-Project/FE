// app/(asset-management)/asset/portfolio/page.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import { useAssetRouter } from '@/hooks/asset/useAssetRouter';
import { Page, PageContent, PageActions } from '@/components/common/Page';
import Button from '@/components/common/Button';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { ArrowLeft } from 'lucide-react';

// --- Mock Data (Hook, Types) ... (이전과 동일) ---
interface Product {
    id: string;
    type: string;
    name: string;
    bank: string;
    stat: string;
    icon: string;
}
const usePortfolioData = () => {
    const userName = '양유진';
    const goalAmount = 1_000_000_000;
    const totalAssets = 320_000_000;
    const monthlyExpense = 3_000_000;
    const goalPeriodYears = 15;
    const goalDate = '2050년 10월 29일';
    const percentage = 32;
    const recommendedProducts: Product[] = [
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
    const achievement = {
        icon: '⛰️',
        title: '목표의 3분의 1을 넘으셨네요!',
        description: '지금까지 정말 잘해오셨어요. 가장 지루할 수 있는 구간이지만, 이 고비만 넘기면 절반입니다.',
    };
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

/**
 * 자산 포트폴리오 결과 페이지 (표준 Page 레이아웃)
 */
export default function PortfolioPage() {
    const { goTo } = useAssetRouter();
    const data = usePortfolioData();

    return (
        <Page>
            {/* [수정] PageContent에서 className을 제거합니다. */}
            <PageContent>
                {/* [수정] PageContent 내부에 h-full 래퍼 Div를 추가하고,
                     여기에 className을 적용합니다.
                */}
                <div className={clsx('h-full overflow-y-auto')}>
                    <button
                        onClick={() => goTo('complete')}
                        // -mt-20 (80px) + 부모(main.page-container) pt-28 (112px) = 32px from top
                        className="absolute left-4 -mt-20 w-10 h-10 flex items-center justify-center z-10"
                        aria-label="뒤로가기"
                    >
                        <ArrowLeft className="w-6 h-6 text-black" />
                    </button>

                    {/* [수정] 너비 증가(px-4 제거), 상단 마진(mt-2 제거) */}
                    <div className="flex flex-col gap-10 pb-10">
                        {/* [수정] mt-2 제거 (110px 디자인에 맞춤) */}
                        <div>
                            <span className="text-[#333F56] text-4xl font-extrabold">{data.userName}</span>
                            <span className="text-[#333F56] text-4xl font-medium">
                                님의
                                <br />
                                자산 포트폴리오
                            </span>
                        </div>

                        <PortfolioSummaryCard {...data} />
                        <AchievementCard {...data.achievement} />
                        <RecommendedProducts products={data.recommendedProducts} userName={data.userName} />
                    </div>
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

// --- 하위 컴포넌트들 ---

function PortfolioSummaryCard(props: ReturnType<typeof usePortfolioData>) {
    // ... (내용 변경 없음) ...
    return (
        <div className="w-full bg-white rounded-xl shadow-sm p-6 flex flex-col items-center gap-10">
            <div className="text-center">
                <span className="text-accent text-xl font-medium">
                    목표 기간
                    <br />
                </span>
                <span className="text-accent text-2xl font-bold">{props.goalDate}</span>
                <span className="text-accent text-xl font-medium">
                    까지
                    <br />
                </span>
                <span className="text-blue-500 text-2xl font-bold">{props.goalPeriodYears}년</span>
                <span className="text-accent text-xl font-medium"> 남았어요!</span>
            </div>
            <div className="relative flex flex-col items-center">
                <GoalGauge percentage={props.percentage} />
                <div className="absolute bottom-2 flex flex-col items-center gap-1">
                    <span className="text-accent text-lg font-extrabold">목표 금액</span>
                    <span className="text-accent text-xl font-normal">{props.formatCurrency(props.goalAmount)}원</span>
                </div>
            </div>
            <div className="flex w-full justify-center items-center gap-3.5">
                <div className="flex-1 flex flex-col">
                    <span className="text-accent text-base font-bold">총 자산</span>
                    <span className="text-accent text-lg">{props.formatCurrency(props.totalAssets)}원</span>
                </div>
                <div className="w-9 h-0 border-t-2 border-neutral-200 rotate-90" />
                <div className="flex-1 flex flex-col">
                    <span className="text-accent text-base font-bold">월 지출액</span>
                    <span className="text-accent text-lg">{props.formatCurrency(props.monthlyExpense)}원</span>
                </div>
            </div>
            <div className="text-center text-accent text-xl font-medium">
                현재 목표 금액의 <span className="text-blue-500 text-2xl font-bold">{props.percentage}%</span>를
                모았어요!
            </div>
        </div>
    );
}

function GoalGauge({ percentage }: { percentage: number }) {
    // ... (내용 변경 없음) ...
    const radius = 45;
    const circumference = Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    return (
        <svg className="w-56 h-28" viewBox="0 0 100 50">
            <path d="M 10 45 A 40 40 0 0 1 90 45" fill="none" stroke="#E4E4E4" strokeWidth="10" strokeLinecap="round" />
            <path
                d="M 10 45 A 40 40 0 0 1 90 45"
                fill="none"
                stroke="#0098FF"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
            />
        </svg>
    );
}

function AchievementCard({ icon, title, description }: { icon: string; title: string; description: string }) {
    // ... (내용 변경 없음) ...
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-accent text-3xl font-bold">
                목표 금액 달성에 도움되는
                <br />
                방법을 <span className="text-blue-500 text-3xl font-bold">추천</span> 받으세요!
            </h2>
            <div className="w-full p-6 bg-gradient-to-b from-blue-50 to-sky-100 rounded-2xl shadow-lg shadow-blue-500/10">
                <div className="flex gap-3">
                    <span className="text-3xl">{icon}</span>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-gray-800 text-xl font-bold leading-8">{title}</h3>
                        <p className="text-slate-700 text-base leading-6">{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RecommendedProducts({ products, userName }: { products: Product[]; userName: string }) {
    // ... (내용 변경 없음) ...
    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <span className="px-2.5 pt-1 bg-gradient-to-b from-sky-500 to-cyan-400 rounded-lg text-white text-sm font-bold leading-5">
                        AI 분석
                    </span>
                    <span className="text-gray-500 text-sm font-medium">
                        {userName}님의 투자 성향과 목표를 분석했어요
                    </span>
                </div>
                <h2>
                    <span className="text-slate-700 text-xl font-bold leading-8">목표 달성을 위한 </span>
                    <span className="text-blue text-xl font-bold leading-8">맞춤 상품</span>
                </h2>
            </div>
            <div className="flex flex-col gap-3">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

function ProductCard({ product }: { product: Product }) {
    return (
        // [수정] 오타 수정: min-h-[5T5rem] -> min-h-[5rem]
        <div className="w-full min-h-[5rem] px-4 py-4 bg-white rounded-xl shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] flex items-center justify-between">
            {/* [수정] min-w-0 추가 */}
            <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 bg-gradient-to-b from-sky-100 to-blue-50 rounded-xl flex justify-center items-center flex-shrink-0">
                    <Image src={product.icon} alt={product.type} width={28} height={28} />
                </div>
                {/* [수정] min-w-0 추가 */}
                <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 bg-zinc-100 rounded-md text-gray-500 text-xs font-semibold flex-shrink-0">
                            {product.type}
                        </span>
                        <span className="text-gray-800 text-base font-semibold break-keep">{product.name}</span>
                    </div>
                    <span className="text-gray-500 text-sm">{product.bank}</span>
                </div>
            </div>
            <span className="text-sky-500 text-base font-bold flex-shrink-0 pl-2 text-right">{product.stat}</span>
        </div>
    );
}

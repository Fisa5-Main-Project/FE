// 제공해주신 타입 정의입니다.

export type AssetStatusType = 'retired' | 'working';

export interface Product {
    id: string;
    type: string;
    name: string;
    bank: string;
    stat: string;
    icon: string;
}

export interface Achievement {
    icon: string;
    title: string;
    description: string;
}

export interface AssetManagementState {
    status: AssetStatusType | null;
    income: number | null;
    period: number | null;
    targetAmount: number | null;
    fixedCosts: number | null;
    livingExpenses: number | null;
    funnelSteps: string[];
    currentStepIndex: number;
    // Portfolio data
    userName: string | null;
    goalAmount: number | null;
    totalAssets: number | null;
    monthlyExpense: number | null;
    goalPeriodYears: number | null;
    goalDate: string | null;
    percentage: number | null;
    achievement: Achievement | null;
    recommendedProducts: Product[];
}

export interface AssetManagementActions {
    setStatus: (status: AssetStatusType) => void;
    setIncome: (income: number | null) => void;
    setPeriod: (period: number | null) => void;
    setTargetAmount: (amount: number | null) => void;
    setFixedCosts: (costs: number | null) => void;
    setLivingExpenses: (expenses: number | null) => void;
    setFunnelSteps: (steps: string[]) => void;
    setCurrentStepIndex: (index: number) => void;
    // Portfolio actions
    setUserName: (name: string | null) => void;
    setGoalAmount: (amount: number | null) => void;
    setTotalAssets: (assets: number | null) => void;
    setMonthlyExpense: (expense: number | null) => void;
    setGoalPeriodYears: (years: number | null) => void;
    setGoalDate: (date: string | null) => void;
    setPercentage: (percentage: number | null) => void;
    setAchievement: (achievement: Achievement | null) => void;
    setRecommendedProducts: (products: Product[]) => void;
    reset: () => void;
}

export interface AssetManagementStore extends AssetManagementState, AssetManagementActions {}

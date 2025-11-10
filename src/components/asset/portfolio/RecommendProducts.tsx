'use client';

import ProductCard from '@/components/common/ProductCard';
import { usePortfolioData } from '@/hooks/asset/usePortfolioData';

type Product = ReturnType<typeof usePortfolioData>['recommendedProducts'][0];

interface RecommendedProductsProps {
    products: Product[];
    userName: string;
}

export default function RecommendedProducts({ products, userName }: RecommendedProductsProps) {
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

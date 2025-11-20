'use client';

import * as React from 'react';

export interface AssetDetail {
    type: 'REAL_ESTATE' | 'SAVING' | 'INVESTMENT' | 'LOAN';
    balance: number;
    percentage: number;
    icon: string;  // 이미지 경로
    name: string;
}

/** 자산 개수와 인덱스에 따른 위치 설정 */
const getPositionStyles = (index: number, total: number) => {
    const offset = 'translate(-50%, -50%)';

    // 1개
    if (total === 1) {
        return { top: '50%', left: '50%', transform: offset };
    }

    // 2개
    if (total === 2) {
        if (index === 0) {
            return { top: '40%', left: '30%', transform: offset };
        }
        return { top: '72%', left: '77%', transform: offset };
    }

    // 3개
    if (total === 3) {
        switch (index) {
            case 0: 
                return { top: '30%', left: '50%', transform: offset };
            case 1: 
                return { top: '75%', left: '20%', transform: offset };
            case 2: 
                return { top: '63%', left: '82%', transform: offset };
            default:
                return { top: '50%', left: '50%', transform: offset };
        }
    }

    // 4개 이상
    switch (index) {
        case 0:
            return { top: '57%', left: '53%', transform: offset };
        case 1: 
            return { top: '75%', left: '17%', transform: offset };
        case 2:
            return { top: '35%', left: '85%', transform: offset };
        case 3:
            return { top: '25%', left: '25%', transform: offset };
        default:
            // 5개 이상이면 남는 것들은 상단 쪽에 모아두기
            return { top: '22%', left: '60%', transform: offset };
    }
};

/** 버블 개수 & 순위별 고정 rem 크기 */
const getBubbleSizeRem = (total: number, index: number): number => {
    // 퍼센트 기반이 아니라, 이미 계산된 rem 값을 그대로 고정 사용
    const sizeTable: Record<number, number[]> = {
        // 1개
        1: [14],

        // 2개
        2: [11, 7.5],

        // 3개
        3: [8.7, 6.8, 5.5],

        // 4개
        4: [8.3, 6.2, 5.2, 4.5],
    };

    const sizes = sizeTable[total] ?? sizeTable[4];
    return sizes[index] ?? sizes[sizes.length - 1];
};

interface AssetBubbleSectionProps {
    assetDetails: AssetDetail[];
}

const AssetBubbleSection: React.FC<AssetBubbleSectionProps> = ({ assetDetails }) => {
    // 퍼센트 기준으로 내림차순 정렬 (가장 큰 자산이 index 0)
    const sortedDetails = React.useMemo(
        () => [...assetDetails].sort((a, b) => b.percentage - a.percentage),
        [assetDetails]
    );

    return (
        <section className="h-[16rem] mb-1.5 relative rounded-[24px] overflow-hidden">
            {sortedDetails.map((asset, idx) => {
                const total = sortedDetails.length;
                const sizeRem = getBubbleSizeRem(total, idx);
                const positionStyles = getPositionStyles(idx, total);
                const isMain = idx === 0;

                return (
                    <div
                        key={`${asset.type}-${idx}`}
                        className="absolute z-10 flex rounded-full bg-white shadow-lg items-center justify-center flex-col text-center"
                        style={{
                            width: `${sizeRem}rem`,
                            height: `${sizeRem}rem`,
                            left: positionStyles.left,
                            top: positionStyles.top,
                            transform: positionStyles.transform,
                        }}
                    >
                        <img
                            src={asset.icon}
                            alt={asset.name}
                            className={
                                isMain
                                    ? "mb-2 h-14 w-14 object-contain"
                                    : "mb-1 h-6 w-6 object-contain"
                            }
                        />
                        <div
                            className={
                                isMain
                                    ? "text-lg font-semibold text-neutral-900 leading-tight"
                                    : "text-base font-semibold text-neutral-900 leading-tight"
                            }
                        >
                            {asset.name}
                        </div>
                        <div
                            className={
                                isMain
                                    ? "text-base text-neutral-700 leading-tight"
                                    : "text-xs text-neutral-700 leading-tight"
                            }
                        >
                            {asset.percentage}%
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default AssetBubbleSection;

'use client';

import Image from 'next/image';
import clsx from 'clsx';
import React from 'react';

interface StatusCardProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    imageSrc: string; // 필수
    isSelected: boolean;
}

export default function StatusCard({
    label,
    imageSrc,
    isSelected,
    className,
    ...props
}: StatusCardProps) {
    // 1. 방어 코드 추가
    // src나 label이 없으면 next/image 오류가 발생하므로 렌더링을 막습니다.
    if (!imageSrc || !label) {
        // 개발 환경에서만 오류를 알려줍니다.
        if (process.env.NODE_ENV === 'development') {
            console.error('StatusCard: imageSrc와 label prop이 필요합니다.');
        }
        return null; // 렌더링하지 않음
    }

    return (
        <button
            type='button'
            className={clsx(
                'w-[160px] h-[221px] rounded-[12px] bg-white',
                'flex flex-col items-center justify-center gap-6',
                'transition-all shadow-sm hover:shadow-md',
                'border-2',
                isSelected ? 'border-primary' : 'border-transparent',
                className
            )}
            {...props}
        >
            <div className='relative w-24 h-24'>
                {/* 2. 이제 imageSrc와 label은 유효함이 보장됩니다. */}
                <Image
                    src={imageSrc}
                    alt={label} // alt prop은 label을 사용
                    fill
                    className='object-contain'
                    sizes='(max-width: 768px) 100vw, 96px'
                />
            </div>
            <span className='text-xl font-bold text-secondary'>{label}</span>
        </button>
    );
}

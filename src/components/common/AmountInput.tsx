// src/components/common/AmountInput.tsx

import React from 'react';
import Input from './Input'; // '@/components/common/Input'라고 가정

interface AmountInputProps {
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    'aria-label'?: string;
}

/**
 * 금액 입력 필드와 '원' 단위를 함께 표시하는 공통 컴포넌트입니다.
 */
const AmountInput: React.FC<AmountInputProps> = ({
    id,
    value,
    onChange,
    placeholder = '0',
    ...props
}) => {
    // 값이 존재하고 "0"이 아닐 때만 표시
    const shouldShowUnit = value && value.length > 0 && value !== '0';

    return (
        <div>

            {/* 입력 필드와 '원' 단위를 감싸는 컨테이너 */}
            <div className="flex items-center relative">
                <Input
                    id={id}
                    type="number" // 숫자 입력 타입 유지
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full pr-10" // '원' 텍스트와 겹치지 않도록 오른쪽 패딩 추가
                    {...props}
                />
                {/* ✅ 조건부 렌더링: value가 있을 때만 '원' 표시 */}
                {shouldShowUnit && (
                    <span className="absolute right-4 text-secondary text-base font-medium">원</span>
                )}
            </div>
        </div>
    );
};

export default AmountInput;
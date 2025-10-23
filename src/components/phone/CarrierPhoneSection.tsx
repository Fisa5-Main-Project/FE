'use client';
import React, { useEffect, useRef, useState } from 'react';
import { CARRIERS } from '@/constants';
import type { CarrierKey } from '@/types/type';
import Input from '@/components/common/Input';

type Props = {
    visible: boolean;
    carrier: CarrierKey;
    onCarrierChange: (key: CarrierKey) => void;
    phone: string;
    onPhoneChange: (v: string) => void;
    onRequestCode: () => void;
    disabled?: boolean;
};

export default function CarrierPhoneSection({
    visible,
    carrier,
    onCarrierChange,
    phone,
    onPhoneChange,
    onRequestCode,
    disabled,
}: Props) {
    const [open, setOpen] = useState(false);
    const boxRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const close = (e: MouseEvent) => {
            if (!boxRef.current) return;
            if (!boxRef.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);
    }, []);

    const current = CARRIERS.find((c) => c.key === carrier);
    const others = CARRIERS;

    if (!visible) return null;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <div className="relative" ref={boxRef}>
                    <button
                        type="button"
                        className="w-full px-4 py-3 text-[15px] outline-none border bg-white border-gray-300 rounded-[4px] focus:border-gray-400 disabled:text-gray-400 disabled:bg-gray-100 flex items-center justify-between"
                        onClick={() => !disabled && setOpen((s) => !s)}
                        disabled={disabled}
                        style={{ background: 'var(--color-surface)' }} // 흐릿한 테두리 + 흰 배경 유지
                    >
                        <span className="text-[15px]">{current?.label ?? carrier}</span>
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            className={`transition ${open ? 'rotate-180' : ''}`}
                        >
                            <path
                                d="M7 10l5 5 5-5"
                                stroke="#6b7280"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>

                    {open && (
                        <ul className="absolute z-10 mt-2 w-full bg-white border rounded-md overflow-hidden">
                            {others.map((c) => (
                                <li key={c.key}>
                                    <button
                                        type="button"
                                        className="w-full text-left px-3 py-2 hover:bg-gray-50 text-[15px]"
                                        onClick={() => {
                                            onCarrierChange(c.key);
                                            setOpen(false);
                                        }}
                                    >
                                        {c.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="flex gap-3">
                <Input
                    className="flex-1"
                    placeholder="010-1234-5678"
                    value={phone}
                    onChange={(e) => onPhoneChange(e.currentTarget.value)}
                    disabled={disabled}
                />
                <button
                    className="px-4 py-3 rounded-[4px] text-white font-semibold disabled:opacity-40"
                    style={{ background: '#4E07FF' }}
                    onClick={onRequestCode}
                    disabled={disabled}
                >
                    인증번호 받기
                </button>
            </div>
        </div>
    );
}

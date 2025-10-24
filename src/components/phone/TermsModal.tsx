'use client';
import React, { useMemo, useState } from 'react';
import { Check } from 'lucide-react';

type Props = {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export default function TermsModal({ open, onClose, onConfirm }: Props) {
    const [items, setItems] = useState({
        required: false,
        telTerms: false,
        carrierTerms: false,
        pid: false,
        privacyUse: false,
        privacyThird: false,
    });

    const allChecked = useMemo(() => Object.values(items).every(Boolean), [items]);
    if (!open) return null;
    const toggleAll = (v: boolean) =>
        setItems({
            required: v,
            telTerms: v,
            carrierTerms: v,
            pid: v,
            privacyUse: v,
            privacyThird: v,
        });

    const toggle = (key: keyof typeof items) => setItems((prev) => ({ ...prev, [key]: !prev[key] }));

    const Row = ({ checked, label, onChange }: { checked: boolean; label: string; onChange: () => void }) => (
        <button
            type="button"
            onClick={onChange}
            // ✅ 버튼 테두리/배경 제거 + 왼쪽 정렬 유지(전체폭 클릭)
            className="w-full flex items-center justify-between py-3 text-left
               border-0 bg-transparent appearance-none
               focus:outline-none focus:ring-0"
        >
            <div className="flex items-center gap-3">
                <div
                    className={`w-5 h-5 flex items-center justify-center rounded-full border transition-colors ${
                        checked ? 'bg-[#4E07FF] border-[#4E07FF]' : 'border-gray-300 bg-white'
                    }`}
                >
                    {checked && <Check size={14} color="white" strokeWidth={3} />}
                </div>
                <span className="text-[15px] text-gray-700">{label}</span>
            </div>

            {/* 오른쪽 화살표는 그대로 유지 (필수 항목 제외) */}
            {!label.includes('(필수)') && (
                <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                    <path
                        d="M9 6l6 6-6 6"
                        stroke="#999"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </button>
    );

    const isConfirmEnabled = items.required; // 필수 항목만 체크돼도 활성화

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="relative w-full max-w-[420px] bg-white rounded-t-2xl p-6">
                {/* 제목 */}
                <div className="flex items-center justify-between mb-4">
                    <div className="font-semibold text-[17px]">휴대폰 인증 동의</div>
                    <button onClick={onClose}>
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12" stroke="#555" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* 전체 동의 */}
                <Row checked={allChecked} label="전체 동의" onChange={() => toggleAll(!allChecked)} />
                <hr className="my-2" />

                {/* 개별 항목 */}
                <div className="space-y-1">
                    <Row
                        checked={items.required}
                        label="본인 인증 이용 동의(필수)"
                        onChange={() => toggle('required')}
                    />
                    <Row
                        checked={items.telTerms}
                        label="휴대폰 본인확인 이용약관"
                        onChange={() => toggle('telTerms')}
                    />
                    <Row
                        checked={items.carrierTerms}
                        label="통신사 본인확인 이용약관"
                        onChange={() => toggle('carrierTerms')}
                    />
                    <Row checked={items.pid} label="고유식별정보 처리동의" onChange={() => toggle('pid')} />
                    <Row
                        checked={items.privacyUse}
                        label="개인정보 수집/이용/취급위탁 동의"
                        onChange={() => toggle('privacyUse')}
                    />
                    <Row
                        checked={items.privacyThird}
                        label="개인정보 제3자 제공 동의"
                        onChange={() => toggle('privacyThird')}
                    />
                </div>

                {/* 확인 버튼 */}
                <button
                    className="w-full mt-6 py-3 text-white font-semibold rounded-[4px] transition-colors"
                    style={{
                        backgroundColor: isConfirmEnabled ? '#4E07FF' : '#C8C8C8',
                    }}
                    onClick={() => {
                        if (isConfirmEnabled) onConfirm();
                    }}
                    disabled={!isConfirmEnabled}
                >
                    확인
                </button>
            </div>
        </div>
    );
}

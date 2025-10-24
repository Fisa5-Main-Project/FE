'use client';
import { useMemo, useState } from 'react';
import IdentityFields from '@/components/identity/IdentityFields';
import CarrierPhoneSection from '@/components/phone/CarrierPhoneSection';
import TermsModal from '@/components/phone/TermsModal';
import { isFilledName, isRrn6, isRrn1, isPhone } from '@/utils/validators';
import type { Identity, CarrierKey } from '@/types/type';
import Button from '@/components/common/Button';

export default function Page() {
    const [identity, setIdentity] = useState<Identity>({ name: '', rrn6: '', rrn1: '' });
    const [carrier, setCarrier] = useState<CarrierKey>('SKT');
    const [phone, setPhone] = useState<string>('');
    const [termsOpen, setTermsOpen] = useState<boolean>(false);
    const [successOpen, setSuccessOpen] = useState<boolean>(false);

    const identityReady = useMemo(
        () => isFilledName(identity.name) && isRrn6(identity.rrn6) && isRrn1(identity.rrn1),
        [identity]
    );
    const phoneReady = useMemo(() => isPhone(phone), [phone]);

    return (
        <div className="w-full flex items-center justify-center p-4">
            {/* 모바일 프레임 */}
            <div className="card-frame">
                <div className="p-5 flex flex-col gap-5 pb-28">
                    <div className="flex flex-col gap-0 text-[20px]" style={{ color: 'var(--color-text-strong)' }}>
                        <div>서비스 이용을 위해</div>
                        <div>
                            <span className="font-extrabold">본인확인</span>을 해주세요.
                        </div>
                    </div>

                    <IdentityFields value={identity} onChange={setIdentity} />

                    <CarrierPhoneSection
                        visible={identityReady}
                        carrier={carrier}
                        onCarrierChange={setCarrier}
                        phone={phone}
                        onPhoneChange={setPhone}
                        onRequestCode={() => {
                            if (!identityReady) return;
                            if (!phoneReady) return; // 형식만 체크
                            setTermsOpen(true); // 약관 바텀시트
                        }}
                        disabled={!identityReady}
                    />
                </div>

                {/* 하단 확인 버튼 */}
                <div
                    className="sticky bottom-0 left-0 right-0 bg-white border-t p-4"
                    style={{ borderColor: 'var(--color-border)' }}
                >
                    <Button
                        className={!identityReady || !phoneReady ? 'bg-[#C8C8C8]' : 'bg-[#4E07FF]'}
                        disabled={!identityReady || !phoneReady}
                        onClick={() => setSuccessOpen(true)}
                    >
                        확인
                    </Button>
                </div>
            </div>

            {/* 약관 바텀시트 (껍데기) */}
            <TermsModal
                open={termsOpen}
                onClose={() => setTermsOpen(false)}
                onConfirm={() => {
                    setTermsOpen(false);
                    setSuccessOpen(true); // 실습: 약관 확인 → 바로 성공
                }}
            />

            {/* 성공 바텀시트 */}
            {successOpen && (
                <div className="fixed inset-0 z-50 flex items-end justify-center">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setSuccessOpen(false)} />
                    <div className="relative w-full max-w-[420px] bg-white rounded-t-2xl p-6">
                        <div className="mb-3" style={{ color: 'var(--color-text-strong)' }}>
                            인증이 성공하였습니다.
                        </div>
                        <Button onClick={() => setSuccessOpen(false)}>확인</Button>
                    </div>
                </div>
            )}
        </div>
    );
}

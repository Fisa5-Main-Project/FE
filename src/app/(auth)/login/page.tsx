"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import IdentityFields from "@/components/identity/IdentityFields";
import CarrierPhoneSection from "@/components/phone/CarrierPhoneSection";
import { isFilledName, isRrn6, isRrn1, isPhone } from "@/utils/validators";
import type { Identity, CarrierKey } from "@/types/type";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";

export default function Page() {
  const router = useRouter();
  const CORRECT_AUTH_CODE = "123456"; // 임시 인증번호
  // 나중에 전화번호 인증으로 6자리 보내도록

  const [identity, setIdentity] = useState<Identity>({
    name: "",
    rrn6: "",
    rrn1: "",
  });
  const [carrier, setCarrier] = useState<CarrierKey>("SKT");
  const [phone, setPhone] = useState<string>("");
  const [authCode, setAuthCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const identityReady = useMemo(
    () =>
      isFilledName(identity.name) &&
      isRrn6(identity.rrn6) &&
      isRrn1(identity.rrn1),
    [identity]
  );
  const phoneReady = useMemo(() => isPhone(phone), [phone]);

  const isReadyToSubmit = useMemo(() => {
    if (!identityReady || !phoneReady || !isCodeSent) return false;
    return authCode.length === 6;
  }, [identityReady, phoneReady, isCodeSent, authCode]);

  const handleConfirm = () => {
    if (!isReadyToSubmit) return;

    if (authCode === CORRECT_AUTH_CODE) {
      router.push("/main/main");
    } else {
      alert("인증번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      {/* 모바일 프레임 */}
      <div className="card-frame">
        <div className="p-5 flex flex-col gap-5 pb-28">
          <div
            className="flex flex-col gap-0 text-[20px]"
            style={{ color: "var(--color-text-strong)" }}
          >
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
              if (!identityReady || !phoneReady) return;
              setIsCodeSent(true);
            }}
            disabled={!identityReady}
          />

          {isCodeSent && (
            <div className="flex flex-col gap-2">
              <Input
                type="tel"
                placeholder="인증번호 6자리"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                maxLength={6}
              />
            </div>
          )}
        </div>

        {/* 하단 확인 버튼 */}
        <div
          className="sticky bottom-0 left-0 right-0 border-t p-4"
          style={{ borderColor: "var(--color-border)" }}
        >
          <Button disabled={!isReadyToSubmit} onClick={handleConfirm}>
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}

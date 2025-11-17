'use client'

import Button from "@/components/common/Button";
import { useMainNavi, ASSET_SERVICE_PATH, PENSION_SERVICE_PATH } from "@/hooks/main/useMainNavi";

export default function Page() {
    const { handleServiceNavigation } = useMainNavi();

    return (
        <div className="flex flex-col flex-grow h-full">
            <div className="flex-grow">
                <div className="p-5 flex flex-col gap-5 pb-28">
                    <h1 className="text-2xl font-bold">홈</h1>
                </div>
            </div>

            <div className="mb-3">
                <Button onClick={() => handleServiceNavigation(ASSET_SERVICE_PATH)}>내 자산 설계하기</Button>
            </div>

            <div>
                <Button onClick={() => handleServiceNavigation(PENSION_SERVICE_PATH)}>연금 관리</Button>
            </div>
        </div>
    );
}

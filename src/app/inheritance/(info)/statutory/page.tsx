"use client";

import React from "react";
import Button from "@/components/common/Button";
import { useInfoPage } from "@/hooks/inheritance/useInfoPage";

export default function StatutoryPage() {
  const { handleNext } = useInfoPage("/inheritance/legal-reserve");

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex-grow">
        <h1 className="text-[2rem] font-medium leading-normal">
          <span className="font-bold">법정상속분</span>은
          <br />
          법에서 정한
          <br />
          기본 상속 지분을 말해요
        </h1>

        {/* TODO: 3D 이미지로 변경하기*/}
        <div className="mt-5 flex justify-center">
          <img
            src="https://placehold.co/178x178/FFFFFF/3DAFFD?text=3D+Image"
            alt="3D 이미지"
            className="h-[11.125rem] w-[11.125rem]" // 178px
          />
        </div>

        <div
          className="mt-12 rounded-[12px] bg-white py-8 
                       text-secondary text-[1.5rem] font-medium leading-normal
                       flex items-center justify-center"
        >
          <div className="text-left">
            만약 <span className="font-bold">유언</span>이나{" "}
            <span className="font-bold">신탁</span>으로
            <br />
            따로 정하지 않았다면
            <br />
            <span className="font-bold">법에 따라 가족들이</span>
            <br />
            <span className="font-bold">나눠 가지는 비율</span>이에요.
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 pt-4">
        <Button
          type="button"
          onClick={handleNext}
          variant="tertiary"
          disabled={false}
        >
          이해했어요
        </Button>
      </div>
    </div>
  );
}

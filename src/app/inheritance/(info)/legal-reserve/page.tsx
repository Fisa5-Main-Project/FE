"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import { useInfoPage } from "@/hooks/inheritance/useInfoPage";
import { motion } from "framer-motion";

export default function LegalReserve() {
  const { handleNext } = useInfoPage("/inheritance/compare");

  return (
    <motion.div
      className="flex flex-col flex-grow h-full" // h-full 추가 권장 (화면 꽉 차게)
      initial={{ rotateY: 90, opacity: 0 }} // 시작: 90도 꺾여서 안 보임
      animate={{ rotateY: 0, opacity: 1 }} // 끝: 0도로 펴지면서 보임
      transition={{ duration: 0.5 }} // 0.5초 동안 실행
      style={{ transformStyle: "preserve-3d" }} // 3D 효과 활성화
    >
      <div className="flex flex-col flex-grow">
        <div className="flex-grow">
          <h1 className="text-[2rem] font-medium leading-normal">
            <span className="font-bold text-[2.25rem]">유류분</span>은
            <br />
            최소한의 보장이 되는
            <br />
            상속 몫이에요
          </h1>

          {/* TODO: 어울리는 이미지로 바꾸기*/}
          <div className="mt-5 flex justify-center">
            <Image
              src="/assets/img/inheritance/legal_reserve.png"
              alt="유류분 아이콘"
              width={178}
              height={178}
            />
          </div>

          <div
            className="mt-12 rounded-[12px] bg-white py-8 
                       text-secondary text-[1.5rem] font-medium leading-normal
                       flex items-center justify-center"
          >
            <div className="text-left">
              유언이나 증여로 특정 상속인이
              <br />
              몫을 못 받게 되더라도
              <br />
              <span className="font-bold">반드시 받을 수 있도록</span>
              <br />
              법이 보호해주는 권리에요.
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
    </motion.div>
  );
}

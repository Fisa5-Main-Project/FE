"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // App Router용
import { getUserInfo } from "@/api/user";
import { TRUST_PRODUCTS } from "@/constants/trustProducts";

export const useTrustRecommendationPage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();

        if (response.isSuccess && response.data) {
          setUserName(response.data.name);
        } else {
          console.error(
            "유저 정보를 불러오지 못했습니다: ",
            response.error?.message
          );
        }
      } catch (error) {
        console.error("API 호출 중 에러 발생:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleNext = () => {
    router.push("/main");
  };

  return {
    userName,
    trustProducts: TRUST_PRODUCTS,
    handleNext,
  };
};

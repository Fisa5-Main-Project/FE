"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useInheritanceMain = () => {
  const router = useRouter();

  const handleNext = useCallback(() => {
    router.push("/inheritance/amount");
  }, [router]);

  return { handleNext };
};

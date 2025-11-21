import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useJobStore } from "@/stores/job/jobStore";
import { getUserInfo } from "@/api/user";

export const useEmpTypeSelection = () => {
  const router = useRouter();
  const { setEmploymentType } = useJobStore();
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
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

  const handleSelect = (code: string) => {
    setSelectedCode(code);
  };

  const handleNext = () => {
    if (selectedCode) {
      setEmploymentType(selectedCode);
      router.push("/job/list");
    }
  };

  const handlePrev = () => {
    router.back();
  };

  return {
    selectedCode,
    userName,
    handleSelect,
    handleNext,
    handlePrev,
  };
};

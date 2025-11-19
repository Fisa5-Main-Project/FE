import { useState } from "react";
import { useRouter } from "next/navigation";
import { useJobStore } from "@/stores/job/jobStore";

export const useLocationForm = () => {
  const router = useRouter();
  const { setLocation } = useJobStore();

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  // 유효성 검사 (시/도가 선택되고, 구/군/구도 선택되어야 함)
  const isValid = selectedCity !== "" && selectedDistrict !== "";

  // 시/도 클릭 핸들러
  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    setSelectedDistrict(""); // 시/도가 바뀌면 구/군은 초기화
  };

  // 구/군/시 클릭 핸들러
  const handleDistrictClick = (district: string) => {
    setSelectedDistrict(district);
  };

  // 현재 위치 찾기 로직 (기존 유지)
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("브라우저가 위치 정보를 지원하지 않습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // TODO: 좌표 -> 주소 변환 API 연동 필요
        const mockAddress = "서울시 광진구";
        alert(`현재 위치를 가져왔습니다: ${mockAddress}`);

        const [city, dist] = mockAddress.split(" ");
        setSelectedCity(city);
        // 만약 '전체'에 해당하는 로직이 필요하면 여기서 조정
        setSelectedDistrict(dist);
      },
      () => {
        alert("위치 정보를 가져올 수 없습니다.");
      }
    );
  };

  // 다음 버튼 클릭 로직 (수정됨)
  const handleNext = () => {
    if (isValid) {
      // '전체'가 선택되었으면 시/도 이름만 저장 (예: "서울시")
      // 그 외에는 시/도 + 구/군 저장 (예: "서울시 광진구")
      const locationData =
        selectedDistrict === "전체"
          ? selectedCity
          : `${selectedCity} ${selectedDistrict}`;

      setLocation(locationData);
      router.push("/job/emptype");
    }
  };

  return {
    selectedCity,
    selectedDistrict,
    isValid,
    handleCityClick,
    handleDistrictClick,
    handleCurrentLocation,
    handleNext,
  };
};

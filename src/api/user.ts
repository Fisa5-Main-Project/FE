import { apiClient } from "./index";
import type { ApiResponse } from "@/types/api";
import { handleApiCall } from "./apiHandler";
import type { MainDataResponse } from "@/types/user";

/**
 * [메인] 사용자 프로필 및 마이데이터 상태를 가져옵니다.
 * GET /user/info
 */
export const fetchMainPageDataApi = (): Promise<ApiResponse<MainDataResponse>> => {
    // apiClient가 이미 index.ts의 인터셉터를 통해 토큰을 자동 첨부합니다.
    return handleApiCall(
        () => apiClient.get<ApiResponse<MainDataResponse>>("/user/info"),
        "메인 페이지 사용자 정보 로드 중 오류가 발생했습니다."
    );
};
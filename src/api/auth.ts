import axios from "axios";
import { apiClient } from "./index";
import type { ApiResponse } from "@/types/api";
import type { LoginRequest, LoginResponse } from "@/types/auth";

/**
 * 로그인 API
 * @param data 로그인 ID, 비밀번호
 * @returns ApiResponse<LoginResponse>
 */
export const loginApi = async (
  data: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {
  try {
    // apiClient를 사용하여 API 호출
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      "/auth/login",
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Axios 에러 중 서버에서 응답이 온 경우 (4xx, 5xx)
      // 서버에서 내려준 ApiErrorResponse 반환
      return error.response.data as ApiResponse<LoginResponse>;
    } else {
      // 그 외 네트워크 오류나 알 수 없는 오류
      return {
        isSuccess: false,
        code: 500, // 임의
        message: "UNKNOWN_ERROR",
        result: "알 수 없는 오류가 발생했습니다.",
      };
    }
  }
};

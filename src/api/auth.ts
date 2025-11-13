import axios from "axios";
import { apiClient } from "./index";
import type { ApiResponse } from "@/types/api";
import type { LoginRequest, LoginResponse } from "@/types/auth";
import type {
  SendSmsRequest,
  TestSendSmsResponse,
  VerifyCodeRequest,
  VerifyCodeResponse,
} from "@/types/signup";

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
        data: null,
        error: {
          code: "CLIENT_UNKNOWN_ERROR",
          message: "알 수 없는 오류가 발생했습니다.",
        },
      };
    }
  }
};

// /**
//  * [1-1] (개발용) SMS 인증번호 발송
//  * POST /api/v1/auth/signup/test-sms
//  */
// export const sendTestSms = async (
//   data: SendSmsRequest
// ): Promise<ApiResponse<TestSendSmsResponse>> => {
//   try {
//     const response = await apiClient.post<ApiResponse<TestSendSmsResponse>>(
//       "/auth/signup/test-sms",
//       data
//     );
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       return error.response.data as ApiResponse<TestSendSmsResponse>;
//     }
//     return {
//         isSuccess: false,
//         data: null,
//         error: {
//           code: "CLIENT_UNKNOWN_ERROR",
//           message: "알 수 없는 오류가 발생했습니다.",
//         },
//   }
// };

// /**
//  * [1-2] SMS 인증번호 확인
//  * POST /api/v1/auth/signup/check-code
//  */
// export const checkVerificationCode = async (
//   data: VerifyCodeRequest
// ): Promise<ApiResponse<VerifyCodeResponse>> => {
//   try {
//     const response = await apiClient.post<ApiResponse<VerifyCodeResponse>>(
//       "/auth/signup/check-code",
//       data
//     );
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       return error.response.data as ApiResponse<VerifyCodeResponse>;
//     }
//     return {
//         isSuccess: false,
//         data: null,
//         error: {
//           code: "CLIENT_UNKNOWN_ERROR",
//           message: "알 수 없는 오류가 발생했습니다.",
//         },
//   }
// };

// /**
//  * [1-3] 전화번호 중복 확인
//  * GET /api/v1/auth/signup/check-phone-num
//  */
// export const checkPhoneDuplicate = async (
//   phoneNum: string
// ): Promise<ApiResponse<string>> => {
//   try {
//     const response = await apiClient.get<ApiResponse<string>>(
//       "/auth/signup/check-phone-num",
//       {
//         params: { phoneNum },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       return error.response.data as ApiResponse<string>;
//     }
//     return {
//         isSuccess: false,
//         data: null,
//         error: {
//           code: "CLIENT_UNKNOWN_ERROR",
//           message: "알 수 없는 오류가 발생했습니다.",
//         },
//   }
// };

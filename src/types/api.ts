/**
 * 실패 시 응답에 포함될 error 객체 타입
 */
interface ApiError {
  code: string;
  message: string;
}

// 성공 시 응답
interface ApiSuccessResponse<T> {
  isSuccess: true;
  data: T;
  error?: null;
}

// 실패 시 응답
export interface ApiErrorResponse {
  isSuccess: false;
  data: null;
  error: ApiError;
}

// 성공/실패를 합친 제네릭 ApiResponse 타입
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

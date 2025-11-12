// 성공 시 응답
interface ApiSuccessResponse<T> {
  isSuccess: true;
  code: number; // ex. 200
  message: string; // ex. "SUCCESS!"
  result: T;
}

// 실패 시 응답
interface ApiErrorResponse {
  isSuccess: false;
  code: number; // ex. 409
  message: string; // ex. AUTH_005
  result: string; // ex, "이미 등록된 전화번호입니다." (사용자에게 보여줄 메시지)
}

// 성공/실패를 합친 제네릭 ApiResponse 타입
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

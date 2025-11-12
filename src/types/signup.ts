import type { ApiResponse } from "./api";

// [회원가입 1단계] 휴대폰 인증번호 발송 (POST /auth/signup/send-sms)
export interface SendSmsRequest {
  name: string;
  birth: string; // "YYYY-MM-DD"
  gender: "MALE" | "FEMALE";
  phoneNum: string; // "01012345678"
}

export interface SendSmsResponse {
  verificationId: string;
}

// [회원가입 1단계] 인증번호 확인 (POST /auth/signup/check-code)
export interface VerifyCodeRequest {
  verificationId: string;
  code: string; // "123456"
}

// [회원가입 1단계] 인증 성공 시
export interface VerifyCodeResponse {
  message: string; // "인증에 성공하였습니다."
}

// [회원가입 3단계] 아이디 중복 검사 (GET /auth/signup/check-id)
// export interface CheckIdResponse {
//   isAvailable: boolean;
// }

// [회원가입 6단계] 최종 회원가입 (POST /auth/signup/submit)
// (최종 제출 시 사용될 타입)
export interface TermAgreement {
  termId: number;
  isAgreed: boolean;
}

export interface SignupCompleteRequest {
  verificationId: string;
  termAgreements: TermAgreement[];
  loginId: string;
  password: string;
  financialPropensity: string;
  keywordIds: number[];
}

export interface SignupCompleteResponse {
  loginId: string;
  name: string;
  // (기타 회원가입 완료 정보)
}

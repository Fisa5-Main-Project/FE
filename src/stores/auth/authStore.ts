import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import { loginApi } from "@/api/auth";
import type { LoginRequest } from "@/types/auth";

// 스토어 상태(state) 타입
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
}

// 스토어 액션(action) 타입
interface AuthActions {
  login: (loginData: LoginRequest) => Promise<void>;
  logout: () => void;
  // TODO: 추후 토큰 갱신 액션 구현
  // refreshAccessToken: () => Promise<void>;
}

// 초기 상태
const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isLoggedIn: false,
};

export const useAuthStore = create<AuthState & AuthActions>()(
  // persist 미들웨어를 사용하여 localStorage에 상태 저장
  persist(
    (set, get) => ({
      ...initialState,

      /**
       * 로그인 액션
       * @param loginData
       */
      login: async (loginData: LoginRequest) => {
        const response = await loginApi(loginData);

        if (response.isSuccess) {
          const { accessToken, refreshToken } = response.result;

          // 1. Zustand 스토어 상태 업데이트
          set({
            accessToken,
            refreshToken,
            isLoggedIn: true,
          });

          // 2. 미들웨어가 읽을 수 있도록 Access Token을 쿠키에 저장
          Cookies.set("accessToken", accessToken, {
            expires: 1, // 1일 유효
          });

          // 3. Refresh Token도 쿠키에 저장 (더 긴 만료 시간)
          Cookies.set("refreshToken", refreshToken, {
            expires: 7, // 7일 유효
          });
        } else {
          // 로그인 실패 시
          throw new Error(response.result || response.message);
        }
      },

      /**
       * 로그아웃 액션
       */
      logout: () => {
        // 1. 쿠키에서 토큰 제거
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");

        // 2. Zustand 스토어 상태 초기화
        set(initialState);

        // 3. persist 미들웨어가 localStorage의 'auth-storage'도 정리
      },
    }),
    {
      name: "auth-storage", // localStorage에 저장될 키 이름
      storage: createJSONStorage(() => localStorage), // localStorage 사용
    }
  )
);

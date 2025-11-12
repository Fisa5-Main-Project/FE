import axios from "axios";
import { useAuthStore } from "@/stores/auth/authStore";

// .env.local 파일에서 BASE_URL 불러오기
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// axios 공통 인스턴스 생성
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true, // 쿠키/세션 기반 인증인 경우
});

/**
 * 요청 인터셉터 (Request Interceptor)
 *
 * 모든 API 요청이 서버로 전송되기 전에 실행.
 * 기능: Zustand 스토어에서 Access Token을 가져와 Authorization 헤더에 추가
 */
apiClient.interceptors.request.use(
  (config) => {
    // API 요청을 보내기 전에 Zustand 스토어의 최신 상태 가져옴.
    // hook은 페이지랑 , 커스텀 훅에서만 호출 가능함.
    // hook(useAuthStore)을 직접 사용할 수 없으므로 .getState() 사용
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
      // Authorization 헤더가 이미 설정되어 있지 않은 경우에만 설정
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    // 요청 오류 처리
    return Promise.reject(error);
  }
);

/*
// TODO: 응답 인터셉터 (Response Interceptor)
// 추후 Access Token이 만료(401 Error)되었을 때,
// Refresh Token으로 새 Access Token을 발급받는 로직을 여기에 구현해야 합니다.
apiClient.interceptors.response.use(
  (response) => {
    // 2xx 범위의 상태 코드 - 여기서는 아무것도 하지 않음
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러(토큰 만료)이고, 재시도 플래그가 없는 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 재시도 방지

      try {
        // TODO: useAuthStore.getState().refreshAccessToken() 같은
        // 토큰 갱신 로직을 호출해야 합니다.
        // const { newAccessToken } = await ... 

        // if (newAccessToken) {
        //   apiClient.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        //   originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        //   return apiClient(originalRequest); // 원래 요청 재시도
        // }
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃 처리
        console.error("Token refresh failed", refreshError);
        useAuthStore.getState().logout();
        // 로그인 페이지로 강제 이동
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
*/

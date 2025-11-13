import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/auth/authStore";
import Cookies from "js-cookie";

// .env.local 파일에서 BASE_URL 불러오기
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// axios 공통 인스턴스 생성
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
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

// --- 토큰 갱신 로직 ---

// 갱신 요청이 여러 번 중복 실행되는 것을 방지하기 위한 변수
let isRefreshing = false;
// 갱신 중 실패한 요청들을 저장하는 큐 (Promise의 resolve 함수 저장)
let failedQueue: ((newAccessToken: string) => void)[] = [];

// 큐에 쌓인 요청들을 새 토큰으로 재실행하는 함수
const processQueue = (newAccessToken: string) => {
  failedQueue.forEach((resolve) => resolve(newAccessToken));
  failedQueue = [];
};

/**
 * 응답 인터셉터 (Response Interceptor)
 *
 * API 응답 받은 후 싪행
 * 401(TOKEN_EXPIRED 코드) 에러 발생 시 토큰 갱신 시도
 */

apiClient.interceptors.response.use(
  (response) => {
    // 2xx 범위의 상태 코드 - 정상 응답
    return response;
  },
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // 1. 401 에러가 아니거나, _retry 플래그가 이미 true이면 거부
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // 2. 401 에러 확인용 (TOKEN_EXPIRED)
    const errorCode = error.response?.data?.error?.code;

    // 3. CASE 1: Access Token 만료 (TOKEN_EXPIRED)
    if (errorCode === "TOKEN_EXPIRED") {
      // _retry 플래그를 true로 설정 (무한 재시도 방지)
      originalRequest._retry = true;

      // 4. 토큰 갱신 요청이 이미 진행 중인 경우
      if (isRefreshing) {
        // 현재 요청을 큐에 추가하고, 갱신이 완료될 때까지 대기
        return new Promise((resolve, reject) => {
          failedQueue.push((newAccessToken: string) => {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      // 5. 첫 번째 토큰 갱신 요청인 경우
      isRefreshing = true;

      try {
        // 갱신 요청은 apiClient를 쓰지 않음 (인터셉터 무한 루프 방지)
        const reissueResponse = await axios.post(
          `${BASE_URL}/auth/reissue`,
          {}, // body는 비어있음
          {
            withCredentials: true,
          }
        );

        // 6. 토큰 갱신 성공
        const { accessToken: newAccessToken } = reissueResponse.data;

        // 6-1. 스토어와 쿠키에 새 Access Token 저장
        useAuthStore.getState().setAccessToken(newAccessToken);

        // 6-2. 큐에 쌓여있던 실패한 요청들 재실행
        isRefreshing = false; // 갱신 완료
        processQueue(newAccessToken);

        // 6-3. 원래의 요청 헤더를 새 토큰으로 변경
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // 6-4. 원래의 요청 재시도
        return apiClient(originalRequest);
      } catch (reissueError: any) {
        // 7. 토큰 갱신 실패 (Refresh Token 만료 등)
        console.error("토큰 갱신 실패", reissueError.response?.data);
        useAuthStore.getState().logout(); // 로그아웃
        isRefreshing = false;
        failedQueue = []; // 큐 비우기
        return Promise.reject(reissueError);
      }
    }

    // 3. CASE 2: 그 외 다른 401 에러 (INVALID_TOKEN_SIGNATURE)
    if (error.response?.status === 401) {
      console.error("유효하지 않은 토큰. 로그아웃", error.response?.data);
      useAuthStore.getState().logout(); // 로그아웃
    }

    return Promise.reject(error);
  }
);

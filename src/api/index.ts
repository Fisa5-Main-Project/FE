import axios from "axios";

// .env.local 파일에서 BASE_URL 불러오기
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// axios 공통 인스턴스 생성
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true, // 쿠키/세션 기반 인증인 경우
});

/*
// 나중에 토큰 인증이 필요할 때 (ex. 로그인 후)
// 요청 인터셉터를 사용해 모든 요청 헤더에 토큰을 자동으로 추가
apiClient.interceptors.request.use(
  (config) => {
    // localStorage에서 토큰 가져오기
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
*/

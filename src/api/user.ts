
import { apiClient } from './index';
import type { ApiResponse } from '@/types/api';
import type { UserInfo, UserAsset } from '@/types/user';
import { handleApiCall } from './apiHandler';

/**
 * [4] 사용자 정보 API
 * GET /api/v1/user/info
 * 로그인한 사용자 정보 조회
 */
export const getUserInfo = (): Promise<ApiResponse<UserInfo>> => {
    return handleApiCall(
        () => apiClient.get<ApiResponse<UserInfo>>('/user/info'),
        '사용자 정보를 불러오는 중 알 수 없는 오류가 발생했습니다.'
    );
};

/**
 * [5] 메인 페이지 자산 상세 정보 API
 * GET /api/vi/user/assets
 * 메인 화면 버블 UI 표시를 위한 자산 항목별 구성 비율 조회
 */
export const getUserAsset = (): Promise<ApiResponse<UserAsset[]>> => {
    return handleApiCall(
        () => apiClient.get<ApiResponse<UserAsset[]>>('/user/assets'),
        '자산 상세 정보를 불러오는 중 알 수 없는 오류가 발생했습니다.'
    );
};
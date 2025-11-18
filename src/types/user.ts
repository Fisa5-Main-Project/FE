// 사용자 정보 API
export interface MainDataResponse {
    user_id: number;
    name: string; // 사용자 이름
    user_mydata_registration: boolean; // 마이데이터 등록 여부
    asset_total: number | null; // 총자산
    investment_tendency: string | null; // 투자 성향
}
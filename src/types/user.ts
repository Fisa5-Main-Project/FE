export interface UserInfo {
    userId: number;
    loginId: string;
    name: string;
    phoneNum: string;
    birth: string;
    gender: 'M' | 'F';
    investmentTendency: string;
    provider: string | null;
    userMydataRegistration: boolean;
    assetTotal: number | null;
}

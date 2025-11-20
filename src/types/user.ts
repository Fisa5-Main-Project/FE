// src/types/user.ts

export interface UserInfo {
    userId: number;
    loginId: string;
    name: string;
    phoneNum: string;
    birth: string;
    gender: 'M' | 'F';
    investmentTendancy: string;
    provider: string | null;
    userMydataRegistration: boolean;
}

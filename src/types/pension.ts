/**
 * 연급 타입
 * DB/DC/IRP 계좌 정보를 구조화하고, 존재 여부를 Optional로 표현
 * 추후 백엔드 연동 예정
 */

export interface DbAccount {
  assetId?: number; // 존재 여부 판단에 사용
  accountNumber: string;
  currentAmount: number; // 현재 금액(원)
  recent3mAvgSalary: number; // 최근 3개월 평균 급여(원)
  tenureYears: number; // 근속 기간(년)
}

export interface DcAccount {
  assetId?: number;
  accountNumber: string;
  currentAmount: number; // 현재 금액(원)
  principal: number; // 원금(원)
  yieldPercent: number; // 수익률 (예: 0.058 = 5.8%)
}

export interface IrpAccount {
  assetId?: number;
  accountNumber: string;
  currentAmount: number; // 현재 금액(원)
  principal: number; // 납입 원금(원)
  yieldPercent: number; // 수익률 (예: -0.37 = -37.0%)
}

export interface PensionAccounts {
  db?: Partial<DbAccount> | {};
  dc?: Partial<DcAccount> | {};
  irp?: Partial<IrpAccount> | {};
}

export function hasAccount<T extends object>(obj: T | undefined | null): obj is T {
  return !!obj && Object.keys(obj).length > 0;
}


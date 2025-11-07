/**
 * 연금 계좌 타입
 * - 빈 객체 {} 는 해당 계좌가 없음을 의미
 */

// DB형: 존재 여부 + 계좌명
export interface DbAccount {
  assetId: number;
  accountName?: string;
  pensionType?: 'DB';
}

// DC형: 공통 메타 + 납입/잔액 정보
export interface DcAccount {
  assetId: number;
  accountName?: string;
  pensionType?: 'DC';
  companyContrib: number;
  personalContrib: number;
  contribYear: number;
  balance: number;
}

// IRP형: 공통 메타 + 납입/잔액 정보
export interface IrpAccount {
  assetId: number;
  accountName?: string;
  pensionType?: 'IRP';
  personalContrib: number; // 연간 개인 납입액
  contribYear: number; // 납입 연도
  totalPersonalContrib: number; // 누적 개인 납입액
  balance: number; // 현재 잔액
}

export interface PensionAccounts {
  db?: Partial<DbAccount> | {};
  dc?: Partial<DcAccount> | {};
  irp?: Partial<IrpAccount> | {};
}

export function hasAccount<T extends object>(obj: T | undefined | null): obj is T {
  return !!obj && Object.keys(obj).length > 0;
}

import React from "react";
import { DbAccount, DcAccount, IrpAccount, PensionAccounts, hasAccount } from "@/types/pension";
import DbCard from "@/components/pension/detail/DbCard";
import DcCard from "@/components/pension/detail/DcCard";
import IrpCard from "@/components/pension/detail/IrpCard";

/**
 * 세부 내역 카드 컨테이너
 * DB/DC/IRP 중 존재하는 계좌만 개별 카드로 렌더링
 * 추후 백엔드 연동 예정: accounts는 마이데이터/메인 서버에서 수신한 값으로 대체
 */
export default function PensionDetailCard({ accounts }: { accounts: PensionAccounts }) {
  const list: React.ReactNode[] = [];

  if (hasAccount(accounts.db)) {
    const db = accounts.db as DbAccount;
    list.push(<DbCard key="db" account={db} />);
  }
  if (hasAccount(accounts.dc)) {
    const dc = accounts.dc as DcAccount;
    list.push(<DcCard key="dc" account={dc} />);
  }
  if (hasAccount(accounts.irp)) {
    const irp = accounts.irp as IrpAccount;
    list.push(<IrpCard key="irp" account={irp} />);
  }

  return <div className="flex flex-col gap-4 w-full">{list}</div>;
}


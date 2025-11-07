'use client';

import { useState } from 'react';

/**
 * '예상 생활비' 페이지의 폼 상태와 로직을 관리하는 훅입니다.
 */
export function useLivingExpensesForm(initialAmount: string = '') {
  const [amount, setAmount] = useState(initialAmount);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  // 금액이 0보다 클 때만 다음 버튼을 활성화합니다.
  const isNextDisabled = !amount || parseInt(amount, 10) <= 0;

  return {
    amount,
    handleAmountChange,
    isNextDisabled,
  };
}

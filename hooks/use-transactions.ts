import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";

export interface TransactionSummary {
  income: number;
  expense: number;
  balance: number;
}

export function useTransactions(startDate?: Date, endDate?: Date) {
  const [summary, setSummary] = useState<TransactionSummary>({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const { data: transactions, isLoading } = trpc.transactions.list.useQuery({
    startDate,
    endDate,
  });

  const { data: stats } = trpc.transactions.stats.useQuery(
    startDate && endDate
      ? { startDate, endDate }
      : { startDate: new Date(), endDate: new Date() },
    { enabled: !!startDate && !!endDate }
  );

  useEffect(() => {
    if (stats) {
      setSummary({
        income: stats.income,
        expense: stats.expense,
        balance: stats.income - stats.expense,
      });
    }
  }, [stats]);

  return {
    transactions: transactions || [],
    summary,
    isLoading,
  };
}

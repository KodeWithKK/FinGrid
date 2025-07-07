import dayjs from "dayjs";

import { Transaction } from "@/database/schema";

export interface TransactionByMonth {
  year: number;
  month: number;
  transactions: Transaction[];
}

export const getTransactionByMonth = (
  transactions: Transaction[],
): TransactionByMonth[] => {
  const transactionByMonth: TransactionByMonth[] = [];

  for (const transaction of transactions) {
    const year = dayjs(transaction.createdAt).year();
    const month = dayjs(transaction.createdAt).month();

    const existingMonth = transactionByMonth.find(
      (m) => m.year === year && m.month === month,
    );

    if (existingMonth) {
      existingMonth.transactions.push(transaction);
    } else {
      transactionByMonth.push({ year, month, transactions: [transaction] });
    }
  }

  return transactionByMonth;
};

export const monthMap = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

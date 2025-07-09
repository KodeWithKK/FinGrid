import dayjs from "dayjs";

import { Transaction } from "@/database/schema";

import { transactionCategories } from "./constants";

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

export const monthNames: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface TransactionCategoryBreakdown {
  category: keyof typeof transactionCategories;
  expense: number;
}

interface FormattedTransactionCategoryBreakdown {
  category: string;
  expense: number;
}

export const getAvgTransactionBreakdown = (
  transactions: Transaction[],
): FormattedTransactionCategoryBreakdown[] => {
  const transactionCategoryBreakdown: TransactionCategoryBreakdown[] = [];

  for (const transaction of transactions) {
    if (transaction.type !== "expense") continue;

    const existingCategory = transactionCategoryBreakdown.find(
      (c) => c.category === transaction.category,
    );

    if (existingCategory) {
      existingCategory.expense += transaction.amount;
    } else {
      transactionCategoryBreakdown.push({
        category: transaction.category,
        expense: transaction.amount,
      });
    }
  }

  return transactionCategoryBreakdown
    .map((item) => ({
      category:
        item.category === "foodDining"
          ? "Food"
          : transactionCategories[item.category],
      expense: Math.trunc(item.expense / transactions.length),
    }))
    .sort((a, b) => b.expense - a.expense);
};

export const getTransactionMetrics = (
  transactions: Transaction[],
  budget: number,
) => {
  const transactionsByMonth = getTransactionByMonth(transactions);
  const thisMonthTransaction =
    transactionsByMonth.find(
      (transaction) =>
        transaction.year === dayjs().year() &&
        transaction.month === dayjs().month(),
    )?.transactions || [];

  const prevMonthTransaction =
    transactionsByMonth.find(
      (transaction) =>
        transaction.year === dayjs().subtract(1, "month").year() &&
        transaction.month === dayjs().subtract(1, "month").month(),
    )?.transactions || [];

  const thisMonthIncome = thisMonthTransaction.reduce(
    (acc, curr) => acc + (curr.type === "income" ? curr.amount : 0),
    0,
  );

  const prevMonthIncome = prevMonthTransaction.reduce(
    (acc, curr) => acc + (curr.type === "income" ? curr.amount : 0),
    0,
  );

  const thisMonthExpense = thisMonthTransaction.reduce(
    (acc, curr) => acc + (curr.type === "expense" ? curr.amount : 0),
    0,
  );
  const prevMonthExpense = prevMonthTransaction.reduce(
    (acc, curr) => acc + (curr.type === "expense" ? curr.amount : 0),
    0,
  );

  return {
    totalIncome: {
      thisMonth: thisMonthIncome,
      changeInPercentage:
        ((thisMonthIncome - prevMonthIncome) / prevMonthIncome) * 100,
    },
    totalExpense: {
      thisMonth: thisMonthExpense,
      changeInPercentage:
        ((thisMonthExpense - prevMonthExpense) / prevMonthExpense) * 100,
    },
    netBalance: {
      thisMonth: thisMonthIncome - thisMonthExpense,
      changeInPercentage:
        ((thisMonthIncome -
          thisMonthExpense -
          (prevMonthIncome - prevMonthExpense)) /
          prevMonthIncome) *
        100,
    },
    budgetLeft: {
      thisMonth: budget - thisMonthExpense,
      changeInPercentage:
        ((budget - thisMonthExpense - (budget - prevMonthExpense)) /
          prevMonthExpense) *
        100,
    },
  };
};

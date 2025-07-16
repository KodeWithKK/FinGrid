import dayjs from "dayjs";

import { Budget, Transaction } from "@/database/schema";

import { ExpenseCategoryKeys } from "./constants";

export function getBudgetSpentByCategory(
  transactions: Transaction[],
  category: ExpenseCategoryKeys,
  month: number,
  year: number,
) {
  return transactions
    .filter(
      (transaction) =>
        transaction.type === "expense" &&
        transaction.category === category &&
        dayjs(transaction.createdAt).month() === month &&
        dayjs(transaction.createdAt).year() === year,
    )
    .reduce((acc, curr) => acc + curr.amount, 0);
}

export function getBudgetByMonth(
  budgets: Budget[],
  month: number,
  year: number,
): number {
  return budgets
    .filter(
      (budget) =>
        dayjs(budget.createdAt).month() === month &&
        dayjs(budget.createdAt).year() === year,
    )
    .reduce((acc, curr) => acc + curr.amount, 0);
}

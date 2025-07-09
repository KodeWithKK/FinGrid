"use client";

import { useMemo } from "react";
import dayjs from "dayjs";
import {
  CircleArrowUp,
  CreditCard,
  IndianRupee,
  Target,
  TrendingUp,
} from "lucide-react";

import AreaChart from "@/components/charts/area-chart";
import PieChart from "@/components/charts/pie-chart";
import { IconLoader2 } from "@/components/icons";
import { useAppContext } from "@/contexts/app-provider";
import { transactionCategories } from "@/lib/constants";
import {
  getAvgTransactionBreakdown,
  getTransactionByMonth,
  getTransactionMetrics,
  monthNames,
} from "@/lib/transaction-utils";
import { cn } from "@/lib/utils";

import MetricsCard from "./_components/metrics-card";

function HomePage() {
  const { isTransactionsLoading, transactions } = useAppContext();

  const metrics = useMemo(
    () => getTransactionMetrics(transactions || [], 32000),
    [transactions],
  );

  if (isTransactionsLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-2">
        <IconLoader2 className="h-8 animate-spin" />
        <span className="text-muted-foreground text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-3xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground mt-1">
          Overview of your financial activity
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        <MetricsCard
          title="Total Income"
          amount={metrics.totalIncome.thisMonth}
          percentage={metrics.totalIncome.changeInPercentage}
          Icon={IndianRupee}
        />
        <MetricsCard
          title="Total Expenses"
          amount={metrics.totalExpense.thisMonth}
          percentage={metrics.totalExpense.changeInPercentage}
          Icon={CreditCard}
        />
        <MetricsCard
          title="Net Balance"
          amount={metrics.netBalance.thisMonth}
          percentage={metrics.netBalance.changeInPercentage}
          Icon={TrendingUp}
        />
        <MetricsCard
          title="Budget Left"
          amount={metrics.budgetLeft.thisMonth}
          percentage={metrics.budgetLeft.changeInPercentage}
          Icon={Target}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 *:w-full lg:grid-cols-2">
        <AreaChart
          title="Monthly Expenses"
          xAxisDataKey="month"
          yAxisDataKey="expense"
          yAxisDataLabel="Expense"
          yAxisTickFormatter={(value) =>
            `₹ ${value > 1000 ? `${value / 1000}k` : value}`
          }
          chartData={getTransactionByMonth(transactions!).map((m) => ({
            month: monthNames[m.month],
            expense: m.transactions.reduce(
              (acc, t) => acc + (t.type === "expense" ? t.amount : 0),
              0,
            ),
          }))}
        />
        <PieChart
          title="Avg Monthly Expenses Breakdown"
          nameKey="category"
          dataKey="expense"
          chartData={getAvgTransactionBreakdown(transactions!)}
        />
      </div>

      <div className="bg-card rounded-xl border p-4">
        <h3 className="text-xl font-semibold">Recent Transactions</h3>

        <div className="mt-2">
          {transactions!.slice(0, 5).map((transaction) => (
            <div
              key={transaction._id}
              className="bg-card border-border/80 flex items-center gap-4 rounded-md border-b px-3 py-2 last:border-b-0 max-sm:pr-2"
            >
              <CircleArrowUp
                className={cn(
                  "text-primary h-6 w-6",
                  transaction.type === "expense" && "text-destructive",
                )}
              />

              <div className="flex-1 space-y-1">
                <p className="text-sm leading-none font-medium">
                  {transaction.description
                    ? transaction.description
                    : transactionCategories[transaction.category]}
                </p>
                <p className="text-muted-foreground text-xs">
                  <span>
                    {dayjs(transaction.createdAt).format("DD MMM, YYYY")}
                  </span>
                </p>
              </div>

              <div className="flex flex-1 items-center justify-end sm:gap-2">
                <p
                  className={cn(
                    "text-primary shrink-0 px-2 font-medium",
                    transaction.type === "expense" && "text-destructive",
                  )}
                >
                  {transaction.type === "expense" ? "-" : "+"}
                  {" ₹ " + transaction.amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;

"use client";

import { useMemo } from "react";
import { CreditCard, IndianRupee, Target, TrendingUp } from "lucide-react";

import AreaChart from "@/components/charts/area-chart";
import PieChart from "@/components/charts/pie-chart";
import { IconLoader2 } from "@/components/icons";
import { useAppContext } from "@/contexts/app-provider";
import {
  getAvgTransactionBreakdown,
  getTransactionByMonth,
  getTransactionMetrics,
  monthNames,
} from "@/lib/transaction-utils";

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

      <div className="flex gap-4">
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

      {!isTransactionsLoading && (
        <div className="flex gap-4 *:w-full">
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
      )}
    </div>
  );
}

export default HomePage;

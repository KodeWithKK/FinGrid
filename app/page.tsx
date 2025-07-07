"use client";

import { IndianRupee, TrendingUp } from "lucide-react";

import AreaChart from "@/components/charts/area-chart";
import PieChart from "@/components/charts/pie-chart";

function HomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground mt-1">
          Overview of your financial activity
        </p>
      </div>

      <div className="flex gap-4">
        <MetricsCard />
        <MetricsCard />
        <MetricsCard />
        <MetricsCard />
      </div>

      <div className="flex gap-4 *:w-full">
        <AreaChart
          title="Monthly Expenses"
          xAxisDataKey="month"
          yAxisDataKey="expense"
          yAxisDataLabel="Expense"
          yAxisTickFormatter={(value) => `₹ ${value}`}
          chartData={[
            { month: "January", expense: 186 },
            { month: "February", expense: 305 },
            { month: "March", expense: 237 },
            { month: "April", expense: 73 },
            { month: "May", expense: 209 },
            { month: "June", expense: 214 },
          ]}
        />
        <PieChart
          title="Avg Monthly Expenses Breakdown"
          nameKey="category"
          dataKey="expenditure"
          chartData={[
            { category: "Food", expenditure: 350 },
            { category: "Shopping", expenditure: 280 },
            { category: "Utilities", expenditure: 150 },
            { category: "Transport", expenditure: 120 },
            { category: "Entertainment", expenditure: 200 },
            { category: "Other", expenditure: 100 },
          ]}
        />
      </div>
    </div>
  );
}

function MetricsCard() {
  return (
    <div className="bg-card border-border/60 hover:border-border w-full space-y-2 rounded-md border p-6 transition-colors">
      <div className="flex justify-between">
        <span className="text-muted-foreground text-sm font-medium">
          Total Income
        </span>
        <IndianRupee className="text-muted-foreground h-4" />
      </div>

      <h2 className="text-2xl font-semibold">₹ 0.00</h2>
      <div className="text-primary flex items-center text-xs">
        <TrendingUp className="h-3.5" />
        <span>+12.3%</span>
        <span className="text-muted-foreground ml-1">from last month</span>
      </div>
    </div>
  );
}

export default HomePage;

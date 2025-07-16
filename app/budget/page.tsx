"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import LoadingScreen from "@/components/loading-screen";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/app-provider";

import AddBudgetForm from "./_components/add-budget-form";
import BudgetItem from "./_components/budget-item";

function BudgetPage() {
  const { budgets, isBudgetsLoading } = useAppContext();
  const [showAddBudgetForm, setShowAddBudgetForm] = useState(false);

  if (isBudgetsLoading) return <LoadingScreen />;

  return (
    <>
      <AddBudgetForm
        showModal={showAddBudgetForm}
        onClose={() => setShowAddBudgetForm(false)}
      />

      <div className="space-y-6">
        <div className="flex gap-4 max-sm:flex-col sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold">Budget</h2>
            <p className="text-muted-foreground mt-1">
              Manage your monthly budget and track spending
            </p>
          </div>
          <Button
            size="lg"
            className="self-start pr-4 pl-3"
            onClick={() => setShowAddBudgetForm(true)}
          >
            <Plus className="mr-0.5 h-4" />
            <span>Add Budget</span>
          </Button>
        </div>

        {/* <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          <SummaryCard
            title="Total Budget"
            amount={48000}
            percentage={20.0}
            Icon={IndianRupee}
          />
          <SummaryCard
            title="Total Spent"
            amount={23700}
            percentage={27.96}
            Icon={CreditCard}
          />
          <SummaryCard
            title="Estimated Spent"
            amount={24300}
            percentage={43}
            Icon={TrendingUp}
          />
          <SummaryCard
            title="Budget Left"
            amount={8300}
            percentage={27.96}
            Icon={Target}
          />
        </div> */}

        <div className="space-y-4">
          <h3 className="font-serif text-2xl font-medium">Budget History</h3>

          <div className="space-y-2">
            {budgets?.length === 0 && (
              <p className="text-muted-foreground">No Budgets found</p>
            )}
            {budgets?.map((budget) => (
              <BudgetItem key={budget._id} budget={budget} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default BudgetPage;

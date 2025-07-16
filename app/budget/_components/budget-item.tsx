"use client";

import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { SquarePen, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { IconLoader } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/app-provider";
import { Budget } from "@/database/schema";
import { getBudgetSpentByCategory } from "@/lib/budget-utils";
import { expenseCategory } from "@/lib/constants";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import { deleteBudget } from "@/services/budget";

import { ProgressBar } from "./progress-bar";
import UpdateBudgetForm from "./update-budget-form";

function BudgetItem({ budget }: { budget: Budget }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const queryClient = useQueryClient();
  const { transactions } = useAppContext();

  const onDelete = async () => {
    setIsDeleting(true);
    const isDeleted = await deleteBudget(budget._id);
    setIsDeleting(false);

    if (isDeleted) {
      queryClient.setQueryData<Budget[]>(["budgets"], (prev) =>
        prev ? prev.filter((t) => t._id !== budget._id) : prev,
      );

      toast.success("Transaction deleted successfully.");
    } else {
      toast.error("Something went wrong while deleting transaction.");
    }
  };

  const totalSpent = useMemo(
    () =>
      getBudgetSpentByCategory(
        transactions!,
        budget.category,
        dayjs().month(),
        dayjs().year(),
      ),
    [transactions, budget],
  );

  const totalSpentPercentage = useMemo(
    () => (totalSpent / budget.amount) * 100,
    [totalSpent, budget.amount],
  );

  const statusText = useMemo(() => {
    if (totalSpentPercentage > 100) return "Missed";
    else if (totalSpentPercentage > 90) return "High";
    else if (totalSpentPercentage > 70) return "Near";
    else return "On Track";
  }, [totalSpentPercentage]);

  return (
    <>
      <UpdateBudgetForm
        showModal={showEditForm}
        onClose={() => setShowEditForm(false)}
        budget={budget}
      />

      <div className="bg-card rounded-lg p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* <ShoppingCart className="h-5 w-5" /> */}
            <span className="font-semibold">
              {expenseCategory[budget.category]}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "rounded-full bg-green-500 px-2 py-1 text-xs text-white",
                totalSpentPercentage > 70 && "bg-amber-500",
                totalSpentPercentage > 90 && "bg-red-500",
              )}
            >
              {statusText}
            </span>
            <div className="flex items-center pl-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowEditForm(true)}
              >
                <SquarePen className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                disabled={isDeleting}
                onClick={onDelete}
              >
                {!isDeleting && <Trash2 className="text-destructive w-4" />}
                {isDeleting && (
                  <IconLoader className="text-destructive w-5 animate-spin" />
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="text-muted-foreground mt-2 text-sm">
          <span
            className={cn(
              "text-green-500",
              totalSpentPercentage > 70 && "text-amber-500",
              totalSpentPercentage > 90 && "text-red-500",
            )}
          >
            {formatPrice(totalSpent)}
          </span>
          {" / "}
          {formatPrice(budget.amount)}
        </div>
        <ProgressBar percentage={totalSpentPercentage} />
      </div>
    </>
  );
}

export default BudgetItem;

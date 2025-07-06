"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormInput, FormSelect } from "@/components/form-fields";
import { IconLoader } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/database/schema";
import { transactionCategories } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { deleteTransaction, getTransactions } from "@/services/transactions";

import AddTransactionForm from "./add-transaction-form";
import UpdateTransactionForm from "./update-transaction-form";

function TransitionsPage() {
  const [showAddTransactionsForm, setShowAddTransactionsForm] = useState(false);
  const { control } = useForm({});

  const { isLoading, data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
  });

  return (
    <>
      <AddTransactionForm
        showModal={showAddTransactionsForm}
        onClose={() => setShowAddTransactionsForm(false)}
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Transactions</h2>
            <p className="text-muted-foreground mt-1">
              Manage your income and expenses
            </p>
          </div>
          <Button
            size="lg"
            className="pr-4 pl-3"
            onClick={() => setShowAddTransactionsForm(true)}
          >
            <Plus className="mr-0.5 h-4" />
            <span>Add Transaction</span>
          </Button>
        </div>

        <div className="flex gap-4">
          <FormInput placeholder="Search transactions..." />
          <FormSelect
            control={control}
            registerName="category"
            defaultValue="all"
            options={{ all: "All Categories", ...transactionCategories }}
            className="w-52"
          />
          <FormSelect
            control={control}
            registerName="type"
            defaultValue="all"
            options={{ all: "All Types", income: "Income", expense: "Expense" }}
            className="w-38"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-medium">All Transactions</h3>

          <div className="space-y-2">
            {!isLoading &&
              transactions?.map((transaction) => (
                <TransactionItem
                  key={transaction._id}
                  transaction={transaction}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const queryClient = useQueryClient();
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    setIsDeleting(true);
    const isDeleted = await deleteTransaction(transaction._id);
    setIsDeleting(false);

    if (isDeleted) {
      queryClient.setQueryData<Transaction[]>(["transactions"], (prev) => {
        return prev ? prev.filter((t) => t._id !== transaction._id) : prev;
      });

      toast.success("Transaction deleted successfully.");
    } else {
      toast.error("Something went wrong while deleting transaction.");
    }
  };

  return (
    <>
      <UpdateTransactionForm
        showModal={showEditModal}
        onClose={() => setShowEditModal(false)}
        transaction={transaction}
      />

      <div
        key={transaction._id}
        className="bg-popover flex items-center gap-4 rounded-md px-3 py-2"
      >
        <div className="flex-1 space-y-1">
          <p className="text-sm leading-none font-medium">
            {transactionCategories[transaction.category]}
          </p>
          {transaction.description && (
            <p className="text-muted-foreground text-sm italic">
              Lunch at The Bistro
            </p>
          )}
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          <p
            className={cn(
              "text-primary shrink-0 px-2 font-medium",
              transaction.type === "expense" && "text-destructive",
            )}
          >
            {transaction.type === "expense" ? "-" : "+"}
            {" ₹ " + transaction.amount}
          </p>
          <Button
            variant="ghost"
            className="p-3"
            onClick={() => setShowEditModal(true)}
          >
            <SquarePen className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            className="p-3"
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
    </>
  );
}

export default TransitionsPage;

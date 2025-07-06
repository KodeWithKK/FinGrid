"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { FormInput, FormSelect } from "@/components/form-fields";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/database/schema";
import { transactionCategories } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { getTransactions } from "@/services/transactions";

import AddTransactionForm from "./add-transaction-form";
import UpdateTransactionForm from "./update-transaction-form";

function TransitionsPage() {
  const [showAddTransactionsForm, setShowAddTransactionsForm] = useState(false);
  const { control } = useForm({});

  const { isLoading, data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
  });

  console.log(transactions);

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
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <UpdateTransactionForm
        showModal={showEditModal}
        onClose={() => setShowEditModal(false)}
        transaction={transaction}
      />

      <div
        key={transaction._id}
        className="bg-muted/60 flex items-center gap-4 rounded-md px-3 py-2"
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
          <Button variant="ghost" className="p-3">
            <Trash2 className="text-destructive h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}

export default TransitionsPage;

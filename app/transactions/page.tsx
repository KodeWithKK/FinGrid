"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { FormInput, FormSelect } from "@/components/form-fields";
import { IconLoader } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/app-provider";
import { transactionCategories } from "@/lib/constants";

import AddTransactionForm from "./add-transaction-form";
import TransactionItem from "./transaction-item";

function TransitionsPage() {
  const [showAddTransactionsForm, setShowAddTransactionsForm] = useState(false);
  const { control } = useForm({});

  const { isTransactionsLoading, transactions } = useAppContext();

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

          {isTransactionsLoading && (
            <div className="flex items-center justify-center py-10">
              <IconLoader className="h-8 w-8 animate-spin" />
            </div>
          )}

          {!isTransactionsLoading && (
            <div className="space-y-2">
              {transactions?.map((transaction) => (
                <TransactionItem
                  key={transaction._id}
                  transaction={transaction}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TransitionsPage;

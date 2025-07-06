"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { FormInput, FormSelect } from "@/components/form-fields";
import { Button } from "@/components/ui/button";
import { getTransactions } from "@/services/transactions";

import AddTransactionForm from "./add-transaction-form";

function TransitionsPage() {
  const [showTransactionsForm, setShowTransactionsForm] = useState(false);
  const { control } = useForm({});

  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => getTransactions(),
  });

  console.log(transactions);

  return (
    <div>
      <AddTransactionForm
        showModal={showTransactionsForm}
        onClose={() => setShowTransactionsForm(false)}
      />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Transactions</h2>
          <p className="text-muted-foreground mt-1">
            Manage your income and expenses
          </p>
        </div>
        <Button
          size="lg"
          className="pr-4 pl-3"
          onClick={() => setShowTransactionsForm(true)}
        >
          <Plus className="mr-0.5 h-4" />
          <span>Add Transaction</span>
        </Button>
      </div>

      <div className="mt-6 flex gap-4">
        <FormInput placeholder="Search transactions..." />
        <FormSelect
          control={control}
          registerName="category"
          defaultValue="all"
          options={{
            all: "All Categories",
            foodDining: "Food & Dining",
            groceries: "Groceries",
            transportation: "Transportation",
            entertainment: "Entertainment",
            shopping: "Shopping",
            utilities: "Utilities",
            healthcare: "Healthcare",
            travel: "Travel",
            education: "Education",
            subscriptions: "Subscriptions",
            other: "Other",
          }}
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
    </div>
  );
}

export default TransitionsPage;

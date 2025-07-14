"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { FormInput, FormSelect } from "@/components/form-fields";
import LoadingScreen from "@/components/loading-screen";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/app-provider";
import { Transaction } from "@/database/schema";
import { transactionCategories } from "@/lib/constants";
import { searchSchema, SearchSchema } from "@/schemas";

import AddTransactionForm from "./_components/add-transaction-form";
import TransactionItem from "./_components/transaction-item";

function TransitionsPage() {
  const { isTransactionsLoading, transactions } = useAppContext();
  const [showAddTransactionsForm, setShowAddTransactionsForm] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);

  const { watch, register, control } = useForm<SearchSchema>({
    mode: "onChange",
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
      type: "all",
      category: "all",
    },
  });

  const searchQuery = watch("query");
  const seatchType = watch("type");
  const searchCategory = watch("category");

  useEffect(() => {
    if (transactions) {
      const filtered = transactions.filter((transaction) => {
        const matchesQuery = searchQuery
          ? transaction.category
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            (transaction?.description || "")
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          : true;
        const matchesType =
          seatchType === "all" || transaction.type === seatchType;
        const matchesCategory =
          searchCategory === "all" || transaction.category === searchCategory;
        return matchesQuery && matchesType && matchesCategory;
      });

      setFilteredTransactions(filtered);
    }
  }, [transactions, searchQuery, seatchType, searchCategory]);

  if (isTransactionsLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <AddTransactionForm
        showModal={showAddTransactionsForm}
        onClose={() => setShowAddTransactionsForm(false)}
      />

      <div className="space-y-6">
        <div className="flex gap-4 max-sm:flex-col sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-3xl font-bold">Transactions</h2>
            <p className="text-muted-foreground mt-1">
              Manage your income and expenses
            </p>
          </div>
          <Button
            size="lg"
            className="self-start pr-4 pl-3"
            onClick={() => setShowAddTransactionsForm(true)}
          >
            <Plus className="mr-0.5 h-4" />
            <span>Add Transaction</span>
          </Button>
        </div>

        <div className="flex gap-2 max-sm:flex-col sm:gap-4">
          <FormInput
            {...register("query")}
            placeholder="Search transactions..."
            showSearchIcon
          />
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
          <h3 className="font-serif text-2xl font-medium">
            Transaction History
          </h3>

          <div className="space-y-2">
            {filteredTransactions?.map((transaction) => (
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

export default TransitionsPage;

"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { CircleArrowUp, SquarePen, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { IconLoader } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/database/schema";
import { transactionCategories } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { deleteTransaction } from "@/services/transactions";

import UpdateTransactionForm from "./update-transaction-form";

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const queryClient = useQueryClient();
  const [showEditModal, setShowEditModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    setIsDeleting(true);
    const isDeleted = await deleteTransaction(transaction._id);
    setIsDeleting(false);

    if (isDeleted) {
      queryClient.setQueryData<Transaction[]>(["transactions"], (prev) =>
        prev ? prev.filter((t) => t._id !== transaction._id) : prev,
      );

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

      <div className="bg-card flex items-center gap-4 rounded-md px-3 py-2 max-sm:pr-2">
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
            <span>{dayjs(transaction.createdAt).format("DD MMM, YYYY")}</span>
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

export default TransactionItem;

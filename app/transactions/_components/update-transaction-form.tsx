"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Wallet } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  FormCalendar,
  FormInput,
  FormSelect,
  FormTextArea,
} from "@/components/form-fields";
import { IconLoader } from "@/components/icons";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/database/schema";
import { transactionCategories } from "@/lib/constants";
import { transactionFormschema } from "@/schemas";
import { updateTransaction } from "@/services/transactions";

interface UpdateTransactionFormProps {
  showModal: boolean;
  onClose: () => void;
  transaction: Transaction;
}

function UpdateTransactionForm({
  showModal,
  onClose,
  transaction,
}: UpdateTransactionFormProps) {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionFormschema),
    defaultValues: transaction,
  });

  useEffect(() => {
    reset(transaction);
  }, [showModal, reset, transaction]);

  const onUpdate = handleSubmit(
    async (data) => {
      setIsUpdating(true);
      const isUpdated = await updateTransaction(transaction._id, data);
      setIsUpdating(false);

      if (isUpdated) {
        toast.success("Transaction updated successfully.");

        queryClient.setQueryData<Transaction[]>(
          ["transactions"],
          (prevTransactions) => {
            if (prevTransactions) {
              return prevTransactions
                .map((trx) =>
                  trx._id === transaction._id
                    ? {
                        ...trx,
                        ...data,
                        updatedAt: new Date(),
                      }
                    : trx,
                )
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
            }
            return prevTransactions;
          },
        );
        onClose();
      } else {
        toast.error("Something went wrong while updating the transaction.");
      }
    },
    () => {
      toast.error("Something went wrong while updating the transaction.");
    },
  );

  return (
    <Modal showModal={showModal} onClose={onClose} className="space-y-6">
      <div className="flex items-center gap-3">
        <Wallet className="h-6" />
        <h3 className="text-lg font-semibold">Update Transaction</h3>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2 *:w-full">
          <FormSelect
            control={control}
            label="Type"
            registerName="type"
            defaultValue="expense"
            options={{ income: "Income", expense: "Expense" }}
          />

          <FormInput
            {...register("amount")}
            type="number"
            label="Amount"
            placeholder="0.00"
            error={errors?.amount?.message}
          />
        </div>

        <div className="flex gap-2 *:w-full">
          <FormCalendar
            control={control}
            registerName="createdAt"
            label="Date"
          />
          <FormSelect
            control={control}
            label="Category"
            registerName="category"
            defaultValue="salary"
            options={transactionCategories}
          />
        </div>

        <FormTextArea
          {...register("description")}
          label="Description (Optional)"
          maxHeight={100}
          placeholder="Enter transaction description..."
          error={errors?.description?.message}
        />
      </div>

      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={onClose}
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button
          size="lg"
          className="w-full"
          onClick={onUpdate}
          disabled={isUpdating}
        >
          {isUpdating && <IconLoader className="h-5 animate-spin" />}
          <span>{isUpdating ? "Updating..." : "Update Transaction"}</span>
        </Button>
      </div>
    </Modal>
  );
}

export default UpdateTransactionForm;

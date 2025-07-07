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
import { testUserId, transactionCategories } from "@/lib/constants";
import { transactionFormschema } from "@/schemas";
import { addTransaction } from "@/services/transactions";

interface AddTransactionFormProps {
  showModal: boolean;
  onClose: () => void;
}

function AddTransactionForm({ showModal, onClose }: AddTransactionFormProps) {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(transactionFormschema),
    defaultValues: {
      type: "income",
      category: "salary",
      createdAt: new Date(),
    },
  });

  useEffect(() => {
    reset();
  }, [showModal, reset]);

  const onSubmit = handleSubmit(
    async (data) => {
      setIsAdding(true);
      const insertedTransactionId = await addTransaction(data);
      setIsAdding(false);

      if (insertedTransactionId) {
        toast.success("Transaction added successfully.");

        queryClient.setQueryData<Transaction[]>(
          ["transactions"],
          (prevTransactions) => {
            if (prevTransactions) {
              prevTransactions.push({
                ...data,
                _id: insertedTransactionId,
                updatedAt: new Date(),
                userId: testUserId,
              });
              return prevTransactions.sort(
                (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
              );
            }
          },
        );

        onClose();
      } else {
        toast.error("Something went wrong while adding the transaction.");
      }
    },
    () => {
      toast.error("Something went wrong while adding the transaction.");
    },
  );

  return (
    <Modal showModal={showModal} onClose={onClose} className="space-y-6">
      <div className="flex items-center gap-3">
        <Wallet className="h-6" />
        <h3 className="text-lg font-semibold">Add New Transaction</h3>
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
          disabled={isAdding}
        >
          Cancel
        </Button>
        <Button
          size="lg"
          className="w-full space-x-2"
          onClick={onSubmit}
          disabled={isAdding}
        >
          {isAdding && <IconLoader className="h-5 animate-spin" />}
          <span>{isAdding ? "Adding..." : "Add Transaction"}</span>
        </Button>
      </div>
    </Modal>
  );
}

export default AddTransactionForm;

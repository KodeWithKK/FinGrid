"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wallet } from "lucide-react";
import { useForm } from "react-hook-form";

import {
  FormCalendar,
  FormInput,
  FormSelect,
  FormTextArea,
} from "@/components/form-fields";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/database/schema";
import { transactionCategories } from "@/lib/constants";
import { addTransactionFormSchema } from "@/schemas";
import { addTransaction } from "@/services/transactions";

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
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addTransactionFormSchema),
    defaultValues: transaction,
  });

  useEffect(() => {
    reset();
  }, [showModal, reset]);

  const onSubmit = handleSubmit(
    async (data) => {
      const insertedTransactionId = await addTransaction(data);
      console.log(insertedTransactionId);
    },
    (error) => {
      console.log(error);
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
        >
          Cancel
        </Button>
        <Button size="lg" className="w-full" onClick={onSubmit}>
          Update Transaction
        </Button>
      </div>
    </Modal>
  );
}

export default UpdateTransactionForm;

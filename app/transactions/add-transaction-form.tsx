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

import { addTransactionFormSchema } from "./schema";

interface AddTransactionFormProps {
  showModal: boolean;
  onClose: () => void;
}

function AddTransactionForm({ showModal, onClose }: AddTransactionFormProps) {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addTransactionFormSchema),
    defaultValues: {
      type: "expense",
      category: "foodDining",
    },
  });

  useEffect(() => {
    reset();
  }, [showModal, reset]);

  const onSubmit = handleSubmit(
    (data) => {
      console.log(data);
    },
    (error) => {
      console.log(error);
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
            options={{ expense: "Expense", income: "Income" }}
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
            defaultValue="foodDining"
            options={{
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

      <Button size="lg" className="w-full" onClick={onSubmit}>
        Add Transaction
      </Button>
    </Modal>
  );
}

export default AddTransactionForm;

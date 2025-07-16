"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Wallet } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormInput, FormSelect } from "@/components/form-fields";
import { IconLoader } from "@/components/icons";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Budget } from "@/database/schema";
import { expenseCategory, testUserId } from "@/lib/constants";
import { BudgetFormSchema, budgetFormSchema } from "@/schemas";
import { addBudget } from "@/services/budget";

interface AddBudgetFormProps {
  showModal: boolean;
  onClose: () => void;
}

function AddBudgetForm({ showModal, onClose }: AddBudgetFormProps) {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetFormSchema>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: {
      category: "shopping",
    },
  });

  useEffect(() => {
    reset();
  }, [showModal, reset]);

  const onSubmit = handleSubmit(
    async (data) => {
      try {
        setIsAdding(true);
        const insertedBudgetId = await addBudget(data);
        setIsAdding(false);

        toast.success("Budget added successfully.");

        queryClient.setQueryData<Budget[]>(["budgets"], (prevBudgets) => {
          if (prevBudgets) {
            prevBudgets.push({
              ...data,
              _id: insertedBudgetId,
              createdAt: new Date(),
              updatedAt: new Date(),
              userId: testUserId,
            });

            return prevBudgets.toSorted(
              (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
            );
          }
        });

        onClose();
      } catch (error: any) {
        toast.error(error?.message);
        setIsAdding(false);
      }
    },
    () => {
      toast.error("Something went wrong while adding the budget.");
    },
  );

  return (
    <Modal showModal={showModal} onClose={onClose} className="space-y-6">
      <div className="flex items-center gap-3">
        <Wallet className="h-6" />
        <h3 className="text-lg font-semibold">Add New Budget</h3>
      </div>

      <div className="space-y-4">
        <FormInput
          {...register("amount")}
          type="number"
          label="Amount"
          placeholder="0.00"
          error={errors?.amount?.message}
        />

        <div className="flex gap-2 *:w-full">
          <FormSelect
            control={control}
            label="Category"
            registerName="category"
            defaultValue="shopping"
            options={expenseCategory}
          />
        </div>
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
          <span>{isAdding ? "Adding..." : "Add Budget"}</span>
        </Button>
      </div>
    </Modal>
  );
}

export default AddBudgetForm;

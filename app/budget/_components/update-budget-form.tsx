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
import { expenseCategory } from "@/lib/constants";
import { BudgetFormSchema, budgetFormSchema } from "@/schemas";
import { updateBudget } from "@/services/budget";

interface UpdateBudgetFormProps {
  showModal: boolean;
  onClose: () => void;
  budget: Budget;
}

function UpdateBudgetForm({
  showModal,
  onClose,
  budget,
}: UpdateBudgetFormProps) {
  const queryClient = useQueryClient();
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetFormSchema>({
    resolver: zodResolver(budgetFormSchema),
    defaultValues: budget,
  });

  useEffect(() => {
    reset(budget);
  }, [showModal, reset, budget]);

  const onUpdate = handleSubmit(
    async (data) => {
      setIsUpdating(true);
      const isUpdated = await updateBudget(budget._id, data);
      setIsUpdating(false);

      if (isUpdated) {
        toast.success("Budget updated successfully.");

        queryClient.setQueryData<Budget[]>(["budgets"], (prevBudgets) => {
          if (prevBudgets) {
            return prevBudgets
              .map((b) =>
                b._id === budget._id
                  ? {
                      ...b,
                      ...data,
                      updatedAt: new Date(),
                    }
                  : b,
              )
              .toSorted(
                (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
              );
          }
          return prevBudgets;
        });
        onClose();
      } else {
        toast.error("Something went wrong while updating the budget.");
      }
    },
    () => {
      toast.error("Something went wrong while updating the budget.");
    },
  );

  return (
    <Modal showModal={showModal} onClose={onClose} className="space-y-6">
      <div className="flex items-center gap-3">
        <Wallet className="h-6" />
        <h3 className="text-lg font-semibold">Update Budget</h3>
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
          <span>{isUpdating ? "Updating..." : "Update Budget"}</span>
        </Button>
      </div>
    </Modal>
  );
}

export default UpdateBudgetForm;

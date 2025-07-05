import { Wallet } from "lucide-react";
import { useForm } from "react-hook-form";

import Calendar22 from "@/components/calendar-22";
import { FormInput, FormSelect, FormTextArea } from "@/components/form-fields";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";

interface AddTransactionFormProps {
  showModal: boolean;
  onClose: () => void;
}

function AddTransactionForm({ showModal, onClose }: AddTransactionFormProps) {
  const { control } = useForm({});

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

          <FormInput label="Amount" placeholder="0.00" />
        </div>

        <div className="flex gap-2 *:w-full">
          <Calendar22 />
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
          label="Description"
          maxHeight={100}
          placeholder="Enter transaction description..."
        />
      </div>

      <Button size="lg" className="w-full">
        Add Transaction
      </Button>
    </Modal>
  );
}

export default AddTransactionForm;

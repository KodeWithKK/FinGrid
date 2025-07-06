import * as z from "zod";

export const addTransactionFormSchema = z.object({
  type: z.enum(["expense", "income"]),
  category: z.enum([
    "foodDining",
    "groceries",
    "transportation",
    "entertainment",
    "shopping",
    "utilities",
    "healthcare",
    "travel",
    "education",
    "subscriptions",
    "other",
  ]),
  amount: z.coerce
    .number({ invalid_type_error: "Amount must be a number" })
    .positive("Amount must be a positive number"),
  createdAt: z.date({ message: "Date is required" }),
  description: z.string().optional(),
});

export type AddTransactionFormSchema = z.infer<typeof addTransactionFormSchema>;

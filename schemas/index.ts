import * as z from "zod";

export const transactionFormschema = z.object({
  type: z.enum(["expense", "income"]),
  category: z.enum([
    "salary",
    "business",
    "investments",
    "foodDining",
    "groceries",
    "transportation",
    "entertainment",
    "shopping",
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

export type TransactionFormSchema = z.infer<typeof transactionFormschema>;

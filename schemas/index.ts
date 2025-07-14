import * as z from "zod";

import { TRANSACTION_CATEGORIES } from "@/lib/constants";

export const transactionFormschema = z.object({
  type: z.enum(["expense", "income"]),
  category: z.enum(TRANSACTION_CATEGORIES),
  amount: z.coerce
    .number({ invalid_type_error: "Amount must be a number" })
    .positive("Amount must be a positive number"),
  createdAt: z.date({ message: "Date is required" }),
  description: z.string().optional(),
});

export const searchSchema = z.object({
  query: z.string(),
  type: z.enum(["all", "expense", "income"]),
  category: z.enum(["all", ...TRANSACTION_CATEGORIES]),
});

export type TransactionFormSchema = z.infer<typeof transactionFormschema>;
export type SearchSchema = z.infer<typeof searchSchema>;

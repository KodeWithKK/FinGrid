import { ObjectId } from "mongodb";
import * as z from "zod";

import { EXPENSE_CATEGORIES, TRANSACTION_CATEGORIES } from "../lib/constants";

/* DOCUMENT SCHEMAS */
export const userSchema = z.object({
  _id: z.instanceof(ObjectId).default(() => new ObjectId()),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  photo: z.string(),
  role: z.enum(["USER", "ADMIN"]),
  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
});

export const transactionSchema = z.object({
  _id: z.instanceof(ObjectId).default(() => new ObjectId()),
  userId: z.instanceof(ObjectId),
  type: z.enum(["expense", "income"]),
  category: z.enum(TRANSACTION_CATEGORIES),
  amount: z.coerce.number().positive(),
  description: z.string().optional(),
  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
});

export const budgetSchema = z.object({
  _id: z.instanceof(ObjectId).default(() => new ObjectId()),
  userId: z.instanceof(ObjectId),
  category: z.enum(EXPENSE_CATEGORIES),
  amount: z.coerce.number().positive(),
  createdAt: z.coerce.date().default(() => new Date()),
  updatedAt: z.coerce.date().default(() => new Date()),
});

/* DOCUMENT TYPES */
export type UserDoc = z.infer<typeof userSchema>;
export type TransactionDoc = z.infer<typeof transactionSchema>;
export type BudgetDoc = z.infer<typeof budgetSchema>;

/* SERIALIZED DOCUMENT TYPES */
export type User = Omit<UserDoc, "_id"> & { _id: string };
export type Transaction = Omit<TransactionDoc, "_id" | "userId"> & {
  _id: string;
  userId: string;
};
export type Budget = Omit<BudgetDoc, "_id" | "userId"> & {
  _id: string;
  userId: string;
};

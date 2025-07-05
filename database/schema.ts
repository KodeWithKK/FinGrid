import { ObjectId } from "mongodb";
import * as z from "zod";

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
  amount: z.coerce.number().positive(),
  date: z.coerce.date(),
  description: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
export type Transaction = z.infer<typeof transactionSchema>;

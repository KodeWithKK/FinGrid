"use server";

import { ObjectId } from "mongodb";

import { dbCollections } from "@/database/collections";
import { transactionSchema, type Transaction } from "@/database/schema";
import { testUserId } from "@/lib/constants";
import { type AddTransactionFormSchema } from "@/schemas";

export async function getTransactions(): Promise<Transaction[]> {
  const userId = new ObjectId(testUserId);
  const transactions = await dbCollections.transactions();
  const docs = await transactions.find({ userId }).toArray();
  return docs.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
    userId: doc.userId.toString(),
  }));
}

export async function addTransaction(
  transaction: AddTransactionFormSchema,
): Promise<string | null> {
  try {
    const transactions = await dbCollections.transactions();
    const { data, success } = transactionSchema.safeParse({
      ...transaction,
      userId: new ObjectId(testUserId),
    });
    if (!success) return null;
    const result = await transactions.insertOne(data);
    return result.insertedId.toString();
  } catch {
    return null;
  }
}

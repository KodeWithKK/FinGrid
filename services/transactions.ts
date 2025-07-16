"use server";

import { ObjectId } from "mongodb";

import { dbCollections } from "@/database/collections";
import { transactionSchema, type Transaction } from "@/database/schema";
import { testUserId } from "@/lib/constants";
import { transactionFormSchema, type TransactionFormSchema } from "@/schemas";

export async function getTransactions(): Promise<Transaction[]> {
  const transactions = await dbCollections.transactions();
  const docs = await transactions
    .find({ userId: new ObjectId(testUserId) })
    .sort({ createdAt: -1 })
    .toArray();
  return docs.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
    userId: doc.userId.toString(),
  }));
}

export async function addTransaction(
  transaction: TransactionFormSchema,
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

export async function updateTransaction(
  id: string,
  transaction: TransactionFormSchema,
): Promise<boolean> {
  try {
    const transactions = await dbCollections.transactions();
    const { data, success } = transactionFormSchema.safeParse(transaction);
    if (!success) return false;
    await transactions.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } },
    );
    return true;
  } catch {
    return false;
  }
}

export async function deleteTransaction(id: string): Promise<boolean> {
  try {
    const transactions = await dbCollections.transactions();
    await transactions.deleteOne({ _id: new ObjectId(id) });
    return true;
  } catch {
    return false;
  }
}

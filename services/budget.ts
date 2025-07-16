"use server";

import dayjs from "dayjs";
import { ObjectId } from "mongodb";

import { dbCollections } from "@/database/collections";
import { budgetSchema, type Budget } from "@/database/schema";
import { testUserId } from "@/lib/constants";
import { budgetFormSchema, type BudgetFormSchema } from "@/schemas";

export async function getBudgets(): Promise<Budget[]> {
  const budgets = await dbCollections.budgets();

  const monthStart = dayjs().startOf("month").toDate();
  const monthEnd = dayjs().endOf("month").toDate();

  const docs = await budgets
    .find({
      userId: new ObjectId(testUserId),
      createdAt: {
        $gte: monthStart,
        $lte: monthEnd,
      },
    })
    .sort({ createdAt: -1 })
    .toArray();

  return docs.map((doc) => ({
    ...doc,
    _id: doc._id.toString(),
    userId: doc.userId.toString(),
  }));
}

export async function addBudget(budget: BudgetFormSchema): Promise<string> {
  try {
    const budgets = await dbCollections.budgets();
    const { data, success } = budgetSchema.safeParse({
      ...budget,
      userId: new ObjectId(testUserId),
    });
    if (!success) throw new Error("Invalid data provided!");

    const monthStart = dayjs(data.createdAt).startOf("month").toDate();
    const monthEnd = dayjs(data.createdAt).endOf("month").toDate();

    const existingBudget = await budgets.findOne({
      userId: data.userId,
      category: data.category,
      createdAt: {
        $gte: monthStart,
        $lte: monthEnd,
      },
    });

    if (existingBudget)
      throw new Error("Budget Already Exists for this month!");

    const result = await budgets.insertOne(data);
    return result.insertedId.toString();
  } catch (error: any) {
    throw new Error(error?.message || "Something went wrong!");
  }
}

export async function updateBudget(
  id: string,
  budget: BudgetFormSchema,
): Promise<boolean> {
  try {
    const budgets = await dbCollections.budgets();
    const { data, success } = budgetFormSchema.safeParse(budget);
    if (!success) return false;
    await budgets.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data, updatedAt: new Date() } },
    );
    return true;
  } catch {
    return false;
  }
}

export async function deleteBudget(id: string): Promise<boolean> {
  try {
    const budgets = await dbCollections.budgets();
    await budgets.deleteOne({ _id: new ObjectId(id) });
    return true;
  } catch {
    return false;
  }
}

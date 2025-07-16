import { Document } from "mongodb";

import { getDb } from "./db";
import { BudgetDoc, type TransactionDoc, type UserDoc } from "./schema";

export async function getCollection<T extends Document>(name: string) {
  return getDb().then((db) => db.collection<T>(name));
}
export const dbCollections = {
  users: () => getCollection<UserDoc>("users"),
  transactions: () => getCollection<TransactionDoc>("transactions"),
  budgets: () => getCollection<BudgetDoc>("budgets"),
};

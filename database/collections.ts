import { Document } from "mongodb";

import { getDb } from "./db";
import { Transaction, User } from "./schema";

export async function getCollection<T extends Document>(name: string) {
  return getDb().then((db) => db.collection<T>(name));
}
export const collections = {
  users: () => getCollection<User>("users"),
  transactions: () => getCollection<Transaction>("transactions"),
};

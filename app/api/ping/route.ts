import { NextResponse } from "next/server";
import * as z from "zod";

import { getDb } from "@/database/db";
import { userSchema } from "@/database/schema";

export async function GET() {
  const db = await getDb();
  const result = await db.collection("users").find({}).toArray();
  const { success, error } = z.array(userSchema).safeParse(result);
  return NextResponse.json({ isValid: success, data: result, error });
}

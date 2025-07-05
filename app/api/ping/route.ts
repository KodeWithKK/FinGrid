import { NextResponse } from "next/server";
import * as z from "zod";

import { collections } from "@/database/collections";
import { userSchema } from "@/database/schema";

export async function GET() {
  const users = await collections.users();
  const result = await users.find({}).toArray();
  const { success, error } = z.array(userSchema).safeParse(result);
  return NextResponse.json({ isValid: success, data: result, error });
}

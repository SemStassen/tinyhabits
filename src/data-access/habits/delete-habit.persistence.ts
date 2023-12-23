import "server-only";

import { db } from "@/db";
import { habits } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteHabit(habitId: number): Promise<void> {
  await db.delete(habits).where(eq(habits.id, habitId));
}

import "server-only";

import { db } from "@/db";
import { habits } from "@/db/schema";
import { createHabitDto } from "@/use-cases/habits/types";

export async function createHabit(habit: createHabitDto): Promise<void> {
  console.log(db);
  await db.insert(habits).values(habit);
}

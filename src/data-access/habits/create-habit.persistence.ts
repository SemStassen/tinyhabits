import "server-only";

import { db } from "@/db";
import { habits } from "@/db/schema";
import { CreateHabitDto } from "@/use-cases/habits/types";

export async function createHabit(habit: CreateHabitDto): Promise<void> {
  await db.insert(habits).values(habit);
}

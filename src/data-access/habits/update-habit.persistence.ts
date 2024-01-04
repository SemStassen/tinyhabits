import { habits } from "@/db/schema";
import { db } from "@/db";
import { HabitDto } from "@/use-cases/habits/types";
import { eq } from "drizzle-orm";

export async function updateHabit(habit: HabitDto): Promise<void> {
  await db.update(habits).set(habit).where(eq(habits.id, habit.id));
}

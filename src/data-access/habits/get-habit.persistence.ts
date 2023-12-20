import "server-only";

import { db } from "@/db";
import { Habit, habits } from "@/db/schema";
import { eq } from "drizzle-orm";

export function toDtoMapper(habit: Habit) {
  return {
    id: habit.id,
    name: habit.name,
  };
}

export async function getHabit(habitId: number) {
  const foundHabit = await db.query.habits.findFirst({
    where: eq(habits.id, habitId),
  });

  if (!foundHabit) {
    throw new Error("Habit not found");
  }

  return toDtoMapper(foundHabit);
}
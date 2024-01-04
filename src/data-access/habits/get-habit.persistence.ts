import "server-only";

import { db } from "@/db";
import { Habit, habits } from "@/db/schema";
import { eq } from "drizzle-orm";
import { HabitDto } from "@/use-cases/habits/types";

export function toDtoMapper(habit: Habit) {
  return {
    id: habit.id,
    name: habit.name,
    emojiNative: habit.emojiNative,
    quantity: habit.quantity,
    step: habit.step,
    unit: habit.unit ?? undefined,
    createdAt: habit.createdAt,
  };
}

export async function getHabit(habitId: number): Promise<HabitDto> {
  const foundHabit = await db.query.habits.findFirst({
    where: eq(habits.id, habitId),
  });

  if (!foundHabit) {
    throw new Error("Habit not found");
  }

  return toDtoMapper(foundHabit);
}

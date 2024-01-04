import "server-only";

import { db } from "@/db";
import { toDtoMapper } from "./get-habit.persistence";
import type { HabitDto } from "@/use-cases/habits/types";

export async function getHabits(): Promise<HabitDto[]> {
  const foundHabits = await db.query.habits.findMany({});

  return foundHabits.map(toDtoMapper);
}

import "server-only";

import { db } from "@/db";
import { toDtoMapper } from "./get-habit.persistence";
import type { HabitDto } from "@/use-cases/habits/types";
import { asc } from "drizzle-orm";
import { habits } from "@/db/schema";

export async function getHabits(): Promise<HabitDto[]> {
  const foundHabits = await db.query.habits.findMany({
    orderBy: [asc(habits.id)],
  });

  return foundHabits.map(toDtoMapper);
}

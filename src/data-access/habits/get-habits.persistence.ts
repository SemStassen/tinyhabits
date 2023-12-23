import "server-only";

import { db } from "@/db";
import { toDtoMapper } from "./get-habit.persistence";
import { habitDto } from "@/use-cases/types";

export async function getHabits(): Promise<habitDto[]> {
  const foundHabits = await db.query.habits.findMany();

  return foundHabits.map(toDtoMapper);
}

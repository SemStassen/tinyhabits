"server-only";

import { db } from "@/db";
import { toDtoMapper } from "./get-habit.persistence";

export async function getHabits() {
  const foundHabits = await db.query.habits.findMany();

  return foundHabits.map(toDtoMapper);
}

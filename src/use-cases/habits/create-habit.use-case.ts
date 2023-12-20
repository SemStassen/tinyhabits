import { HabitEntity, HabitEntityValidationError } from "@/entitites/habit";
import type { createHabit } from "./types";
import { ValidationError, habitToCreateHabitDtoMapper } from "./utils";

export async function createHabitUseCase(
  context: {
    createHabit: createHabit;
  },
  data: {
    name: string;
  },
) {
  try {
    const newHabit = new HabitEntity({
      name: data.name,
    });
    await context.createHabit(habitToCreateHabitDtoMapper(newHabit));
  } catch (err) {
    const error = err as HabitEntityValidationError;
    throw new ValidationError(error.getErrors());
  }
}

import {
  HabitEntity,
  HabitEntityValidationError,
} from "@/entitites/habits/habit";
import type { CreateHabit } from "./types";
import { ValidationError, habitToCreateHabitDtoMapper } from "./utils";

export async function createHabitUseCase(
  context: {
    createHabit: CreateHabit;
  },
  data: {
    name: string;
    emojiNative: string;
    quantity: number;
    step: number;
    unit?: string;
  },
) {
  try {
    const newHabit = new HabitEntity({
      name: data.name,
      emojiNative: data.emojiNative,
      quantity: data.quantity,
      step: data.step,
      unit: data.unit,
    });

    await context.createHabit(habitToCreateHabitDtoMapper(newHabit));
  } catch (err) {
    const error = err as HabitEntityValidationError;
    throw new ValidationError(error.getErrors());
  }
}

import { HabitEntity } from "@/entitites/habits/habit";
import { createHabitDto, habitDto } from "./types";

export class ValidationError extends Error {
  private errors: Record<string, string | undefined>;

  constructor(errors: Record<string, string | undefined>) {
    super("A validation error occurred");
    this.errors = errors;
  }

  getErrors() {
    return this.errors;
  }
}

export function habitToCreateHabitDtoMapper(
  habit: HabitEntity,
): createHabitDto {
  return {
    name: habit.getName(),
  };
}

export function habitToDto(habit: HabitEntity): habitDto {
  const habitId = habit.getId();

  if (!habitId) {
    throw new Error("Expected habit to have an id");
  }

  return {
    id: habitId,
    name: habit.getName(),
  };
}

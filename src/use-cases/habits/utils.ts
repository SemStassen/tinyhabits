import { HabitEntity } from "@/entitites/habit";
import { createHabitDto } from "./types";

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

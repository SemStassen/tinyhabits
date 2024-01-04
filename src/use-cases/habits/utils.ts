import { HabitEntity } from "@/entitites/habits/habit";
import type { CreateHabitDto, HabitDto } from "./types";

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
): CreateHabitDto {
  return {
    name: habit.getName(),
    emojiNative: habit.getEmojiNative(),
    quantity: habit.getQuantity(),
    step: habit.getStep(),
    unit: habit.getUnit(),
  };
}

export function habitToDto(habit: HabitEntity): HabitDto {
  const habitId = habit.getId();

  if (!habitId) {
    throw new Error("Expected habit to have an id");
  }

  const createdAt = habit.getCreatedAt();

  if (!createdAt) {
    throw new Error("Expected habit to have createdAt date");
  }

  return {
    id: habitId,
    name: habit.getName(),
    emojiNative: habit.getEmojiNative(),
    quantity: habit.getQuantity(),
    step: habit.getStep(),
    unit: habit.getUnit(),
    createdAt: createdAt,
  };
}

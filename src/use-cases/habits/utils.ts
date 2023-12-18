import { HabitEntity } from "@/entitites/habit";
import { createHabitDto } from "./types";

export function habitToCreateToDto(habit: HabitEntity): createHabitDto {
  return {
    name: habit.getName(),
  };
}

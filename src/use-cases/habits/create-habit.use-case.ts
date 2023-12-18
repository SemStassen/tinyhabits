import { HabitEntity } from "@/entitites/habit";
import type { createHabit } from "./types";
import { habitToCreateToDto } from "./utils";

export async function createHabitUseCase(
  context: {
    createHabit: createHabit;
  },
  data: {
    name: string;
  },
) {
  try {
    const habit = new HabitEntity({
      name: data.name,
    });
    await context.createHabit(habitToCreateToDto(habit));
  } catch (error) {
    console.log(error);
  }
}

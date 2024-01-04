import { HabitEntity } from "@/entitites/habits/habit";
import { GetHabit, UpdateHabit } from "./types";
import { habitToDto } from "./utils";

export async function addStepUseCase(
  context: {
    getHabit: GetHabit;
    updateHabit: UpdateHabit;
  },
  data: {
    habitId: number;
  },
) {
  const habit = new HabitEntity(await context.getHabit(data.habitId));

  habit.addStep();

  await context.updateHabit(habitToDto(habit));

  return habitToDto(habit);
}

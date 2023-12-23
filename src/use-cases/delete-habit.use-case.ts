import type { deleteHabit } from "./types";

export async function deleteHabitUseCase(
  context: {
    deleteHabit: deleteHabit;
  },
  data: {
    habitId: number;
  },
) {
  await context.deleteHabit(data.habitId);
}

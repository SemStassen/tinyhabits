import type { DeleteHabit } from "./types";

export async function deleteHabitUseCase(
  context: {
    deleteHabit: DeleteHabit;
  },
  data: {
    habitId: number;
  },
) {
  await context.deleteHabit(data.habitId);
}

import type { DeleteHabit } from "./types";

export async function deleteHabitUseCase(
  context: {
    deleteHabit: DeleteHabit;
  },
  data: {
    habitId: string;
  },
) {
  await context.deleteHabit(data.habitId);
}
